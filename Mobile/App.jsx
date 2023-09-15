import React from 'react';
import styles from './App.styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AntDesign, Feather } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Categories from './screens/Categories';
import Category from './screens/Category';
import Cart from './screens/Cart';
import Settings from './screens/Settings';
import SignIn from './screens/SignIn';
import colors from './contains/colors';
import Home from './screens/Home';
import SignUp from './screens/SignUp';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen
          name="Tabs"
          component={TabsComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={({ route }) => ({ title: route.params.headerName })}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          // options={({ route }) => ({ title: route.params.headerName })}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options={({ route }) => ({ title: route.params.headerName })}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TabsComponent() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home';
        } else if (route.name === 'Categories') {
          iconName = focused ? 'book' : 'book';
        } else if (route.name === 'Cart') {
          iconName = focused ? 'shoppingcart' : 'shoppingcart';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings';
          return <Feather name={iconName} size={size} color={color} />
        }

        // You can return any component that you like here!
        return <AntDesign name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#000',
      tabBarInactiveTintColor: colors.primaryColor,
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
