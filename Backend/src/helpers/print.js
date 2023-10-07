const chalk = require("chalk")
class OutputType {
    static INFOMATION = "INFOMATION"
    static SUCCESS = "SUCCESS"
    static WARNING = "WARNING"
    static ERROR = "ERROR"
}
function print(message,outputType) {
    switch (outputType) {
        case outputType.INFOMATION:
            console.log(chalk.white(message))
            break;
        case outputType.SUCCESS:
            console.log(chalk.green(message))
            break;
        case outputType.WARNING:
            console.log(chalk.yellow(message))
            break;
        case outputType.ERROR:
            console.log(chalk.red(message))
            break;
        default:
            console.log(chalk.white(message))
    }
}

module.exports = {
    print,OutputType
}