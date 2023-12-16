/* eslint-disable react/prop-types */
import { Image, Text, View } from 'react-native'
import React from 'react'

import colors from '../../contains/colors'

export default function ContractCard({ name, quantity = 1, price, image, discount }) {
    return (
        <View
            style={{
                backgroundColor: colors.bgColor,
                flexDirection: 'row',
                gap: 8,
                padding: 6,
                marginTop: 4,
            }}
        >
            <Image
                style={{ width: 100, height: '100%' }}
                resizeMode="cover"
                source={{ uri: image }}
            />
            <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 18, maxWidth: '95%' }}>{name}</Text>
                {discount !== 0 ? (
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Text
                            style={[
                                {
                                    textDecorationLine: 'line-through',
                                    color: '#000',
                                    opacity: 0.5,
                                    fontSize: 18
                                },
                            ]}
                        >
                            {price.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                        <Text style={{
                            fontSize: 18,
                            color: colors.orangeColor
                        }}>
                            {Number(
                                (price * (100 - discount)) / 100,
                            ).toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={{
                            fontSize: 18,
                            color: colors.orangeColor
                        }}>
                            {price?.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                    </View>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    <Text style={{ fontSize: 16 }}>Số lượng: </Text>
                    <Text style={{ fontSize: 16 }}>{quantity}</Text>
                </View>
            </View>
        </View>
    )
}
