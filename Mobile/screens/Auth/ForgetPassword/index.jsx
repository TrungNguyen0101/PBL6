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
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import styles from './styles'
import Background from '../../../assets/Image/Auth/background.gif'
import { AuthContext } from '../../../context/AuthProvider'
import { post } from '../../../axios-config'
import Toast from 'react-native-toast-message'

export default function ForgetPassword({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isHidePassword, setIsHidePassword] = useState(true)
    const { setUser, setAccessToken } = useContext(AuthContext)

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
