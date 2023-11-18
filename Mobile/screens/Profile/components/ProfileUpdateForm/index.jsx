import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';

// Context
import { AuthContext } from '../../../../context/AuthProvider'
import { StateContext } from '../../../../context/StateProvider';
import colors from '../../../../contains/colors';

export default function ProfileUpdateForm({ styles }) {
    const { user } = useContext(AuthContext)
    const { StateEnableUpdate, setStateEnableUpdate } = useContext(StateContext)

    const handleChangeStateUpdate = () => {
        setStateEnableUpdate(!StateEnableUpdate);
    }

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email('Please enter valid email address')
            .required('Please enter your email address'),
        phone: yup.string().matches(
            /^[0-9]{10}$/,
            'Invalid phone number'
        ).required('Phone number is required'),
        username: yup.string().required('Please enter your username'),
    });

    const formik = useFormik({
        initialValues: {
            email: user?.email,
            phone: user?.phone,
            username: user?.username,
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
                <Text style={{ fontSize: 24, fontWeight: '800' }}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.infoWrapper}>
                <Text style={styles.info}>Email:</Text>
                <TextInput
                    style={styles.infoInput}
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    value={formik.values.email}
                    editable={false}
                />
            </View>
            {formik.touched.email && formik.errors.email ? (
                <Text style={styles.errorText}>{formik.errors.email}</Text>
            ) : null}
            <View style={styles.infoWrapper}>
                <Text style={styles.info}>Username:</Text>
                <TextInput
                    style={styles.infoInput}
                    onChangeText={formik.handleChange('username')}
                    onBlur={formik.handleBlur('username')}
                    value={formik.values.username}
                    editable={StateEnableUpdate}
                />
            </View>
            {formik.touched.username && formik.errors.username ? (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            ) : null}

            <View style={styles.infoWrapper}>
                <Text style={styles.info}>Phone:</Text>
                <TextInput
                    style={styles.infoInput}
                    onChangeText={formik.handleChange('phone')}
                    onBlur={formik.handleBlur('phone')}
                    value={formik.values.phone}
                    editable={StateEnableUpdate}
                />
            </View>
            {formik.touched.phone && formik.errors.phone ? (
                <Text style={styles.errorText}>{formik.errors.phone}</Text>
            ) : null}
            {StateEnableUpdate ?
                (
                    <View style={{ flexDirection: 'row', gap: 20, marginTop: 16 }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            borderRadius: 8,
                            borderWidth: 2,
                            borderColor: colors.blackColor,
                            padding: 12,
                            alignItems: 'center'
                        }}
                            onPress={handleChangeStateUpdate}>
                            <Text style={{ color: colors.blackColor, fontSize: 18, fontWeight: '500' }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.updateBtn, { flex: 1, alignItems: 'center', padding: 12, borderRadius: 8 }]}
                            onPress={formik.handleSubmit}
                        >
                            <Text style={styles.updateBtnText}>Cập nhật</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={[styles.updateBtn, { flex: 1, alignItems: 'center', marginTop: 16, padding: 12, borderRadius: 8 }]}
                        onPress={handleChangeStateUpdate}
                    >
                        <Text style={styles.updateBtnText}>Cập nhật</Text>
                    </TouchableOpacity>
                )}
        </View>
    )
}