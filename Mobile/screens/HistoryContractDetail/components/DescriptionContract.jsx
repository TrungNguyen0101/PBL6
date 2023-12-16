/* eslint-disable react/prop-types */
import { Dimensions, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Notice from './Notice'
import PayMethodContract from './PayMethodContract'
import PayDetailContract from './PayDetailContract'

export default function DescriptionContract({ data }) {
  const screenHeight = Dimensions.get('window').height
  return (
    <SafeAreaView style={{ flex: 1, minHeight: screenHeight }}>
      <ScrollView style={{ flex: 1 }}>
        <PayMethodContract />
        <PayDetailContract data={data} />
        <Notice />
      </ScrollView>
    </SafeAreaView>
  )
}
