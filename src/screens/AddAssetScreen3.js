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

const AddAssetScreen3 = ({ navigation }) => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const assetForm = useSelector((state) => state.assetForm)
  // state variables for vendors
  const [openvendor, setOpenvendor] = useState(false)
  const [vendorValue, setvendorValue] = useState(null)
  const [vendor, setvendor] = useState([{ Vendor_Name: 'All', Vendor_ID: -1 }])
  const [filteredvendorvalue, setFilteredvendorvalue] = useState(-1)
  // state variables for TaxPercentage/inTaxPercentage
  const [openTaxPercentage, setOpenTaxPercentage] = useState(false)
  const [TaxPercentageValue, setTaxPercentageValue] = useState(null)
  const [filteredTaxPercentagevalue, setFilteredTaxPercentagevalue] = useState(-1)
  // state variables for DepreciationMethod
  const [openDepreciationMethod, setOpenDepreciationMethod] = useState(false)
  const [DepreciationMethodValue, setDepreciationMethodValue] = useState(null)
  const [filteredDepreciationMethodvalue, setFilteredDepreciationMethodvalue] = useState(-1)
  // state variables for ReceivedDate, InServiceDate
  const [ReceivedDateDate, setReceivedDateDate] = useState(null)
  const [InServiceDateDate, setInServiceDateDate] = useState(null)
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [whichPicker, setWhichPicker] = useState('')
  
  const [assetAccountCode, setAssetAccountCode] = useState(null)
  const [assetPONumber, setAssetPONumber] = useState(null)
  const [assetRecoveryPeriod, setAssetRecoveryPeriod] = useState(null)
  const [assetPurchasePrice, setAssetPurchasePrice] = useState(null)
  const [assetMarketValue, setAssetMarketValue] = useState(null)
  const [assetScrapValue, setAssetScrapValue] = useState(null)
  const [assetNetValue, setAssetNetValue] = useState(null)
  // Form details part 3
  const assetForm3 = {
    assetFinance: {
      VendorID: filteredvendorvalue,
      ReceivedDate: ReceivedDateDate,
      InServiceDate: InServiceDateDate,
      AccountCode: assetAccountCode,
      PONumber: assetPONumber,
      RecoveryPeriod:assetRecoveryPeriod,
      PurchasePrice:assetPurchasePrice,
      MarketValue:assetMarketValue,
      ScrapValue:assetScrapValue,
      NetValue:assetNetValue,
      TaxPercentage:filteredTaxPercentagevalue,
      DepreciationMethod:filteredDepreciationMethodvalue
    }
  }
  // method to fetch vendors
  const fetchVendors = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetVendor/GetAllVendors`
      )
      if (!res.ok) {
        setvendor({ Vendor_Name: 'Oops! Empty', Vendor_ID: -1 })
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setvendor(data)
    } catch (e) {
      console.log(e)
    }
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
        if (whichPicker == 'ReceivedDateDate') {
          setReceivedDateDate(currentDate.toISOString().split('T')[0])
        } else if (whichPicker == 'InServiceDateDate') {
          setInServiceDateDate(currentDate.toISOString().split('T')[0])
        } else {
          setExpiryDate(currentDate.toISOString().split('T')[0])
        }
      }
    } else {
      toggleDatePicker('')
      // setShowPicker(false)
    }
  }
  useEffect(() => {
    fetchVendors();  
  }, [])
  
  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>Part 3 : Finance</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown]}>
              <DropDownPicker
                key="vendor Picker"
                open={openvendor}
                value={vendorValue}
                items={vendor}
                setOpen={(value) => {
                  setOpenvendor(value)
                }}
                setValue={setvendorValue}
                setItems={setvendor}
                placeholder="Vendor"
                containerStyle={{ zIndex: 10 }}
                style={{ zIndex: 10 }}
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
                  setFilteredvendorvalue(item.Vendor_ID)
                }}
                schema={{
                  label: 'Vendor_Name',
                  value: 'Vendor_ID'
                }}
              />
            </View>
          </View>          
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable
              style={{ height: 50, flex: 1 }}
              onPress={() => {
                toggleDatePicker('ReceivedDateDate')
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Received Date"
                keyboardType="default"
                value={ReceivedDateDate}
                onChangeText={setReceivedDateDate}
                editable={false}
              />
            </Pressable>

            <Pressable
              style={{ height: 50, flex: 1 }}
              onPress={() => {
                toggleDatePicker('InServiceDateDate')
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="InService Date"
                keyboardType="default"
                value={InServiceDateDate}
                onChangeText={setInServiceDateDate}
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
          {/* Account Code and PO Number */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Account Code"
              keyboardType="numeric"
              value={assetAccountCode ? assetAccountCode.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetAccountCode(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.AccountCode = parsedValue;
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="PO Number"
              keyboardType="numeric"
              // onChangeText={(text) => setAssetPONumber(text)}
              // value={assetPONumber}
              value={assetPONumber ? assetPONumber.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetPONumber(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.PONumber = parsedValue;
              }}
            />
          </View>
          {/* Recovery period and Purchase Price */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Recovery Period"
              keyboardType="numeric"
              // onChangeText={(text) => setAssetRecoveryPeriod(text)}
              // value={assetRecoveryPeriod}
              value={assetRecoveryPeriod ? assetRecoveryPeriod.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetRecoveryPeriod(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.RecoveryPeriod = parsedValue;
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Purchase Price"
              keyboardType="numeric"
              // onChangeText={(text) => setAssetPurchasePrice(text)}
              // value={assetPurchasePrice}
              value={assetPurchasePrice ? assetPurchasePrice.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetPurchasePrice(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.PurchasePrice = parsedValue;
              }}
            />
          </View>
          {/* Market value and Scrap Value */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Market Value"
              keyboardType="numeric"
              // onChangeText={(text) => setAssetMarketValue(text)}
              // value={assetMarketValue}
              value={assetMarketValue ? assetMarketValue.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetMarketValue(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.MarketValue = parsedValue;
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Scrap Value"
              keyboardType="numeric"
              // onChangeText={(text) => setAssetScrapValue(text)}
              // value={assetScrapValue}
              value={assetScrapValue ? assetScrapValue.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetScrapValue(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.ScrapValue = parsedValue;
              }}
            />
          </View>
          {/* NetValue */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Net Value"
              keyboardType="numeric"
              // onChangeText={(text) => setAssetNetValue(text)}
              // value={assetNetValue}
              value={assetNetValue ? assetNetValue.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetNetValue(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm3.assetFinance.ScrapValue = parsedValue;
              }}
            />           
          </View>
          {/* Depreciation and tax */}
          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown, { paddingRight: 5 }]}>
              <DropDownPicker
                key="TaxPercentage Picker"
                open={openTaxPercentage}
                value={TaxPercentageValue}
                items={[
                  { label: '0', value: 0 },
                  { label: '5', value: 5 },
                  { label: '12', value: 12 },
                  { label: '18', value: 18 },
                  { label: '28', value: 28 }
                ]}
                setOpen={(value) => {
                  setOpenTaxPercentage(value)
                  setOpenDepreciationMethod(false)
                }}
                setValue={setTaxPercentageValue}
                setItems={setTaxPercentageValue}
                placeholder="Tax Percentage"
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
                  setFilteredTaxPercentagevalue(item.value)
                }}
              />
            </View>
            <View style={[styles.dropdown, { paddingLeft: 5 }]}>
              <DropDownPicker
                key="DepreciationMethod Picker"
                open={openDepreciationMethod}
                value={DepreciationMethodValue}
                items={[
                  { label: 'StraightLine', value: 'StraightLine' },
                  { label: '150% Declining Balance', value: '150% Declining Balance' },
                  { label: '200% Declining Balance', value: '200% Declining Balance' },
                  { label: '20% Reducing Balance', value: '20% Reducing Balance' },
                  { label: '30% Reducing Balance', value: '30% Reducing Balance' },
                  { label: '40% Reducing Balance', value: '40% Reducing Balance' },
                  { label: 'sum of years', value: 'sum of years' },
                ]}
                setOpen={(value) => {
                  setOpenDepreciationMethod(value)
                  setOpenTaxPercentage(false)
                }}
                setValue={setDepreciationMethodValue}
                setItems={setDepreciationMethodValue}
                placeholder="Depreciation Method"
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
                  setFilteredDepreciationMethodvalue(item.value)
                }}
              />
            </View>
          </View>    
        </View>
       
        <View
          style={{ display: 'flex', flexDirection: 'row', alignContent: 'end' }}
        >
          <Pressable
            style={styles.buttonPressArea}
            onPress={() => navigation.navigate('AddAsset2')}
          >
            <View style={styles.searchContainer}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.buttonPressArea}
            onPress={async () => {
              await actions.addAssetForm(assetForm3)
              console.log(assetForm)
              navigation.navigate('AddAsset4')
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
export default AddAssetScreen3
