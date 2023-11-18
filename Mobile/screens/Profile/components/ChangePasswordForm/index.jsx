import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';

// Context
import { AuthContext } from '../../../../context/AuthProvider'

import colors from '../../../../contains/colors';

export default function ChangePasswordForm({ styles }) {
    const { user } = useContext(AuthContext)

    const validationSchema = yup.object().shape({
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
        newPassword: yup
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
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('newPassword'), null], 'Password does not match')
            .required('Password confirmation is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log('Submitted:', values);
        },
    });
    return (
        <View style={styles.profileWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <View style={{ width: 20, height: 40, backgroundColor: colors.primaryColor, borderRadius: 8 }} />
                <Text style={{ fontSize: 24, fontWeight: '800' }}>Đổi mật khẩu</Text>
            </View>
            <View style={styles.infoWrapper}>
                <Text style={styles.info}>Password:</Text>
                <TextInput
                    style={styles.infoInput}
                    onChangeText={formik.handleChange('password')}
                    onBlur={formik.handleBlur('password')}
                    value={formik.values.password}
                />
            </View>
            {formik.touched.password && formik.errors.password ? (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            ) : null}
            <View style={styles.infoWrapper}>
                <Text style={styles.info}>New Password:</Text>
                <TextInput
                    style={styles.infoInput}
                    onChangeText={formik.handleChange('newPassword')}
                    onBlur={formik.handleBlur('newPassword')}
                    value={formik.values.newPassword}
                />
            </View>
            {formik.touched.newPassword && formik.errors.newPassword ? (
                <Text style={styles.errorText}>{formik.errors.newPassword}</Text>
            ) : null}

            <View style={styles.infoWrapper}>
                <Text style={styles.info}>Confirm Password:</Text>
                <TextInput
                    style={styles.infoInput}
                    onChangeText={formik.handleChange('confirmPassword')}
                    onBlur={formik.handleBlur('confirmPassword')}
                    value={formik.values.confirmPassword}
                />
            </View>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
            ) : null}
            <TouchableOpacity
                style={[styles.updateBtn, { alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 }]}
                onPress={formik.handleSubmit}
            >
                <Text style={styles.updateBtnText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    )
}