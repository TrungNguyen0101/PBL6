import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { CheckoutContext } from '../../context/CheckoutProvider'
import { RadioButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import colors from '../../contains/colors'

import VNPAY_IMAGE from '../../assets/Image/Payment/vnpay.jpg'

export default function PaymentMethod() {
    const { setShipMethod } = useContext(CheckoutContext)
    const [checked, setChecked] = useState('cash')
    const navigation = useNavigation()

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <View
                style={{
                    flexDirection: 'row',
                    padding: 4,
                    gap: 6,
                    alignItems: 'center',
                }}
            >
                <RadioButton
                    value="cash"
                    status={checked === 'cash' ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setShipMethod({
                            label: 'Thanh toán khi nhận hàng',
                            value: 'cash',
                        })
                        setChecked('cash')
                    }}
                />
                <Text style={{ fontSize: 20 }}>Thanh toán khi nhận hàng</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    padding: 4,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <RadioButton
                        value="vnpay"
                        status={checked === 'vnpay' ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setShipMethod({
                                label: 'Thanh toán qua cổng VNPAY',
                                value: 'vnpay',
                            })
                            setChecked('vnpay')

                        }}
                    />
                    <Text style={{ fontSize: 20 }}>Thanh toán qua cổng VNPAY</Text>
                </View>
                <Image source={VNPAY_IMAGE} style={{ width: 52, height: 52 }} />
            </View>
            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => {
                        setShipMethod({
                            label: 'Thanh toán khi nhận hàng',
                            value: 'cash',
                        })
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
                    onPress={() => navigation?.navigate('Checkout')}
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
    )
}
