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
import assetdata from '../../datadummy.json'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
const AddAssetScreen2 = ({ navigation }) => {
  const [purchaseDate, setPurchaseDate] = useState(null)
  const [warrantyDate, setWarrantyDate] = useState(null)
  const [expiryDate, setExpiryDate] = useState(null)
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [whichPicker, setWhichPicker] = useState('')
  const toggleDatePicker = (pickername) => {
    setShowPicker(!showPicker)
    setWhichPicker(pickername)
  }
  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      setDate(currentDate)
      if (Platform.OS === 'android') {
        toggleDatePicker()
        // setShowPicker(true)
        // yyyy-mm-dd
        if (whichPicker == 'purchaseDate') {
          setPurchaseDate(currentDate.toISOString().split('T')[0])
        } else if (whichPicker == 'warrantyDate') {
          setWarrantyDate(currentDate.toISOString().split('T')[0])
        } else {
          setExpiryDate(currentDate.toISOString().split('T')[0])
        }
      }
    } else {
      toggleDatePicker('')
      // setShowPicker(false)
    }
  }
  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>Part 2 : General</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Status"
              keyboardType="default"
              value={'pras'}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable
              style={{ height: 50, flex: 1 }}
              onPress={() => {
                toggleDatePicker('purchaseDate')
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Purchase Date"
                keyboardType="default"
                value={purchaseDate}
                onChangeText={setPurchaseDate}
                editable={false}
              />
            </Pressable>

            <Pressable
              style={{ height: 50, flex: 1 }}
              onPress={() => {
                toggleDatePicker('warrantyDate')
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Warranty Date"
                keyboardType="default"
                value={warrantyDate}
                onChangeText={setWarrantyDate}
                editable={false}
              />
            </Pressable>
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                // onChange={(event, selectedDate) => onChange(event, selectedDate, 'parameter')}
              />
            )}
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable
              style={{ height: 50, flex: 1 }}
              onPress={() => {
                toggleDatePicker('expiryDate')
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Expiry Date"
                keyboardType="default"
                value={expiryDate}
                onChangeText={setExpiryDate}
                editable={false}
              />
            </Pressable>
            <TextInput
              style={styles.input}
              placeholder="Condition"
              keyboardType="default"
              value={'pras'}
            />
          </View>
        </View>
        <View
          style={{ display: 'flex', flexDirection: 'row', alignContent: 'end' }}
        >
          <Pressable
            style={styles.buttonPressArea}
            onPress={() => navigation.navigate('Home')}
          >
            <View style={styles.searchContainer}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </Pressable>
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
export default AddAssetScreen2
