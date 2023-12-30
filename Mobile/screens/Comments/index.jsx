import { View } from 'react-native'
import React from 'react'
import ListComment from './components/ListComment'
import CommentForm from './components/CommentForm'

export default function Comments() {
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ListComment />
      <CommentForm />
    </View>
  )
}
