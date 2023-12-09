/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import {
    Dimensions,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import colors from '../../contains/colors'
import { get } from '../../axios-config'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native'
import { CheckoutContext } from '../../context/CheckoutProvider'

export default function PaymentAddress() {
    const navigation = useNavigation()
    const heightScreen = Dimensions.get('window').height
    const { setAddressCheckout } = useContext(CheckoutContext)
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
        },
        validationSchema: yup
            .object({
                name: yup.string().required('Please enter your name'),
                phone: yup
                    .string()
                    .matches(/^[0-9]{10}$/, 'Invalid phone number')
                    .required('Please enter your phone'),
                address: yup.string().required('Please enter your address'),
            })
            .required(),
        onSubmit: async (values) => {
            try {
                setAddressCheckout({
                    name: values?.name,
                    phone: values?.phone,
                    address: values?.address
                })
                navigation?.navigate('Checkout')
            } catch (error) {
                console.log(error)
            }
        },
    })
    const [isShowListLocation, setIsShowListLocation] = useState(false)
    const [listLocation, setListLocation] = useState([])
    const [location, setlocation] = useState('')
    const fetchAllLocation = async () => {
        const response = await get(
            `https://rsapi.goong.io/Place/AutoComplete?api_key=GS65AY8rHZnAKAMvfwP8tZvMNaszJrCS1bZM6NYg&input=${location}`,
        )
        if (response && response?.status === 200) {
            setListLocation(response?.data?.predictions)
        }
    }

    useEffect(() => {
        fetchAllLocation()
    }, [formik.values.address])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ height: heightScreen, flex: 1 }}>
                <View
                    style={{
                        position: 'relative',
                        flex: 1,
                        height: heightScreen * 0.905,
                    }}
                >
                    <View style={{ gap: 24, paddingHorizontal: 12, marginTop: 12 }}>
                        <View style={{ gap: 4 }}>
                            <Text style={{ fontSize: 20 }}>Họ và tên</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: colors?.blackColor,
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 12,
                                    backgroundColor: colors?.whiteColor,
                                    fontSize: 24,
                                }}
                                value={formik.values.name}
                                onChangeText={formik.handleChange('name')}
                                onBlur={formik.handleBlur('name')}
                                autoCapitalize="none"
                                placeholder="Enter your name"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <Text style={{ color: colors?.orangeColor }}>{formik.errors.name}</Text>
                            ) : null}
                        </View>
                        <View style={{ gap: 4 }}>
                            <Text style={{ fontSize: 20 }}>Số điện thoại</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: colors?.blackColor,
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 12,
                                    backgroundColor: colors?.whiteColor,
                                    fontSize: 24,
                                }}
                                value={formik.values.phone}
                                onChangeText={formik.handleChange('phone')}
                                onBlur={formik.handleBlur('phone')}
                                autoCapitalize="none"
                                placeholder="Enter your phone"
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <Text style={{ color: colors?.orangeColor }}>{formik.errors.phone}</Text>
                            ) : null}
                        </View>
                        <View style={{ gap: 4 }}>
                            <Text style={{ fontSize: 20 }}>Địa chỉ</Text>
                            <TextInput
                                style={{
                                    borderWidth: 1,
                                    borderColor: colors?.blackColor,
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 12,
                                    backgroundColor: colors?.whiteColor,
                                    fontSize: 24,
                                }}
                                value={formik.values.address}
                                onChangeText={(text) => {
                                    formik.handleChange('address')(text)
                                    setlocation(text)
                                    setIsShowListLocation(true)
                                }}
                                onBlur={formik.handleBlur('address')}
                                autoCapitalize="none"
                                placeholder="Enter your address"
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <Text style={{ color: colors?.orangeColor }}>{formik.errors.address}</Text>
                            ) : null}
                            <View
                                style={{
                                    borderRadius: 4,
                                    backgroundColor: colors?.whiteColor,
                                    paddingHorizontal: 12,
                                }}
                            >
                                {isShowListLocation &&
                                    location &&
                                    listLocation?.map((x, i) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                formik.handleChange('address')(x.description)
                                                setIsShowListLocation(false)
                                                setlocation(x?.address)
                                            }}
                                            key={i}
                                            style={{ paddingVertical: 8 }}
                                        >
                                            <Text style={{ color: colors?.blackColor, fontSize: 18 }}>
                                                {x.description}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        </View>
                    </View>
                    <View
                        style={{ bottom: 0, flexDirection: 'row', position: 'absolute' }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                navigation?.navigate('Checkout')
                            }}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                borderWidth: 1,
                                borderColor: colors?.blackColor,
                                backgroundColor: colors?.whiteColor,
                            }}
                        >
                            <Text style={{ fontSize: 20 }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={formik.handleSubmit}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                backgroundColor: colors?.orangeColor,
                            }}
                        >
                            <Text style={{ fontSize: 20, color: colors?.whiteColor }}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
