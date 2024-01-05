import { Alert, Dimensions, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import colors from '../../contains/colors'

import { useNavigation } from '@react-navigation/native'
import ListProductContract from './components/ListProductContract'
import AddressContract from './components/AddressContract'
import DescriptionContract from './components/DescriptionContract'
import { ContractContext } from '../../context/ContractProvider'
import { post } from '../../axios-config'
import { AuthContext } from '../../context/AuthProvider'
import Toast from 'react-native-toast-message'

export default function HistoryContractDetail() {
  const { accessToken } = useContext(AuthContext)
  const screenHeight = Dimensions.get('window').height
  const { contract } = useContext(ContractContext)
  const navigation = useNavigation()

  const handleCancelContract = useCallback(async () => {
    try {
      const response = await post('/payment/update_state', {
        orderId: contract.orderId,
        status: 4,
      }, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      })
      if (response) {
        Toast.show({
          text1: 'Thông báo',
          text2: 'Đã hủy đơn thành công',
        })
        navigation.navigate('Settings')
      }
    } catch (error) {
      console.log(error)
    }
  }, [accessToken, contract.orderId, navigation])

  const handleAccept = useCallback(() => {
    Alert.alert(
      "Thông báo",
      "Thực hiện hủy đơn sẽ không thể hoàn tác, bạn có thật sự muốn hủy đơn không ?",
      [
        {
          text: 'Đóng',
          style: 'cancel'
        },
        {
          text: 'Đồng ý',
          onPress: () => handleCancelContract()
        }
      ]
    )
  }, [handleCancelContract])

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
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          bottom: 0,
          elevation: 4,
          zIndex: 99999999,
        }}
      >
        {contract.status === 4 ? (
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#ccc',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 18, color: colors.whiteColor }}>
              Đã hủy
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleAccept}
            style={{
              flex: 1,
              backgroundColor: colors.orangeColor,
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 18, color: colors.whiteColor }}>
              Hủy đơn hàng
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
