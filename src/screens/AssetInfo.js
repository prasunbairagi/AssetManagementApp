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
import { FontAwesome} from '@expo/vector-icons'
import { useSelector } from 'react-redux'

const AssetInfo = () => {
  const qrcode=useSelector((state)=>state.qrcode)
  // console.log(qrcode)

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
        `http://192.168.1.7:1443/api/AssetViewer/getAssetData?AssetCode=${code}`
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
                src={asset.Image_URL}
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
                    {asset.AssetName}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Code:</Text>{' '}
                    {asset.AssetCode}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Type:</Text>{' '}
                    {asset.AssetType}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Description:</Text>{' '}
                    {asset.Description}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Tangible:</Text>{' '}
                    {asset.TangibleIntangible}
                  </Text>
                </View>
                <View>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Category:</Text>{' '}
                    {asset.CategoryName}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Sub Category:</Text>{' '}
                    {asset.SubcategoryName}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Manufacturer Name:</Text>{' '}
                    {asset.ManufacturerName}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Brand Name:</Text>{' '}
                    {asset.BrandName}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Quantity:</Text>{' '}
                    {asset.TotalQuantity}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Model No.:</Text>{' '}
                    {asset.ModelNo}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Serial No.:</Text>{' '}
                    {asset.SerialNo}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Condition:</Text>{' '}
                    {asset.Condition}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Purchase Date:</Text>{' '}
                    {asset.PurchaseDate}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Waranty Date:</Text>{' '}
                    {asset.WarrantyDate}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Expiry Date:</Text>{' '}
                    {asset.ExpiryDate}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Current Location:</Text>{' '}
                    {asset.CurrentLocation}
                  </Text>
                  <Text style={styles.assetdesctext}>
                    <Text style={styles.boldText}>Status:</Text>{' '}
                    {asset.Status}
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
