import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import AddAssetScreen1 from './AddAssetScreen1'
import AddAssetScreen2 from './AddAssetScreen2'


const AddAsset = () => { 
  
  return (
    <>
    <View style={styles.disclaimationBox}>
        <Text style={styles.disclaimationText}>
          Hey User ! Please Add your Asset
        </Text>
    </View>
    <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance:100
      }}>
      <Stack.Screen name="Home" component={AddAssetScreen1}  options={{ headerShown: false }}/>
      <Stack.Screen name="Notifications" component={AddAssetScreen2}  options={{ headerShown: false }}/>
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
    </>
  )
}
const styles = StyleSheet.create({
  disclaimationText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center'
  },
  disclaimationBox: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    margin: 20
  }
})
export default AddAsset
