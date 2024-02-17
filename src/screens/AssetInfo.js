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

const AssetInfo = () => {
  const qrcode=useSelector((state)=>state.qrcode)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [asset, setAsset] = useState(null)
  const [assetcode, setAssetcode] = useState(qrcode?qrcode:null)
  useEffect(() => {
    if(qrcode){
      fetchAssetData(assetcode)
    }
  }, [])

  const searchAsset = async () => {
    Keyboard.dismiss()
    await fetchAssetData(assetcode)
  }
  const fetchAssetData = async (code) => {
    try {
      setAsset(null)
      setLoading(true)
      const res = await fetch(
        `http://192.168.1.3:1443/api/asset/getAseetData?AssetCode=${code}`
      )
      if (!res.ok) {
        throw new Error('Could not fetch Asset Data')
      }
      const data = await res.json()
      setAsset(data)
      setError(null)
    } catch (e) {
      setError('Could not fetch Asset Data')      
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAssetcode(text)}
          placeholder="Search by Asset Code"
          keyboardType="numeric"
          value={assetcode}
        />
        <Pressable style={styles.buttonPressArea} onPress={searchAsset}>
          <View style={styles.searchContainer}>
            <Text style={styles.buttonText}>Search</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.assetinfocontainer}>
        {asset == null && error != null && loading == false && (
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>Oops ! No data available for this. Try another code</Text>
          </View>
        )}
        {asset == null && error === null && (assetcode == null||assetcode=='') && (
          <View style={styles.disclaimationBox}>
            <Text style={styles.disclaimationText}>
              Welcome User! Please search your asset by entering Asset Code above
            </Text>
          </View>
        )}
        {loading == true && (
          <ActivityIndicator size={'large'} color={'#009933'} />
        )}
        {asset != null && error == null && (
          <>
            <View style={styles.imagebox}>
              <Image
                style={styles.stretch}
                src={asset.assetManagement.Image_URL}
              />
            </View>
            <ScrollView
              style={{
                paddingTop: 10,
                marginBottom: 320
              }}
            >
              <View style={styles.assetdescbox}>
                <View>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Name:</Text>{' '}
                    {asset.assetManagement.Asset_Name}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Code:</Text>{' '}
                    {asset.assetManagement.Asset_Code}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Type:</Text>{' '}
                    {asset.assetManagement.Asset_Type}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Description:</Text>{' '}
                    {asset.assetManagement.Description}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Tangible:</Text>{' '}
                    {asset.assetManagement.Tangible_Intangible}
                  </Text>
                </View>
                <View>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Category:</Text>{' '}
                    {asset.assetManagement.Asset_Name}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Sub Category:</Text>{' '}
                    {asset.assetManagement.Subcategory_Name}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Manufacturer Name:</Text>{' '}
                    {asset.assetManagement.Manufacturer_Name}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Brand Name:</Text>{' '}
                    {asset.assetManagement.Brand_Name}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Quantity:</Text>{' '}
                    {asset.assetManagement.Quantity}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Model No.:</Text>{' '}
                    {asset.assetManagement.Model_No}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Serial No.:</Text>{' '}
                    {asset.assetManagement.Serial_No}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Condition:</Text>{' '}
                    {asset.assetManagement.Condition}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Purchase Date:</Text>{' '}
                    {asset.assetManagement.Purchase_Date}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Waranty Date:</Text>{' '}
                    {asset.assetManagement.Waranty_Date}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Expiry Date:</Text>{' '}
                    {asset.assetManagement.Expiry_Date}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Current Location:</Text>{' '}
                    {asset.assetManagement.Current_Location}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Status:</Text>{' '}
                    {asset.assetManagement.Status}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Date Added:</Text>{' '}
                    {asset.assetManagement.Date_Added}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Date Updated:</Text>{' '}
                    {asset.assetManagement.Date_Updated}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </>
        )}
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  disclaimationText:{fontSize:16,fontWeight:'bold',alignItems: 'center',textAlign:'center'},
  disclaimationBox: { display: 'flex', alignItems: 'center' ,alignContent:'center',margin:20},
  searchContainer: {
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#009933',
    borderRadius: 10,
    elevation: 5,
    height: 50,
    justifyContent: 'center',    
  },
  buttonPressArea: { flex: 1, justifyContent: 'center', marginRight: 20,marginTop:20 },
  buttonText: { color: 'white', fontSize: 17 },
  input: {
    height: 50,
    marginHorizontal: 20,
    marginTop:20,
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
export default AssetInfo
