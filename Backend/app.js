const db = require('./src/config/database/index')
const express = require('express')
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const router = express.Router();
const checkToken = require("./src/utils/middleware.js")
const initWebRoutes = require("./src/routes/index.js");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
var debug = require('debug')('backend:server');
var http = require('http');
const session = require('express-session');
app.use(cors());

app.use('/', express.static(path.join(__dirname, 'lib')))
// app.use('/', express.static(path.join(__dirname, 'lib')), swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// middleware test
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.get('/vnpay_return', async function (req, res) {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];

        // Remove unnecessary parameters for hash calculation
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sort the remaining parameters for hash calculation
        const sortedParams = sortObject(vnp_Params);

        const tmnCode = vnpayConfig.vnp_TmnCode;
        const secretKey = vnpayConfig.vnp_HashSecret;

        // Generate the hash
        let querystring = require('qs');
        let signData = querystring.stringify(sortedParams, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        if (secureHash === signed) {
            return res.json({ code: sortedParams['vnp_ResponseCode'], message: 'Success' });
        } else {
            return res.json({ code: '97', message: 'Checksum failed' });
        }
    } catch (error) {
        console.error('Error processing VNPAY return:', error);
        return res.json({ code: '99', message: 'Internal Server Error' });
    }
});
app.get('/vnpay_ipn', async function (req, res, next) {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];

        const orderId = vnp_Params['vnp_TxnRef'];
        const rspCode = vnp_Params['vnp_ResponseCode'];

        // Remove unnecessary parameters for hash calculation
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        // Sort the remaining parameters for hash calculation
        const sortedParams = sortObject(vnp_Params);
        const secretKey = vnpayConfig.vnp_HashSecret;
        let querystring = require('qs');
        let signData = querystring.stringify(sortedParams, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        // Assume paymentStatus is retrieved from your database or another source
        let paymentStatus = '0'; // Default to '0' if not available
        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn

        if (secureHash === signed) {
            // Perform additional checks if needed (e.g., checkOrderId, checkAmount)
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus === '0') {
                        if (rspCode === '00') {
                            // Payment successful
                            await handleSuccessfulPayment(orderId, sortedParams);
                            res.status(200).json({ RspCode: '00', Message: 'Success' });
                        } else {
                            // Payment failed
                            await handleFailedPayment(orderId, sortedParams);
                            res.status(200).json({ RspCode: '00', Message: 'Failed' });
                        }
                    } else {
                        // Payment status already updated
                        res.status(200).json({ RspCode: '24', Message: 'This order has been updated to the payment status' });
                    }
                }
                else {
                    res.status(200).json({ RspCode: '04', Message: 'Amount invalid' })
                }
            }
            else {
                res.status(200).json({ RspCode: '01', Message: 'Order not found' })
            }
            // Handle different payment statuses

        } else {
            // Checksum failed
            res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
        }
    } catch (error) {
        console.error('Error processing VNPAY IPN:', error);
        res.status(500).json({ RspCode: '99', Message: 'Internal Server Error' });
    }
});
async function handleSuccessfulPayment(orderId, sortedParams) {
    // Save successful payment information to the database
    await db.Payment.create({
        orderId: orderId,
        totalmoney: sortedParams['vnp_Amount'],
        note: sortedParams['vnp_OrderInfo'],
        vnp_response_code: sortedParams['vnp_ResponseCode'],
        code_vnpay: sortedParams['vnp_TransactionNo'],
        code_bank: sortedParams['vnp_BankCode'],
        // Add other fields as needed
    });

    // Update other related data in the database (e.g., book quantities)
}

async function handleFailedPayment(orderId, sortedParams) {
    // Save failed payment information to the database
    await db.Payment.create({
        orderId: orderId,
        totalmoney: sortedParams['vnp_Amount'],
        note: sortedParams['vnp_OrderInfo'],
        vnp_response_code: sortedParams['vnp_ResponseCode'],
        code_vnpay: sortedParams['vnp_TransactionNo'],
        code_bank: sortedParams['vnp_BankCode'],
        // Add other fields as needed
    });
    // Additional error handling or logging if required
}
// app.use(checkToken.checkToken); //shiel
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'EXAMPLEkeyHERE1', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: true
}));

initWebRoutes(app);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'jade');
var port = normalizePort(process.env.PORT || '3030');
app.set('port', port);
var server = http.createServer(app);
server.listen(port, async () => {
    await db.connect();
    console.log(`Api is running on port ${port}`)
})


function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}