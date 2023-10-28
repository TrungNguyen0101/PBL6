import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'

import wallpaper from '../../assets/Image/Profile/wallpaper.jpg'
import avatar from '../../assets/Image/Profile/avatar.jpg'
import { AuthContext } from '../../context/AuthProvider'
import colors from '../../contains/colors';

export default function Profile({navigation}) {
    const [StateEnableUpdate, setStateEnableUpdate] = useState(false)
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height
    const { user } = useContext(AuthContext)

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
            email: user.email,
            phone: user.phone,
            username: user.username,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log('Submitted:', values);
        },
    });

    const handleEnableUpdate = () => {
        setStateEnableUpdate(!StateEnableUpdate)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backWrapper} onPress={() => navigation.navigate('Settings')}>
                <AntDesign name="left" size={24} color={colors.whiteColor} />
                <Text style={styles.backText}>Trở lại</Text>
            </TouchableOpacity>
            <Image resizeMode='contain' style={{ width: screenWidth, height: screenHeight * 0.322 }} source={wallpaper} />
            <View style={[styles.avatarWrapper, { top: screenHeight * 0.24, left: screenWidth * 0.3, }]}>
                <Image style={styles.avatarImg} resizeMode='contain' source={avatar} />
                <Text style={styles.avatarName}>{user.username}</Text>
            </View>
            <View style={{ marginTop: screenHeight * 0.15, alignItems: 'center' }}>
                <TouchableOpacity style={styles.updateBtn} onPress={handleEnableUpdate}>
                    <Text style={styles.updateBtnText}>Cập nhật thông tin cá nhân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.updateBtn, {marginTop: 4}]}>
                    <Text style={styles.updateBtnText}>Đổi mật khẩu</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.profileWrapper}>
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
                    <Text style={styles.info}>Email:</Text>
                    <TextInput
                        style={styles.infoInput}
                        onChangeText={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        value={formik.values.email}
                        editable={StateEnableUpdate}
                    />
                </View>
                {formik.touched.email && formik.errors.email ? (
                    <Text style={styles.errorText}>{formik.errors.email}</Text>
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
                {StateEnableUpdate ? (
                    <TouchableOpacity
                        style={[styles.updateBtn, { alignItems: 'center' }]}
                        onPress={formik.handleSubmit}
                    >
                        <Text style={styles.updateBtnText}>Cập nhật</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    )
}
