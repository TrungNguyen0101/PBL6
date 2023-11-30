import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// color & icon
import colors from './contains/colors';
import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

// Provider
import AuthProvider from './context/AuthProvider';
import ProductProvider from './context/ProductProvider';
import StateProvider from './context/StateProvider';

// Auth screen
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';

// Tab
import Cart from './screens/Tabs/Cart';
import Settings from './screens/Tabs/Settings';
import Home from './screens/Tabs/Home';
import Shop from './screens/Tabs/Shop';

// Screens
import ListProductByCategory from './screens/ListProductByCategory'
import Profile from './screens/Profile';
import DetailProduct from './screens/DetailProduct';
import Checkout from './screens/Checkout';
import ListAllProduct from './screens/ListAllProduct';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <StateProvider>
      <AuthProvider>
        <ProductProvider>
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
            </Stack.Navigator>
          </NavigationContainer>
        </ProductProvider>
      </AuthProvider>
    </StateProvider>
  );
}

function TabsComponent() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
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
            return <Ionicons name="settings-outline" size={24} color={color} />
          }
        }
      },
      tabBarActiveTintColor: colors.primaryColor,
      tabBarInactiveTintColor: '#000',
      tabBarStyle: { height: 56 },
      tabBarLabelStyle: { fontSize: 16 },
    })}>
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Shop" component={Shop} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
