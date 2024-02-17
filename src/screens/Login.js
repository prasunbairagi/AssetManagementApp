import React from 'react'
import { SafeAreaView, StyleSheet, View, Button } from 'react-native'
import { Text,TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useSelector } from 'react-redux'

const Login = () => {
    const loggedinstate=useSelector((state)=>state.loginState)
  const dispatch=useDispatch();
  const actions=bindActionCreators(actionCreators,dispatch)
// console.log(loggedinstate)
  const handleloginstate = () => {    
    actions.loggedin();
    // console.log(loggedinstate)    
  }
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
        />
        <TextInput
          style={styles.input}          
          placeholder="Password"
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
        />
        </View>
        <View style={styles.buttoncontainer}>
          <Button
            title="Login"
            color="#009933"
            onPress={handleloginstate}        
          />
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
    backgroundColor: '#fff',
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
    textAlign:'center'
  },
  homeinfo: {
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  buttoncontainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingVertical:20
  },
  input: {
    height: 50,
    marginHorizontal: 20,
    marginTop:20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    fontSize: 17
  }
})

export default Login
