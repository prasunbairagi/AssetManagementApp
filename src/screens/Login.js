import React, { useState, useRef } from 'react'
import { SafeAreaView, StyleSheet, View, Button,Alert } from 'react-native'
import { Text, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import axios from 'axios'
// import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const userNameRef = useRef('')
  const passWordRef = useRef('')
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const handleloginstate = async () => {
    const userName = userNameRef.current
    const passWord = passWordRef.current
    var userLoginDetails = {
      UserName: userName,
      Password: passWord
    }
    console.log(userLoginDetails)
    await axios
      .post('http://192.168.1.3:1443/api/User/ValidateUser', userLoginDetails)
      .then(async (response) => {
        if (response.data.ErrorCode == 1) {
          // await AsyncStorage.setItem('user',response.data.Output );
          actions.userNameAssign(response.data.Output)
          actions.loggedin()
        }
        else{          
        createTwoButtonAlert('Incorrect User','Please enter Correct Username or Password')
        }
      })
      .catch((error) => {
        console.log(error)
        createTwoButtonAlert('Error Logging in','Its not you , its us .. !! Please try again')        
      })
  }
  const createTwoButtonAlert = (title,message) =>
    Alert.alert(title, message, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.homeinfo}>
          <Text style={styles.heading}>Welcome Back !!</Text>
          <Text style={styles.subheading}>
            Please Login to continue our services
          </Text>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            keyboardType="default"
            textContentType="username"
            onChangeText={(text) => (userNameRef.current = text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => (passWordRef.current = text)}
          />
        </View>
        <View style={styles.buttoncontainer}>
          <Button title="Login" color="#009933" onPress={handleloginstate} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10
  },
  subcontainer: {
    flex: 1,
    // justifyContent:'space-between',
    backgroundColor: '#fff'
  },
  heading: {
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  subheading: {
    fontSize: 17,
    backgroundColor: '#fff',
    textAlign: 'center'
  },
  homeinfo: {
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 17
  }
})

export default Login
