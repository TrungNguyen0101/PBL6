import { Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import colors from '../../contains/colors'

import { useNavigation } from '@react-navigation/native'
import ListProductContract from './components/ListProductContract'
import AddressContract from './components/AddressContract'
import DescriptionContract from './components/DescriptionContract'
import { ContractContext } from '../../context/ContractProvider'

export default function HistoryContractDetail() {
  const screenHeight = Dimensions.get('window').height
  const { contract } = useContext(ContractContext)
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, minHeight: screenHeight }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HistoryContract', { headerName: 'Lịch sử giao dịch' })}
        style={{
          position: 'absolute',
          zIndex: 99999999999,
          marginTop: 46,
          marginLeft: 24,
        }}
      >
        <Text style={{ fontSize: 16 }}>Trở lại</Text>
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: colors.whiteColor,
          paddingTop: 40,
          paddingBottom: 12,
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 20, color: colors.blackColor }}>Đơn hàng</Text>
      </View>
      <AddressContract
        name={contract.name}
        phone={contract.phone}
        address={contract.address}
      />
      <ListProductContract data={contract.cart} />
      <DescriptionContract data={contract} />
    </View>
  )
}
