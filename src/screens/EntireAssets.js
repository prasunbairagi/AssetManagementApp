import React, { useState, useEffect } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { FontAwesome } from '@expo/vector-icons'
import AssetsList from '../components/AssetsList'
import { Ionicons } from '@expo/vector-icons'

const EntireAssets = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [asset, setAsset] = useState([])
  const [refreshing, setRefreshing] = React.useState(false)

  const [openOutlet, setOpenOutlet] = useState(false)
  const [outletValue, setOutletValue] = useState(null)
  const [outlet, setOutlet] = useState([{ Outlet_Name: 'All', Outlet_ID: -1 }])
  const [filteredoutletvalue, setFilteredoutletvalue] = useState(-1)

  const [openCategory, setOpenCategory] = useState(false)
  const [categoryValue, setCategoryValue] = useState(null)
  const [category, setCategory] = useState([
    { Category_Name: 'All', Category_ID: -1 }
  ])
  const [filteredcategoryvalue, setFilteredcategoryvalue] = useState(-1)
  console.log(filteredcategoryvalue,filteredoutletvalue)
  const fetchAssetData = async () => {
    try {
      setAsset(null)
      setLoading(true)
      const res = await fetch(
        `http://192.168.1.7:1443/api/CategoryAndAsset/GetCategoriesByIDs?OutletID=${filteredoutletvalue}&CategoryID=${filteredcategoryvalue}`
      )
      if (!res.ok) {
        throw new Error('Could not fetch Asset')
      }
      const data = await res.json()
      setAsset(data)
      setError(null)
      setRefreshing(false)
      console.log('asset',filteredoutletvalue,filteredcategoryvalue)
    } catch (e) {
      setAsset(null)
      setError('Could not fetch Asset')
    } finally {
      setLoading(false)
    }
  }
  const fetchOutlets = async () => {
    try {
      // setOutlet(null)
      setLoading(true)
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetOutlet/GetAllOutlets`
      )
      if (!res.ok) {
        throw new Error('Could not fetch Outlets')
      }
      const data = await res.json()
      setOutlet(data)
      setError(null)
      setRefreshing(false)
    } catch (e) {
      // setOutlet(null)
      setError('Could not fetch Outlets')
    } finally {
      setLoading(false)
    }
  }
  const fetchCategories = async () => {
    try {
      // setCategory(null)
      setLoading(true)
      const res = await fetch(
        `http://192.168.1.7:1443/api/AssetCategory/GetAllCategories`
      )
      if (!res.ok) {
        throw new Error('Could not fetch Categories')
      }
      const data = await res.json()
      setCategory(data)
      setError(null)
      setRefreshing(false)
    } catch (e) {
      // setCategory(null)
      setError('Could not fetch Categories')
    } finally {
      setLoading(false)
    }
  }

  

  const DATA = asset
  useEffect(() => {
    
    ;(async () => {      
      await fetchOutlets()     
      await fetchCategories()
      
    })()
  }, [])
  useEffect(() => {
    
    ;(async () => {      
      
      await fetchAssetData()
      
    })()
  }, [filteredcategoryvalue, filteredoutletvalue])
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    setLoading(true)
    await fetchAssetData()
  }, [filteredcategoryvalue, filteredoutletvalue])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dropdownContainer}>
        {/* Outlet Dropdown */}
        <View style={[styles.dropdown, { marginRight: 10 }]}>
          <DropDownPicker
            key="outletPicker"
            open={openOutlet}
            value={outletValue}
            items={outlet}
            setOpen={setOpenOutlet}
            setValue={setOutletValue}
            setItems={setOutlet}
            placeholder="Filter by Outlet"
            TickIconComponent={() => (
              <FontAwesome
                name="circle"
                style={{ marginRight: 5 }}
                color="#009933"
              />
            )}
            tickIconStyle={{
              width: 15,
              height: 15
            }}
            onSelectItem={async(item) => {
              setFilteredoutletvalue(item.Outlet_ID)
            }}
            schema={{
              label: 'Outlet_Name',
              value: 'Outlet_ID'
            }}
          />
        </View>
        {/* Category Dropdown */}
        <View style={styles.dropdown}>
          <DropDownPicker
            key="categoryPicker"
            open={openCategory}
            value={categoryValue}
            items={category}
            setOpen={setOpenCategory}
            setValue={setCategoryValue}
            setItems={setCategory}
            placeholder="Filter by Category"
            TickIconComponent={() => (
              <FontAwesome
                name="circle"
                style={{ marginRight: 5 }}
                color="#009933"
              />
            )}
            ArrowDownIconComponent={() => (
              <Ionicons name="filter-sharp" size={20} color="black" />
            )}
            tickIconStyle={{
              width: 15,
              height: 15
            }}
            onSelectItem={async(item) => {
              setFilteredcategoryvalue(item.Category_ID)
            }}
            schema={{
              label: 'Category_Name',
              value: 'Category_ID'
            }}
          />
        </View>
      </View>

      {loading == true && (
        <ActivityIndicator size={'large'} color={'#009933'} />
      )}
      {error != null && (
        <View style={styles.disclaimationBox}>
          <Text style={styles.disclaimationText}>
            Oops! Failed to load Data. Please Refresh it
          </Text>
        </View>
      )}
      {asset != null && error == null && (
        <FlatList
          data={DATA}
          renderItem={({ item }) => <AssetsList data={item} />}
          keyExtractor={(item) => item.Asset_Code}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent'
  },
  disclaimationText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center'
  },
  disclaimationBox: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 10
  },
  dropdown: {
    flex: 1
  }
})

export default EntireAssets
