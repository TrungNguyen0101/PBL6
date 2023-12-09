/* eslint-disable react/prop-types */
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { post } from '../../../../axios-config'
import { FontAwesome } from '@expo/vector-icons'
// Context
import { AuthContext } from '../../../../context/AuthProvider'

import colors from '../../../../contains/colors'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

export default function ChangePasswordForm({ styles }) {
  const { accessToken } = useContext(AuthContext)
  const [isHidePassword, setIsHidePassword] = useState(true)
  const [isHideNewPassword, setIsHideNewPassword] = useState(true)
  const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(true)
  const navigation = useNavigation()
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Your password must be at least 6 characters or greater')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
        },
      )
      .required('Please enter your password'),
    newPassword: yup
      .string()
      .min(6, 'Your password must be at least 6 characters or greater')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Your password must have at least 1 uppercase, 1 lowercase, 1 special character',
        },
      )
      .required('Please enter your password'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Password does not match')
      .required('Password confirmation is required'),
  })

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        const formData = {
          oldpassword: values.password,
          newpassword: values.newPassword,
        }
        const response = post('/user/change-password', formData, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
          },
        })
        if (response) {
          Toast.show({
            type: 'success',
            text1: 'Thông báo',
            text2: 'Đổi mật khẩu thành công',
          })
        }
        navigation?.navigate('Settings')
      } catch (err) {
        console.log(err)
      }
      console.log('Submitted:', values)
    },
  })
  return (
    <View style={styles.profileWrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <View
          style={{
            width: 20,
            height: 40,
            backgroundColor: colors.primaryColor,
            borderRadius: 8,
          }}
        />
        <Text style={{ fontSize: 24, fontWeight: '800' }}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.info}>Password</Text>
        <View>
          <TextInput
            secureTextEntry={isHidePassword}
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            autoCapitalize="none"
            style={styles.infoInput}
            placeholder="Enter your password"
          />
          {isHidePassword ? (
            <FontAwesome
              onPress={() => setIsHidePassword(!isHidePassword)}
              name="eye-slash"
              size={20}
              color="black"
              style={styles.hidePassword}
            />
          ) : (
            <FontAwesome
              onPress={() => setIsHidePassword(!isHidePassword)}
              name="eye"
              size={20}
              color="black"
              style={styles.hidePassword}
            />
          )}
        </View>
        {formik.touched.password && formik.errors.password ? (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        ) : null}
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.info}>New Password</Text>
        <View>
          <TextInput
            secureTextEntry={isHideNewPassword}
            value={formik.values.newPassword}
            onChangeText={formik.handleChange('newPassword')}
            onBlur={formik.handleBlur('newPassword')}
            autoCapitalize="none"
            style={styles.infoInput}
            placeholder="Enter your new password"
          />
          {isHideNewPassword ? (
            <FontAwesome
              onPress={() => setIsHideNewPassword(!isHideNewPassword)}
              name="eye-slash"
              size={20}
              color="black"
              style={styles.hidePassword}
            />
          ) : (
            <FontAwesome
              onPress={() => setIsHideNewPassword(!isHideNewPassword)}
              name="eye"
              size={20}
              color="black"
              style={styles.hidePassword}
            />
          )}
        </View>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <Text style={styles.errorText}>{formik.errors.newPassword}</Text>
        ) : null}
      </View>

      <View style={styles.infoWrapper}>
        <Text style={styles.info}>Confirm Password</Text>
        <View>
          <TextInput
            secureTextEntry={isHideConfirmPassword}
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            autoCapitalize="none"
            style={styles.infoInput}
            placeholder="Enter your confirm password"
          />
          {isHideConfirmPassword ? (
            <FontAwesome
              onPress={() => setIsHideConfirmPassword(!isHideConfirmPassword)}
              name="eye-slash"
              size={20}
              color="black"
              style={styles.hidePassword}
            />
          ) : (
            <FontAwesome
              onPress={() => setIsHideConfirmPassword(!isHideConfirmPassword)}
              name="eye"
              size={20}
              color="black"
              style={styles.hidePassword}
            />
          )}
        </View>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={[
          styles.updateBtn,
          { alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 },
        ]}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.updateBtnText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  )
}
