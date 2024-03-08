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
import { FontAwesome } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import DropDownPicker from 'react-native-dropdown-picker'
import { Feather } from '@expo/vector-icons'

const AddAssetScreen4 = ({ navigation }) => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const assetForm = useSelector((state) => state.assetForm)
  // state variables for outlets
  const [openoutlet, setOpenoutlet] = useState(false)
  const [outletValue, setoutletValue] = useState(null)
  const [outlet, setoutlet] = useState([{ outlet_Name: 'All', outlet_ID: -1 }])
  const [filteredoutletvalue, setFilteredoutletvalue] = useState(-1)
  
  
  
  const [assetPersonInCharge, setAssetPersonInCharge] = useState(null)
  const [assetAdditionalCharges, setAssetAdditionalCharges] = useState(null)
  const [assetAdditionalChargesRemarks, setAssetAdditionalChargesRemarks] = useState(null)
  const [assetAmcCharges, setAssetAmcCharges] = useState(null)
  const [assetInstallationCharges, setAssetInstallationCharges] = useState(null)
  // Form details part 4
  const assetForm4 = {   
    assetallocation:{
      Outlet_ID: filteredoutletvalue,
      Person_In_Charge: assetPersonInCharge,
    },
    expense: {
      AdditionalCharges: assetAdditionalCharges,
      AdditionalChargesRemarks: assetAdditionalChargesRemarks,
      AmcCharges: assetAmcCharges,
      InstallationCharges: assetInstallationCharges,
    },
  }
  // method to fetch outlets
  const fetchoutlets = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.3:1443/api/Outlets/GetAllOutlets`
      )
      if (!res.ok) {
        setoutlet({ Outlet_Name: 'Oops! Empty', Outlet_ID: -1 })
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setoutlet(data)
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    fetchoutlets();  
  }, [])
  
  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>Part 4 : Asset Allocation and Expenses</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown]}>
              <DropDownPicker
                key="outletPicker"
                open={openoutlet}
                value={outletValue}
                items={outlet}
                setOpen={(value) => {
                  setOpenoutlet(value)
                }}
                setValue={setoutletValue}
                setItems={setoutlet}
                placeholder="Outlet"
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
                  setFilteredoutletvalue(item.Outlet_ID)
                }}
                schema={{
                  label: 'Outlet_Name',
                  value: 'Outlet_ID'
                }}
              />
            </View>
          </View>       
          
          {/* Recovery period and Purchase Price */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Person In Charge"
              keyboardType="default"
              onChangeText={(text) => setAssetPersonInCharge(text)}
              value={assetPersonInCharge}             
            />
            <TextInput
              style={styles.input}
              placeholder="Additional Charges"
              keyboardType="numeric"
              value={assetAdditionalCharges ? assetAdditionalCharges.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetAdditionalCharges(parsedValue);
                  assetForm4.expense.AdditionalCharges = parsedValue;
              }}
            />
          </View>
          {/* Market value and Scrap Value */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            
             <TextInput
              style={styles.input}
              placeholder="Installation Charges"
              keyboardType="numeric"
              value={assetInstallationCharges ? assetInstallationCharges.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetInstallationCharges(parsedValue);
                  assetForm4.expense.InstallationCharges = parsedValue;
              }}
            />  
            <TextInput
              style={styles.input}
              placeholder="Amc Charges"
              keyboardType="numeric"
              value={assetAmcCharges ? assetAmcCharges.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  const parsedValue = text ? parseInt(text) : null;
                  setAssetAmcCharges(parsedValue);
                  assetForm4.expense.AmcCharges = parsedValue;
              }}
            />
          </View>
          {/* InstallationCharges */}
          <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput
              style={styles.input}
              placeholder="Additional Charges Remarks"
              keyboardType="default"
              onChangeText={(text) => setAssetAdditionalChargesRemarks(text)}
              value={assetAdditionalChargesRemarks}
            />        
          </View>
          
        </View>
       
        <View
          style={{ display: 'flex', flexDirection: 'row', alignContent: 'end' }}
        >
          <Pressable
            style={styles.buttonPressArea}
            onPress={() => navigation.navigate('AddAsset3')}
          >
            <View style={styles.searchContainer}>
              <Text style={styles.buttonText}>Back</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.buttonPressArea}
            onPress={async () => {
              await actions.addAssetForm(assetForm4)
              console.log(assetForm)
              // navigation.navigate('Notifications')
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
export default AddAssetScreen4
