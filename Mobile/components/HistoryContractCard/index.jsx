/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../contains/colors'
import { useNavigation } from '@react-navigation/native'
import { ContractContext } from '../../context/ContractProvider'

export default function HistoryContractCard({
    name,
    phone,
    address,
    status,
    totalAmount,
    data,
}) {
    const { setContract } = useContext(ContractContext)
    const navigation = useNavigation()
    const getStatusColor = (status) => {
        switch (status) {
            case 1:
                return colors.primaryColor
            case 2:
                return '#EE9B00'
            case 3:
                return '#5cb85c'
            case 4:
                return '#EF4444'
            default:
                return '#FFF'
        }
    }
    return (
        <View
            style={{
                position: 'relative',
                paddingVertical: 8,
                paddingHorizontal: 12,
                width: '100%',
                minHeight: 150,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.blackColor,
            }}
        >
            <View style={{ width: '100%', flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Người nhận:</Text>
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 18, fontWeight: '500', maxWidth: '80%' }}
                >
                    {name}
                </Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Số điện thoại:</Text>
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 18, fontWeight: '500', maxWidth: '80%' }}
                >
                    {phone}
                </Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Địa chỉ:</Text>
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 18, fontWeight: '500', maxWidth: '80%' }}
                >
                    {address}
                </Text>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Tổng tiền:</Text>
                <Text
                    numberOfLines={1}
                    style={{ fontSize: 18, fontWeight: '500', maxWidth: '80%' }}
                >
                    {Number(totalAmount).toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Text>
            </View>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Trạng thái:</Text>
                <View style={{ maxWidth: '80%' }}>
                    <Text
                        numberOfLines={1}
                        style={[
                            {
                                fontSize: 18,
                                fontWeight: '500',
                                paddingVertical: 4,
                                paddingHorizontal: 20,
                                backgroundColor: getStatusColor(status),
                                borderRadius: 8,
                                color: colors.whiteColor,
                            },
                        ]}
                    >
                        {status === 1 ? 'Đang chuẩn bị' : ''}
                        {status === 2 ? 'Đang giao' : ''}
                        {status === 3 ? 'Thành công' : ''}
                        {status === 4 ? 'Thất bại' : ''}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setContract(data)
                    navigation.navigate('HistoryContractDetail')
                }}
                style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    paddingVertical: 8,
                    paddingHorizontal: 24,
                    backgroundColor: colors.orangeColor,
                    borderRadius: 4,
                }}
            >
                <Text
                    style={{
                        color: colors.whiteColor,
                        fontSize: 18,
                        fontWeight: '500',
                    }}
                >
                    Chi tiết
                </Text>
            </TouchableOpacity>
        </View>
    )
}
