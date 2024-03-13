import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import DropDownPicker from 'react-native-dropdown-picker'
import { Feather } from '@expo/vector-icons'

const AddAssetScreen2 = ({ navigation }) => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const assetForm = useSelector((state) => state.assetForm)
  // state variables for location
  const [currentLocation, setcurrentLocation] = useState(null)
  // state variables for status/instatus
  const [openstatus, setOpenstatus] = useState(false)
  const [statusValue, setstatusValue] = useState(null)
  const [filteredstatusvalue, setFilteredstatusvalue] = useState(-1)
  // state variables for condition
  const [opencondition, setOpencondition] = useState(false)
  const [conditionValue, setconditionValue] = useState(null)
  const [filteredconditionvalue, setFilteredconditionvalue] = useState(-1)
  // state variables for purchaseDate, warrantyDate, expiryDate
  const [purchaseDate, setPurchaseDate] = useState(null)
  const [warrantyDate, setWarrantyDate] = useState(null)
  const [expiryDate, setExpiryDate] = useState(null)
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [whichPicker, setWhichPicker] = useState('')
  // Form details part 2
  const assetForm2 = {
    Condition:filteredconditionvalue,
    PurchaseDate:purchaseDate,
    WarrantyDate:warrantyDate,
    ExpiryDate:expiryDate?expiryDate:null,
    CurrentLocation:currentLocation,
    Status:filteredstatusvalue,
  }

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
          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown, { paddingRight: 5 }]}>
              <DropDownPicker
                key="statusPicker"
                open={openstatus}
                value={statusValue}
                items={[
                  { label: 'In use', value: 'In use' },
                  { label: 'In storage', value: 'In storage' },
                  { label: 'Loaned out', value: 'Loaned out' },
                  { label: 'Out for repair', value: 'Out for repair' }
                ]}
                setOpen={(value) => {
                  setOpenstatus(value)
                  setOpencondition(false)
                }}
                setValue={setstatusValue}
                setItems={setstatusValue}
                placeholder="Status"
                containerStyle={{ zIndex: 8 }}
                style={{ zIndex: 8 }}
                TickIconComponent={() => (
                  <FontAwesome
                    name="circle"
                    style={{ marginRight: 5 }}
                    color="#009933"
                  />
                )}
                ArrowDownIconComponent={() => (
                  <Feather name="chevron-down" size={22} color="black" />
                )}
                tickIconStyle={{
                  width: 15,
                  height: 15
                }}
                onSelectItem={async (item) => {
                  setFilteredstatusvalue(item.value)
                }}
              />
            </View>
            <View style={[styles.dropdown, { paddingLeft: 5 }]}>
              <DropDownPicker
                key="conditionPicker"
                open={opencondition}
                value={conditionValue}
                items={[
                  { label: 'New', value: 'New' },
                  { label: 'Good', value: 'Good' },
                  { label: 'Fair', value: 'Fair' },
                  { label: 'Poor', value: 'Poor' }
                ]}
                setOpen={(value) => {
                  setOpencondition(value)
                  setOpenstatus(false)
                }}
                setValue={setconditionValue}
                setItems={setconditionValue}
                placeholder="Condition"
                containerStyle={{ zIndex: 8 }}
                style={{ zIndex: 8 }}
                TickIconComponent={() => (
                  <FontAwesome
                    name="circle"
                    style={{ marginRight: 5 }}
                    color="#009933"
                  />
                )}
                ArrowDownIconComponent={() => (
                  <Feather name="chevron-down" size={22} color="black" />
                )}
                tickIconStyle={{
                  width: 15,
                  height: 15
                }}
                onSelectItem={async (item) => {
                  setFilteredconditionvalue(item.value)
                }}
              />
            </View>
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
              placeholder="Current Location"
              keyboardType="default"
              onChangeText={(text) => setcurrentLocation(text)}
              value={currentLocation}
            />
          </View>
        </View>
        <View
          style={{ display: 'flex', flexDirection: 'row', alignContent: 'end' }}
        >
          <Pressable
            style={styles.buttonPressArea}
            onPress={() => navigation.navigate('AddAsset1')}
          >
            <View style={styles.searchContainer}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.buttonPressArea}
            onPress={async () => {
              await actions.addAssetForm(assetForm2)
              // console.log(assetForm)
              navigation.navigate('AddAsset3')
            }}
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
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingTop: 10
  },
  dropdown: {
    flex: 1
  },
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
    flex: 1,
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
