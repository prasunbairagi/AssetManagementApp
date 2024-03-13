import React from 'react'
import Login from '../screens/Login'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Signup from '../screens/Signup'
const pr = 'pr'
const Tab = createBottomTabNavigator()

const LoginTabs = () => {
  return (
    <>
      <StatusBar
        backgroundColor="black" // Set your desired background color
        barStyle="white" // Set the content (text) color
      />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#d0f595',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: '#009933',
            height: 60,
            paddingBottom: 5
          },
          headerStyle: {
            backgroundColor: '#009933'
            // height:0
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: 'white'
          },
          headerTitleAlign: 'center'
        }}
      >
        <Tab.Screen
          name={'Login'}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="face-man" size={25} color={focused ? '#d0f595' : 'white'} />
            )
          }}
        >
          {() => <Login />}
        </Tab.Screen>

        {/* <Tab.Screen
          name={'Signup'}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons name="face-man-shimmer" size={25} color={focused ? '#d0f595' : 'white'} />
            ),
            unmountOnBlur: true
          }}
        >
          {() => <Signup />}
        </Tab.Screen> */}
      </Tab.Navigator>
    </>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// })
export default LoginTabs
