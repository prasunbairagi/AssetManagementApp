import React, { useState } from 'react'
import EntireAssets from '../screens/EntireAssets'
import Home from '../screens/Home'
import QRScanner from '../screens/QRScanner'
import AssetInfo from '../screens/AssetInfo'
import AddAsset from '../screens/AddAsset'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

const ContentTabs = () => {
  const usernamefetched = useSelector((state) => state.userName)
  const [username, setUsername] = useState(
    usernamefetched ? usernamefetched : ''
  )
  const truncatedUsername =
    username.length > 8 ? `${username.slice(0, 6)}...` : username
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const handleButtonClick = () => {
    actions.userNameRemoval()
    actions.loggedout()
  }
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
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: 'white'
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            // Add headerRight option
            <TouchableOpacity
              onPress={handleButtonClick}
              style={{ marginRight: 20 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 5 }}>
                  <Text style={{ color: 'white', marginLeft: 5, fontSize: 10 }}>
                    Not You..?
                  </Text>
                  <Text style={{ color: 'white', marginLeft: 5, fontSize: 13 }}>
                    Logout
                  </Text>
                </View>
                <Entypo name={'circle-with-cross'} size={24} color={'white'} />
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            // Add headerLeft option
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20
              }}
            >
              <MaterialCommunityIcons name="face-man" size={24} color="white" />
              <View>
                <Text style={{ color: 'white', marginLeft: 5, fontSize: 10 }}>
                  Welcome..!!
                </Text>
                <Text style={{ color: 'white', marginLeft: 5, fontSize: 13 }}>
                  {truncatedUsername}
                </Text>
              </View>
            </View>
          )
        }}
      >
        <Tab.Screen
          name={'Home'}
          options={{
            tabBarIcon: ({ focused }) => (
              <Entypo
                name={'home'}
                size={25}
                color={focused ? '#d0f595' : 'white'}
              />
            )
          }}
        >
          {() => <Home />}
        </Tab.Screen>
        <Tab.Screen
          name={'Add New'}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add-circle-sharp"
                size={28}
                color={focused ? '#d0f595' : 'white'}
              />
            ),
            unmountOnBlur: true
          }}
        >
          {() => <AddAsset />}
        </Tab.Screen>
        <Tab.Screen
          name="Scanner"
          component={QRScanner}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="scan-circle"
                size={30}
                color={focused ? '#d0f595' : 'white'}
              />
            ),
            unmountOnBlur: true
          }}
          key={Date.now()}
        />
        <Tab.Screen
          name={'AssetInfo'}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name={'info-circle'}
                size={25}
                color={focused ? '#d0f595' : 'white'}
              />
            ),
            unmountOnBlur: true
          }}
        >
          {() => <AssetInfo />}
        </Tab.Screen>

        <Tab.Screen
          name={'Assets List'}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name={'th-list'}
                size={25}
                color={focused ? '#d0f595' : 'white'}
              />
            ),
            unmountOnBlur: true
          }}
        >
          {() => <EntireAssets />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  )
}
// const styles = StyleSheet.create({
//   leftHeadertext:{ color: 'white', marginLeft: 5 ,fontSize:13, },
//   userNameEllipsis:{overFlow: 'hidden',
//   whiteSpace: 'nowrap',
//   textOverflow: 'ellipsis',
//   width: '8ch'}
// })
export default ContentTabs
