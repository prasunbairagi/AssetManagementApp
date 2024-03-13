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
import { Picker } from '@react-native-picker/picker'
import DropDownPicker from 'react-native-dropdown-picker'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { useSelector } from 'react-redux'

const AddAssetScreen1 = ({ navigation }) => {
  const dispatch = useDispatch()
  const actions = bindActionCreators(actionCreators, dispatch)
  const assetForm = useSelector((state) => state.assetForm)

  const [assetname, setAssetname] = useState(null)
  const [assetdesc, setAssetdesc] = useState(null)
  const [assetmodelno, setAssetmodelno] = useState(null)
  const [assetserial, setAssetserial] = useState(null)
  const [assetqty, setAssetqty] = useState(null)
  // state variables for categories
  const [openCategory, setOpenCategory] = useState(false)
  const [categoryValue, setCategoryValue] = useState(null)
  const [category, setCategory] = useState([
    { Category_Name: 'All', Category_ID: -1 }
  ])
  const [filteredcategoryvalue, setFilteredcategoryvalue] = useState(-1)
  // state variables for sub categories
  const [opensubCategory, setOpensubCategory] = useState(false)
  const [subcategoryValue, setsubCategoryValue] = useState(null)
  const [subcategory, setsubCategory] = useState([
    { Subcategory_Name: 'Choose Category first', Subcategory_ID: -1 }
  ])
  const [filteredsubcategoryvalue, setFilteredsubcategoryvalue] = useState(-1)
  // state variables for manufacturers
  const [openmanufacturer, setOpenmanufacturer] = useState(false)
  const [manufacturerValue, setmanufacturerValue] = useState(null)
  const [manufacturer, setmanufacturer] = useState([
    { Manufacturer_Name: 'Choose Category first', Manufacturer_ID: -1 }
  ])
  const [filteredmanufacturervalue, setFilteredmanufacturervalue] = useState(-1)
  // state variables for brands
  const [openbrand, setOpenbrand] = useState(false)
  const [brandValue, setbrandValue] = useState(null)
  const [brand, setbrand] = useState([
    { Brand_Name: 'Choose Mf first', Brand_ID: -1 }
  ])
  const [filteredbrandvalue, setFilteredbrandvalue] = useState(-1)
  // state variables for tangible/intangible
  const [opentangible, setOpentangible] = useState(false)
  const [tangibleValue, settangibleValue] = useState(null)
  const [filteredtangiblevalue, setFilteredtangiblevalue] = useState(-1)
  // state variables for assettype
  const [openassettype, setOpenassettype] = useState(false)
  const [assettypeValue, setassettypeValue] = useState(null)
  const [filteredassettypevalue, setFilteredassettypevalue] = useState(-1)
  // Form details part 1
  const assetForm1={
    "AssetID":-1,
    "AssetName":assetname,
    "AssetCode":"",
    "AssetType":filteredassettypevalue,
    "TangibleIntangible":filteredtangiblevalue,
    "CategoryID":filteredcategoryvalue,
    "SubcategoryID":filteredsubcategoryvalue,
    "ManufacturerID":filteredmanufacturervalue,
    "BrandID":filteredbrandvalue,
    "Description":assetdesc,
    "Quantity":assetqty,
    "ModelNo":assetmodelno,
    "SerialNo":assetserial,       
  }
  // method to fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetCategory/GetAllCategories`
      )
      if (!res.ok) {
        setCategory({ Category_Name: 'Oops! Empty', Category_ID: -1 })
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setCategory(data)
    } catch (e) {
      // setCategory(null)
      // setError('Could not fetch Categories')
    }
  }
  // method to fetch sub-categories
  const fetchSubCategories = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetSubcategory/GetSubcategoriesByCategory?categoryID=` +
          filteredcategoryvalue
      )
      if (!res.ok) {
        setsubCategory({ Subcategory_Name: 'Oops! empty', Subcategory_ID: -1 })
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setsubCategory(data)
    } catch (e) {
      // setCategory(null)
      // setError('Could not fetch Categories')
    }
  }
  // method to fetch manufacturers
  const fetchmanufacturers = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetManufacturer/GetManufacturersBycategory?categoryID=` +
          filteredcategoryvalue
      )
      if (!res.ok) {
        setmanufacturer({
          Manufacturer_Name: 'Oops! empty',
          Manufacturer_ID: -1
        })
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setmanufacturer(data)
    } catch (e) {
      // setCategory(null)
      // setError('Could not fetch Categories')
    }
  }
  // method to fetch sub-categories
  const fetchbrands = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetBrand/GetBrandsByManufacturers?manufacturerID=` +
          filteredmanufacturervalue
      )
      if (!res.ok) {
        setbrand({ Brand_Name: 'Oops! empty', Brand_ID: -1 })
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setbrand(data)
    } catch (e) {
      // setCategory(null)
      // setError('Could not fetch Categories')
    }
  }
  useEffect(() => {
    ;(async () => {
      // await fetchOutlets()
      await fetchCategories()
    })()
  }, [])
  // sub categories and manufacturers fetch after category is chosen
  useEffect(() => {
    ;(async () => {
      await fetchSubCategories()
      await fetchmanufacturers()
    })()
  }, [filteredcategoryvalue])
  // brands fetch after manufacturer is chosen
  useEffect(() => {
    ;(async () => {
      await fetchbrands()
    })()
  }, [filteredmanufacturervalue])
  useEffect(() => {
    if (assettypeValue == 'Individual') {
      setAssetqty(1)
    } else {
      setAssetqty(null)
    }
  }, [filteredassettypevalue])
  return (
    <>
      <View style={styles.mainContainer}>
        <View>
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>
              Part 1 : Asset Information
            </Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Asset Name"
              keyboardType="default"
              onChangeText={(text) => setAssetname(text)}
              value={assetname}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Description"
              keyboardType="default"
              onChangeText={(text) => setAssetdesc(text)}
              value={assetdesc}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Model Number"
              keyboardType="default"
              onChangeText={(text) => setAssetmodelno(text)}
              value={assetmodelno}
            />
            <TextInput
              style={styles.input}
              placeholder="Serial No."
              keyboardType="default"
              onChangeText={(text) => setAssetserial(text)}
              value={assetserial}
            />
          </View>

          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown, { paddingRight: 5 }]}>
              <DropDownPicker
                key="categoryPicker"
                open={openCategory}
                value={categoryValue}
                items={category}
                setOpen={(value) => {
                  setOpenCategory(value)
                  setOpenmanufacturer(false)
                  setOpenbrand(false)
                  setOpensubCategory(false)
                  setOpentangible(false)
                  setOpenassettype(false)
                }}
                setValue={setCategoryValue}
                setItems={setCategory}
                placeholder="Category"
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
                  setFilteredcategoryvalue(item.Category_ID)
                }}
                schema={{
                  label: 'Category_Name',
                  value: 'Category_ID'
                }}
              />
            </View>
            <View style={[styles.dropdown, { paddingLeft: 5 }]}>
              <DropDownPicker
                key="sub-categoryPicker"
                open={opensubCategory}
                value={subcategoryValue}
                items={subcategory}
                setOpen={(value) => {
                  setOpensubCategory(value)
                  setOpenCategory(false)
                  setOpenmanufacturer(false)
                  setOpenbrand(false)
                  setOpentangible(false)
                  setOpenassettype(false)
                }}
                setValue={setsubCategoryValue}
                setItems={setsubCategory}
                placeholder="Sub Category"
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
                  setFilteredsubcategoryvalue(item.Subcategory_ID)
                  console.log(filteredsubcategoryvalue)
                }}
                schema={{
                  label: 'Subcategory_Name',
                  value: 'Subcategory_ID'
                }}
              />
            </View>
          </View>
          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown, { paddingRight: 5 }]}>
              <DropDownPicker
                key="manufacturerPicker"
                open={openmanufacturer}
                value={manufacturerValue}
                items={manufacturer}
                setOpen={(value) => {
                  setOpenmanufacturer(value)
                  setOpensubCategory(false)
                  setOpenCategory(false)
                  setOpenbrand(false)
                  setOpentangible(false)
                  setOpenassettype(false)
                }}
                setValue={setmanufacturerValue}
                setItems={setmanufacturer}
                placeholder="Manufacturer"
                containerStyle={{ zIndex: 9 }}
                style={{ zIndex: 9 }}
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
                  setFilteredmanufacturervalue(item.Manufacturer_ID)
                }}
                schema={{
                  label: 'Manufacturer_Name',
                  value: 'Manufacturer_ID'
                }}
              />
            </View>
            <View style={[styles.dropdown, { paddingLeft: 5 }]}>
              <DropDownPicker
                key="brandPicker"
                open={openbrand}
                value={brandValue}
                items={brand}
                setOpen={(value) => {
                  setOpenbrand(value)
                  setOpenmanufacturer(false)
                  setOpensubCategory(false)
                  setOpenCategory(false)
                  setOpentangible(false)
                  setOpenassettype(false)
                }}
                setValue={setbrandValue}
                setItems={setbrand}
                placeholder="Brand"
                containerStyle={{ zIndex: 9 }}
                style={{ zIndex: 9 }}
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
                  setFilteredbrandvalue(item.Brand_ID)
                }}
                schema={{
                  label: 'Brand_Name',
                  value: 'Brand_ID'
                }}
              />
            </View>
          </View>
          <View style={styles.dropdownContainer}>
            <View style={[styles.dropdown, { paddingRight: 5 }]}>
              <DropDownPicker
                key="tangiblePicker"
                open={opentangible}
                value={tangibleValue}
                items={[
                  { label: 'Tangible', value: 'Tangible' },
                  { label: 'Intangible', value: 'Intangible' }
                ]}
                setOpen={(value) => {
                  setOpentangible(value)
                  setOpensubCategory(false)
                  setOpenCategory(false)
                  setOpenmanufacturer(false)
                  setOpenbrand(false)
                  setOpenassettype(false)
                }}
                setValue={settangibleValue}
                setItems={settangibleValue}
                placeholder="Tangible"
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
                  setFilteredtangiblevalue(item.value)
                }}
              />
            </View>
            <View style={[styles.dropdown, { paddingLeft: 5 }]}>
              <DropDownPicker
                key="assettypePicker"
                open={openassettype}
                value={assettypeValue}
                items={[
                  { label: 'Individual', value: 'Individual' },
                  { label: 'Bulk', value: 'Bulk' }
                ]}
                setOpen={(value) => {
                  setOpenassettype(value)
                  setOpentangible(false)
                  setOpensubCategory(false)
                  setOpenCategory(false)
                  setOpenmanufacturer(false)
                  setOpenbrand(false)
                }}
                setValue={setassettypeValue}
                setItems={setassettypeValue}
                placeholder="Asset Type"
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
                  setFilteredassettypevalue(item.value)
                }}
              />
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              editable={filteredassettypevalue == 'Individual' ? false : true}
              value={assetqty ? assetqty.toString() : ''} // Convert to string
              onChangeText={(text) => {
                  // Parse input to integer if not empty
                  const parsedValue = text ? parseInt(text) : null;
                  // Update assetqty state
                  setAssetqty(parsedValue);
                  // Update object's property 'Quantity' as integer
                  assetForm1.Quantity = parsedValue;
              }}
            />
          </View>
        </View>
        <View
          style={{ display: 'flex', flexDirection: 'row', alignContent: 'end' }}
        >
          <Pressable style={styles.buttonPressArea}></Pressable>
          <Pressable
            style={styles.buttonPressArea}
            onPress={async() => {
              await actions.addAssetForm(assetForm1)
              console.log(assetForm)
              navigation.navigate('AddAsset2')
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
  },
  dropdown: {
    flex: 1
  }
})
export default AddAssetScreen1
