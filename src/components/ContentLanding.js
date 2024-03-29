import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import ContentTabs from './ContentTabs'
// import { Provider } from 'react-redux'
// import { store } from './src/state/store'

const ContentLanding = ()=> {
  return (
    <>
      <NavigationContainer>
        <ContentTabs />
      </NavigationContainer>    
    </>
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

export default ContentLanding
