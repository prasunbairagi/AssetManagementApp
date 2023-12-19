import React from 'react'
import EntireAssets from '../screens/EntireAssets'
import Home from '../screens/Home new'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { StatusBar } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import QRScanner from '../screens/QRScanner new';
import { createStackNavigator } from '@react-navigation/stack';
import AssetInfo from '../screens/AssetInfo new'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();
const QRScannerStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="QRScanner" component={QRScanner} options={{ headerShown: false }}/>
    <Stack.Screen name="AssetInfo" component={AssetInfo} options={{ headerShown: true }}/>
  </Stack.Navigator>
);
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyHome" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="AssetInfo" component={AssetInfo} options={{ headerShown: true }}/>
  </Stack.Navigator>
);

// const AssetInfoStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="AssetInfo" component={AssetInfo} options={{ headerShown: false }}/>
//   </Stack.Navigator>
// );
const Tabs = () => {
  
  return (
    <>
    <StatusBar
        backgroundColor="black"  // Set your desired background color
        barStyle="white" // Set the content (text) color
    />
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor:
          '#d0f595',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: '#009933',
          height:60,
          paddingBottom:5,
          
        },
        headerStyle: {
          backgroundColor: '#009933'          
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
        name={'Home'}
        options={{
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={'home'}
              size={25}
              color={
                focused
                  ? '#d0f595'
                  : 'white'
              }
            />
          )
        }}
      >
        {() => <HomeStack/>}
      </Tab.Screen>
      <Tab.Screen name="Scanner" component={QRScannerStack} options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons 
              name="scan-circle"
              size={30}
              color={
                focused
                  ? '#d0f595'
                  : 'white'
              }
            />
          ),
          unmountOnBlur: true}} key={Date.now()} />
        {/* <Tab.Screen
        name={'Asset Info'}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name={'info-circle'}
              size={25}
              color={
                focused
                  ? '#d0f595'
                  : 'white'
              }
            />
          ),
          unmountOnBlur: true
        }}
      >
        {() => <AssetInfoStack />}
        </Tab.Screen> */}
       
      <Tab.Screen
        name={'Assets List'}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name={'th-list'}
              size={25}
              color={
                focused
                  ? '#d0f595'
                  : 'white'
              }
            />
          )
        }}
      >
        {() => <EntireAssets />}
      </Tab.Screen>
      
      
    </Tab.Navigator>
    
    
    </>
  )
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// })
export default Tabs
