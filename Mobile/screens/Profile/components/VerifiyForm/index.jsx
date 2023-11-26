import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import { post } from '../../../../axios-config'

// Context
import { AuthContext } from '../../../../context/AuthProvider'
import colors from '../../../../contains/colors';

export default function VerifyForm({ styles }) {
    const { user, accessToken, setUser } = useContext(AuthContext)
    const [isSend, setIsSend] = useState(false)

    const validationSchema = yup.object().shape({
        verify: yup
            .string()
            .required('Please enter verify code'),
    });

    const handleSendVerifyCode = async () => {
        try {
            const response = await post(
                '/user/sendcode-verify',
                {},
                {
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                    },
                }
            );
            if (response) {
                Alert.alert(
                    'Thông báo',
                    'Đã gửi mã xác thực về email',
                    [
                        {
                            text: 'Đóng',
                            style: 'cancel'
                        }
                    ]
                )
            }
        } catch (err) {
            Alert.alert(
                'Lỗi',
                err?.message,
                [
                    {
                        text: 'Đóng',
                        style: 'cancel'
                    }
                ]
            )
        }
        if (isSend === false) {
            setIsSend(true)
        }
    }

    const formik = useFormik({
        initialValues: {
            verify: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const formData = {
                    code: values.verify
                }
                const response = await post('/user/verify', formData, {
                    headers: {
                        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                    },
                })
                if (response) {
                    setUser(response.data.data.user)
                    Alert.alert(
                        'Thông báo',
                        'Xác thực thành công',
                        [
                            {
                                text: 'Đóng',
                                style: 'cancel'
                            }
                        ]
                    )

                }
            } catch (err) {
                console.log(err?.message)
            }
        },
    });
    return (
        <View style={styles.profileWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <View style={{ width: 20, height: 40, backgroundColor: colors.primaryColor, borderRadius: 8 }} />
                <Text style={{ fontSize: 24, fontWeight: '800' }}>Xác thực tài khoản</Text>
            </View>
            {user?.isVerified === true ?
                <View style={{ paddingVertical: 12, flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600' }}>Trạng thái: </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <AntDesign name="check" size={28} color="green" />
                        <Text style={{ fontSize: 18 }}>Đã xác thực</Text>
                    </View>
                </View>
                :
                <>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.info}>Mã xác thực:</Text>
                        <TextInput
                            style={styles.infoInput}
                            onChangeText={formik.handleChange('verify')}
                            onBlur={formik.handleBlur('verify')}
                            value={formik.values.verify}
                        />
                    </View>
                    {formik.touched.verify && formik.errors.verify ? (
                        <Text style={styles.errorText}>{formik.errors.verify}</Text>
                    ) : null}
                    {isSend
                        ?
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity onPress={handleSendVerifyCode} style={[styles.updateBtn, { borderWidth: 1, borderColor: colors.blackColor, backgroundColor: colors.bgColor, flex: 1, alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 }]}>
                                <Text style={[styles.updateBtnText, { color: colors.blackColor }]}>Gửi lại</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.updateBtn, { flex: 1, alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 }]}
                                onPress={formik.handleSubmit}
                            >
                                <Text style={styles.updateBtnText}>Xác thực</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={handleSendVerifyCode} style={[styles.updateBtn, { alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 }]}>
                            <Text style={styles.updateBtnText}>Gửi mã</Text>
                        </TouchableOpacity>
                    }
                </>
            }
        </View>
    )
}