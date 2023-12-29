import { SafeAreaView, ScrollView, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import HistoryContractCard from '../../components/HistoryContractCard'
import { get } from '../../axios-config'
import { AuthContext } from '../../context/AuthProvider'

export default function HistoryContract() {
    const [historyContract, setHistoryContract] = useState([])
    const { accessToken } = useContext(AuthContext)

    const fetchData = useCallback(async () => {
        try {
            const response = await get('/payment/payment_history', {
                headers: {
                    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
                },
            })
            if (response) {
                setHistoryContract(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }, [accessToken])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1, gap: 12, marginTop: 12, paddingHorizontal: 8 }}>
                    {historyContract.map((contract, index) => (
                        <HistoryContractCard
                            name={contract.name}
                            phone={contract.phone}
                            address={contract.address}
                            totalAmount={contract.totalmoney}
                            status={contract.status}
                            key={index}
                            data={contract}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
