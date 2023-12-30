/* eslint-disable react/prop-types */
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { AntDesign } from '@expo/vector-icons'

import styles from './styles'
import Background from '../../../assets/Image/Auth/background.gif'
import Toast from 'react-native-toast-message'
import { post } from '../../../axios-config'

export default function ForgetPassword({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup
            .object({
                email: yup
                    .string()
                    .email('Please enter valid email address')
                    .required('Please enter your email address'),
            })
            .required(),
        onSubmit: async (values) => {
            setIsLoading(true)
            try {
                const formData = {
                    email: values.email,
                }
                const response = await post('/user/forgot-password', formData)
                if (response) {
                    Toast?.show({
                        type: 'success',
                        text1: 'Thông báo',
                        text2: 'Mật khẩu đã gửi về email'
                    })
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Thông báo',
                    text2: 'Tài khoản hoặc mật khẩu không chính xác',
                })
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 1000)
            }
        },
    })

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <Image source={Background} style={styles.backgroundImage} />
                <View style={styles.formWrapper}>
                    <Text style={styles.title}>FORGOT PASSWORD</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>Email address</Text>
                        <TextInput
                            value={formik.values.email}
                            onChangeText={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            autoCapitalize="none"
                            style={styles.input}
                            placeholder="Enter your email address"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Text style={styles.errorText}>{formik.errors.email}</Text>
                        ) : null}
                    </View>
                    {isLoading ? (
                        <ActivityIndicator size={'large'} color={'#0000ff'} />
                    ) : (
                        <TouchableOpacity
                            onPress={formik.handleSubmit}
                            style={styles.loginBtn}
                        >
                            <Text style={styles.loginText}>Send</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={styles.returnHome}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <AntDesign name="arrowleft" size={24} color="black" />
                        <Text>Back to home</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
