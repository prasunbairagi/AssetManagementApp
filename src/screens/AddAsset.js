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
import AddAssetScreen3 from './AddAssetScreen3'
import AddAssetScreen4 from './AddAssetScreen4'


const AddAsset = () => { 
  
  return (
    <>
    <View style={styles.disclaimationBox}>
        <Text style={styles.disclaimationText}>
          Hey! You can ADD your Asset here
        </Text>
    </View>
    <Stack.Navigator screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        gestureResponseDistance:100
      }}>
      <Stack.Screen name="AddAsset1" component={AddAssetScreen1}  options={{ headerShown: false }}/>
      <Stack.Screen name="AddAsset2" component={AddAssetScreen2}  options={{ headerShown: false }}/>
      <Stack.Screen name="AddAsset3" component={AddAssetScreen3}  options={{ headerShown: false }}/>
      <Stack.Screen name="AddAsset4" component={AddAssetScreen4}  options={{ headerShown: false }}/>
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
