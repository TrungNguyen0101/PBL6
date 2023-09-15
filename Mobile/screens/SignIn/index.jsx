import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';
import Background from '../../assets/background.gif';

export default function SignIn({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: yup
      .object({
        username: yup.string().required('Please enter your username'),
        email: yup
          .string()
          .email('Please enter valid email address')
          .required('Please enter your email address'),
        password: yup
          .string()
          .min(6, 'Your password must be at least 6 characters or greater')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
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
        console.log('Logging in with:');
        console.log('Username:', values.username);
        console.log('Email:', values.email);
        console.log('Password:', values.password);
      } catch (error) {
        console.error('Login error:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      }
    },
  });

  return (
    <View style={styles.container}>
      <Image source={Background} style={styles.backgroundImage} />
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            onBlur={formik.handleBlur('username')}
            autoCapitalize='none'
            style={styles.input}
            placeholder='Please enter your username'
          />
          {formik.touched.username && formik.errors.username ? (
            <Text style={styles.errorText}>{formik.errors.username}</Text>
          ) : null}
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            value={formik.values.email}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            autoCapitalize='none'
            style={styles.input}
            placeholder='Please enter your email address'
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
              placeholder='Please enter your password'
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
      </View>
    </View>
  );
}
