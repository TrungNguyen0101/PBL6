import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//color & icon
import colors from './contains/colors';
import { AntDesign, FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';

//Provider
import AuthProvider from './context/AuthProvider';

//Auth screen
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';

//Tab
import Cart from './screens/Tabs/Cart';
import Settings from './screens/Tabs/Settings';
import Home from './screens/Tabs/Home';
import Favorites from './screens/Tabs/Favorites';
import Shop from './screens/Tabs/Categories';

//Screens
import CategoryProduct from './screens/CategoryProduct'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabs">
          <Stack.Screen
            name="Tabs"
            component={TabsComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryProduct"
            component={CategoryProduct}
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
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

function TabsComponent() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

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
        } else if (route.name === 'Favorites') {
          if (focused) {
            return <AntDesign name="heart" size={24} color={color} />
          } else {
            return <AntDesign name="hearto" size={24} color={color} />
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
      <Tab.Screen name="Favorites" component={Favorites} options={{ headerShown: false }} />
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
