import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8
  },
  loginBtn: {
    backgroundColor: '#cac0e6',
    paddingHorizontal: 32,
    paddingVertical: 12
  },
  loginText: {

  }
})