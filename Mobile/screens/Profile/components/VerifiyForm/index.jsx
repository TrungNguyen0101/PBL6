import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';

// Context
import { AuthContext } from '../../../../context/AuthProvider'
import colors from '../../../../contains/colors';

export default function VerifyForm({ styles }) {
    const { user } = useContext(AuthContext)

    const validationSchema = yup.object().shape({
        verify: yup
            .string()
            .required('Please enter verify code'),
    });

    const formik = useFormik({
        initialValues: {
            verify: '',
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
                <Text style={{ fontSize: 24, fontWeight: '800' }}>Xác thực tài khoản</Text>
            </View>
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
            <TouchableOpacity
                style={[styles.updateBtn, { alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 }]}
                onPress={formik.handleSubmit}
            >
                <Text style={styles.updateBtnText}>Xác thực</Text>
            </TouchableOpacity>
        </View>
    )
}