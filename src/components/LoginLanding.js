import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import LoginTabs from './LoginTabs'
// import Login from '../screens/Login'

const LoginLanding = ()=> {
  return (   
    // <Login/> 
      <NavigationContainer>
        <LoginTabs />
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldText: {
    fontWeight: 'bold'
  }
})

export default LoginLanding
