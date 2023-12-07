/* eslint-disable react/prop-types */
import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import styles from './styles'
import Overview from './components/Overview'
import ProfileUpdateForm from './components/ProfileUpdateForm'
import ChangePasswordForm from './components/ChangePasswordForm'
import VerifyForm from './components/VerifiyForm'

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Overview styles={styles} navigation={navigation} />
        <ProfileUpdateForm styles={styles} />
        <ChangePasswordForm styles={styles} />
        <VerifyForm styles={styles} />
      </ScrollView>
    </SafeAreaView>
  )
}
