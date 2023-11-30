import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import styles from './styles';
import Background from '../../../assets/Image/Auth/background.gif';
import { AuthContext } from '../../../context/AuthProvider';
import { post } from '../../../axios-config';

export default function SignIn({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const { setUser, setAccessToken } = useContext(AuthContext)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup
      .object({
        email: yup
          .string()
          .email('Please enter valid email address')
          .required('Please enter your email address'),
        password: yup
          .string()
          .min(6, 'Your password must be at least 6 characters or greater')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            {
              message:
                'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
            }
          )
          .required('Please enter your password'),
      })
      .required(),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = {
          email: values.email,
          password: values.password
        }
        const response = await post('/user/login', formData)
        if (response) {
          setUser(response?.data?.user);
          setAccessToken(response?.data?.access_token)
          Alert.alert(
            "Thông báo",
            "Đăng nhập thành công",
            [
              {
                text: "Đóng",
                onPress: () => navigation.navigate('Home')
              }
            ]
          );
        }
      } catch (error) {
        Alert.alert(
          "Thông báo",
          "Tài khoản hoặc mật khẩu không chính xác",
          [
            {
              text: "Đóng",
            }
          ]
        );
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this offset as needed
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={Background} style={styles.backgroundImage} />
        <View style={styles.formWrapper}>
          <Text style={styles.title}>LOGIN</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              autoCapitalize='none'
              style={styles.input}
              placeholder='Enter your email address'
            />
            {formik.touched.email && formik.errors.email ? (
              <Text style={styles.errorText}>{formik.errors.email}</Text>
            ) : null}
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <View>
              <TextInput
                secureTextEntry={isHidePassword}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                autoCapitalize='none'
                style={[styles.input, styles.inputPassword]}
                placeholder='Enter your password'
              />
              {isHidePassword ? <FontAwesome onPress={() => setIsHidePassword(!isHidePassword)} name="eye-slash" size={20} color="black" style={styles.hidePassword} /> : <FontAwesome onPress={() => setIsHidePassword(!isHidePassword)} name="eye" size={20} color="black" style={styles.hidePassword} />}
            </View>
            {formik.touched.password && formik.errors.password ? (
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            ) : null}
          </View>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'#0000ff'} />
          ) : (
            <TouchableOpacity onPress={formik.handleSubmit} style={styles.loginBtn}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          )}
          <View style={styles.notice}>
            <Text style={styles.noticeText}>Do not have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.returnHome} onPress={() => navigation.navigate('Home')}>
            <AntDesign name="arrowleft" size={24} color="black" />
            <Text>Back to home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>

  );
}
