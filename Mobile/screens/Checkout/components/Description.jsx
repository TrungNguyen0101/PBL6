import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native'
import React from 'react'
import PayMethod from './PayMethod'
import PayDetail from './PayDetail'
import Notice from './Notice'


export default function Description() {
    const screenHeight = Dimensions.get('window').height
    return (
        <SafeAreaView style={{ flex: 1, minHeight: screenHeight }}>
            <ScrollView style={{ flex: 1 }}>
                <PayMethod />
                <PayDetail />
                <Notice />
            </ScrollView>
        </SafeAreaView>
    )
}