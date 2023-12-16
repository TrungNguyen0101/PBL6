/* eslint-disable react/prop-types */
import { Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient'
import {
  AntDesign,
  Feather,
  Fontisto,
  FontAwesome,
  MaterialIcons,
  Entypo,
  SimpleLineIcons,
} from '@expo/vector-icons'
import colors from '../../../contains/colors'
import { AuthContext } from '../../../context/AuthProvider'
import Toast from 'react-native-toast-message'
import { CheckoutContext } from '../../../context/CheckoutProvider'

export default function Settings({ navigation }) {
  const { user, setUser } = useContext(AuthContext)
  const { setCart } = useContext(CheckoutContext)

  const handleLogout = () => {
    if (user) {
      setUser(null)
      setCart(null)
      navigation.navigate('Home')
      Toast.show({
        type: 'success',
        text1: 'Thông báo',
        text2: 'Đăng xuất thành công',
      })
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        end={{ x: 0.2, y: 0.8 }}
        style={styles.header}
        colors={[colors.linearGradientColor, colors.primaryColor]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Feather name="settings" size={32} color="white" />
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.loginWrapper}>
          <View style={styles.iconLoginWrapper}>
            <AntDesign name="user" size={36} color={colors.primaryColor} />
          </View>
          {user ? (
            <Text style={styles.signInText}>{user?.username}</Text>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signInText}>Đăng nhập</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
      <View style={styles.body}>
        {user ? (
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.optionIconWrapper}>
              <FontAwesome name="user" size={24} color="white" />
            </View>
            <View style={styles.optionTextWrapper}>
              <Text style={styles.optionText}>Thông tin cá nhân</Text>
              <Fontisto name="angle-right" size={16} color="black" />
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
        {user ? (
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate('HistoryContract', { headerName: 'Lịch sử giao dịch' })}
          >
            <View style={styles.optionIconWrapper}>
              <MaterialIcons name="history" size={24} color="white" />
            </View>
            <View style={styles.optionTextWrapper}>
              <Text style={styles.optionText}>Lịch sử giao dịch</Text>
              <Fontisto name="angle-right" size={16} color="black" />
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionIconWrapper}>
            <MaterialIcons name="privacy-tip" size={24} color="white" />
          </View>
          <View style={styles.optionTextWrapper}>
            <Text style={styles.optionText}>Chính sách</Text>
            <Fontisto name="angle-right" size={16} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionIconWrapper}>
            <Entypo name="help" size={24} color="white" />
          </View>
          <View style={styles.optionTextWrapper}>
            <Text style={styles.optionText}>Hỗ trợ</Text>
            <Fontisto name="angle-right" size={16} color="black" />
          </View>
        </TouchableOpacity>
        {user ? (
          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <View style={styles.optionIconWrapper}>
              <SimpleLineIcons name="logout" size={24} color="white" />
            </View>
            <View style={styles.optionTextWrapper}>
              <Text style={styles.optionText}>Đăng xuất</Text>
              <Fontisto name="angle-right" size={16} color="black" />
            </View>
          </TouchableOpacity>
        ) : (
          ''
        )}
      </View>
    </View>
  )
}
