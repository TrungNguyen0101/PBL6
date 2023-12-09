import {
    Alert,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import colors from '../../../contains/colors'
import { Feather } from '@expo/vector-icons'
import { post } from '../../../axios-config'
import { ProductContext } from '../../../context/ProductProvider'
import Toast from 'react-native-toast-message'
import { AuthContext } from '../../../context/AuthProvider'
import { useNavigation } from '@react-navigation/native'
export default function CommentForm() {
    const { detailProduct, fetchCommentsProductData } = useContext(ProductContext)
    const { accessToken, user } = useContext(AuthContext)
    const navigation = useNavigation()
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        validationSchema: yup
            .object({
                comment: yup.string().required('Please enter your comment'),
            })
            .required(),
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = {
                    comment: values?.comment,
                }
                if (!user) {
                    Alert.alert('Thông báo', 'Bạn chưa đăng nhập', [
                        {
                            text: 'Đóng',
                            style: 'cancel',
                        },
                        {
                            text: 'Đăng nhập',
                            onPress: () => navigation?.navigate('SignIn'),
                        },
                    ])
                    return
                }
                const response = await post(
                    `/book/${detailProduct?._id}/comments/create`,
                    formData,
                    {
                        headers: {
                            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                        },
                    },
                )
                if (response) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thông báo',
                        text2: 'Bình luận thành công',
                    })
                    resetForm()
                    fetchCommentsProductData(detailProduct?._id)
                }
            } catch (error) {
                console.log(error)
            }
        },
    })
    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                position: 'absolute',
                paddingVertical: 12,
                bottom: 0,
                paddingHorizontal: 12,
                backgroundColor: colors?.whiteColor,
                borderTopColor: colors?.grayColor,
                borderTopWidth: 1,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
            }}
        >
            <View style={{ flex: 1 }}>
                <TextInput
                    value={formik.values.comment}
                    onChangeText={formik.handleChange('comment')}
                    onBlur={formik.handleBlur('comment')}
                    autoCapitalize="none"
                    style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: colors?.blackColor,
                        height: 40,
                        fontSize: 18,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 12,
                    }}
                    placeholder="Enter your comment"
                />
                {formik.touched.comment && formik.errors.comment ? (
                    <Text style={{ color: colors.orangeColor }}>
                        {formik.errors.comment}
                    </Text>
                ) : null}
            </View>

            <TouchableOpacity
                onPress={formik.handleSubmit}
                style={{
                    padding: 12,
                    borderRadius: 50,
                    backgroundColor: colors.primaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Feather name="send" size={20} color={colors.whiteColor} />
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}
