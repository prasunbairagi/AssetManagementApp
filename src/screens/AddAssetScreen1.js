import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Keyboard
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const AddAssetScreen1 = ({ navigation }) => {
  const [assetcode, setAssetcode] = useState(null)

  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>Part 1 : Asset Information</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Asset Name"
              keyboardType="default"
              value={assetcode}
            />
            <TextInput
              style={styles.input}
              placeholder="Asset Type"
              keyboardType="default"
              value={assetcode}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Description"
              keyboardType="default"
              value={assetcode}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Model Number"
              keyboardType="default"
              value={assetcode}
            />
            <TextInput
              style={styles.input}
              placeholder="Seial No."
              keyboardType="default"
              value={assetcode}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Category"
              keyboardType="default"
              value={assetcode}
            />
            <TextInput
              style={styles.input}
              placeholder="Sub Category"
              keyboardType="default"
              value={assetcode}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Manufacturer"
              keyboardType="default"
              value={assetcode}
            />
            <TextInput
              style={styles.input}
              placeholder="Brand"
              keyboardType="default"
              value={assetcode}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Tangible"
              keyboardType="default"
              value={assetcode}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={assetcode}
            />
          </View>
        </View>
        <View
          style={{ display: 'flex', flexDirection: 'row', alignContent: 'end' }}
        >
          <Pressable style={styles.buttonPressArea}></Pressable>
          <Pressable
            style={styles.buttonPressArea}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View style={styles.searchContainer}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between'
  },
  disclaimationText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center'
  },
  disclaimationBox: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    margin: 20
  },
  searchContainer: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#009933',
    borderRadius: 10,
    elevation: 5,
    height: 50,
    justifyContent: 'center'
  },
  buttonPressArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 20
  },
  buttonText: { color: 'white', fontSize: 17 },
  input: {
    height: 40,
    marginHorizontal: 5,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    flex: 2,
    borderRadius: 10,
    fontSize: 17
  },
  assetinfocontainer: {
    paddingBottom: 0,
    paddingHorizontal: 0
  },
  boldText: {
    fontWeight: 'bold'
  },
  stretch: {
    width: 250,
    height: 250,
    resizeMode: 'contain'
  },
  imagebox: {
    alignSelf: 'center'
  },
  assetdescbox: {
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  assetdesctext: {
    fontSize: 17,
    backgroundColor: '#d0f595',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    elevation: 1
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})
export default AddAssetScreen1
