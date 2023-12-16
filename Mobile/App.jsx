import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

// color & icon
import colors from './contains/colors'
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons'

// Provider
import AuthProvider from './context/AuthProvider'
import ProductProvider from './context/ProductProvider'
import StateProvider from './context/StateProvider'

// Auth screen
import SignIn from './screens/Auth/SignIn'
import SignUp from './screens/Auth/SignUp'

// Tab
import Cart from './screens/Tabs/Cart'
import Settings from './screens/Tabs/Settings'
import Home from './screens/Tabs/Home'
import Shop from './screens/Tabs/Shop'

// Screens
import ListProductByCategory from './screens/ListProductByCategory'
import Profile from './screens/Profile'
import DetailProduct from './screens/DetailProduct'
import Checkout from './screens/Checkout'
import ListAllProduct from './screens/ListAllProduct'
import CheckoutProvider from './context/CheckoutProvider'
import Comments from './screens/Comments'
import ForgetPassword from './screens/Auth/ForgetPassword'
import PaymentMethod from './screens/PaymentMethod'
import PaymentAddress from './screens/PaymentAddress'
import WebViewScreen from './screens/WebView'
import HistoryContract from './screens/HistoryContract'
import HistoryContractDetail from './screens/HistoryContractDetail'
import ContractProvider from './context/ContractProvider'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745' }}
      text1Style={{
        fontSize: 22,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 17,
        fontWeight: '700',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545' }}
      text1Style={{
        fontSize: 22,
        fontWeight: '700',
      }}
      text2Style={{
        fontSize: 17,
      }}
    />
  ),
}

export default function App() {
  return (
    <StateProvider>
      <AuthProvider>
        <CheckoutProvider>
          <ProductProvider>
            <ContractProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Tabs">
                  <Stack.Screen
                    name="Tabs"
                    component={TabsComponent}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="CategoryProduct"
                    component={ListProductByCategory}
                    options={({ route }) => ({ title: route.params.headerName })}
                  />
                  <Stack.Screen
                    name="AllProducts"
                    component={ListAllProduct}
                    options={({ route }) => ({ title: route.params.headerName })}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="DetailProduct"
                    component={DetailProduct}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Checkout"
                    component={Checkout}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="HistoryContractDetail"
                    component={HistoryContractDetail}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Comments"
                    component={Comments}
                    options={({ route }) => ({ title: route.params.headerName })}
                  />
                  <Stack.Screen
                    name="PaymentMethod"
                    component={PaymentMethod}
                    options={({ route }) => ({ title: route.params.headerName })}
                  />
                  <Stack.Screen
                    name="PaymentAddress"
                    component={PaymentAddress}
                    options={({ route }) => ({ title: route.params.headerName })}
                  />
                  <Stack.Screen
                    name="HistoryContract"
                    component={HistoryContract}
                    options={({ route }) => ({ title: route.params.headerName })}
                  />
                  <Stack.Screen
                    name="WebViewScreen"
                    component={WebViewScreen}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ContractProvider>
            <Toast config={toastConfig} />
          </ProductProvider>
        </CheckoutProvider>
      </AuthProvider>
    </StateProvider>
  )
}

function TabsComponent() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            if (focused) {
              return <Ionicons name="home-sharp" size={24} color={color} />
            } else {
              return <Ionicons name="home-outline" size={24} color={color} />
            }
          } else if (route.name === 'Shop') {
            if (focused) {
              return <Ionicons name="cart" size={24} color={color} />
            } else {
              return <Ionicons name="cart-outline" size={24} color={color} />
            }
          } else if (route.name === 'Cart') {
            if (focused) {
              return <FontAwesome name="shopping-bag" size={24} color={color} />
            } else {
              return <SimpleLineIcons name="handbag" size={24} color={color} />
            }
          } else if (route.name === 'Settings') {
            if (focused) {
              return <Ionicons name="settings" size={24} color={color} />
            } else {
              return (
                <Ionicons name="settings-outline" size={24} color={color} />
              )
            }
          }
        },
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: '#000',
        tabBarStyle: { height: 56 },
        tabBarLabelStyle: { fontSize: 16 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}
