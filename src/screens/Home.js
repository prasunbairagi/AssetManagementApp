import React from 'react'
import { SafeAreaView, StyleSheet, View, Button } from 'react-native'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation = useNavigation()

  const handleScanner = () => {
    navigation.navigate('Scanner')
  }
  const handleSearchByCode = () => {
    navigation.navigate('AssetInfo')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <View style={styles.homeinfo}>
          <Text style={styles.heading}>Asset Management Tool</Text>
          <Text style={styles.subheading}>
            Establish visibility and control over your assets and costs
          </Text>

        </View>
        <View style={styles.buttoncontainer}>
          <Button
            title="Click to scan"
            color="#009933"
            onPress={handleScanner}
          />
          <Button
            title="Search by Code"
            color="#009933"
            onPress={handleSearchByCode}
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
    justifyContent:'space-between',
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
    backgroundColor: '#fff'
  },
  homeinfo: {
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  buttoncontainer:{
    flexDirection:'row',
    justifyContent:'space-around',
    paddingVertical:20

  }
})

export default Home
