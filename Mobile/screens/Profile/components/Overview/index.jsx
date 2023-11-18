import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AntDesign } from '@expo/vector-icons';

import colors from '../../../../contains/colors';

import wallpaper from '../../../../assets/Image/Profile/wallpaper.jpg'
import avatar from '../../../../assets/Image/Profile/avatar.jpg'

import { AuthContext } from '../../../../context/AuthProvider'

export default function Overview({ styles, navigation }) {
    const { user } = useContext(AuthContext)
    const screenWidth = Dimensions.get('window').width
    const screenHeight = Dimensions.get('window').height

    return (
        <View style={{ flex: 1, height: screenHeight * 0.45 }}>
            <TouchableOpacity style={styles.backWrapper} onPress={() => navigation.navigate('Settings')}>
                <AntDesign name="left" size={24} color={colors.whiteColor} />
                <Text style={styles.backText}>Trở lại</Text>
            </TouchableOpacity>
            <Image resizeMode='contain' style={{ width: screenWidth, height: screenHeight * 0.322 }} source={wallpaper} />
            <View style={[styles.avatarWrapper, { top: screenHeight * 0.24, left: screenWidth * 0.3, }]}>
                <Image style={styles.avatarImg} resizeMode='contain' source={avatar} />
                <Text style={styles.avatarName}>{user?.username}</Text>
            </View>
        </View>
    )
}