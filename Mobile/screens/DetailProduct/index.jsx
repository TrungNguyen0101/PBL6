import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import colors from '../../contains/colors'
import Popular from '../Tabs/Home/components/Popular';
import Overview from './components/Overview';
import Filter from './components/Filter';
import ListRate from './components/ListRate';

export default function DetailProduct() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bgColor }}>
            <ScrollView style={{ flex: 1 }}>
                <Overview />
                <ListRate />
                <Popular title={"Có thể bạn cũng thích"} />
            </ScrollView>
            <Filter />
        </SafeAreaView >
    )
}