import React,{useState,useEffect} from 'react'
import {
  RefreshControl,
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  View,
  Text,
  ActivityIndicator  
} from 'react-native'
import AssetsList from '../components/AssetsList'

const EntireAssets = () => {
  // const [loading, error, asset] = useAssetData()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [asset, setAsset] = useState([])
  const [refreshing, setRefreshing] = React.useState(false);
  const fetchAssetData = async () => {
    try {
      setAsset(null)
      setLoading(true)
      const res = await fetch(
        `http://192.168.1.4:1443/api/asset/getAllAssetMaster`
      )
      if(!res.ok){
        throw new Error('Could not fetch Weather')
      }
      const data = await res.json()
      setAsset(data)
      setError(null)
      setRefreshing(false)
    } catch (e) {
      setAsset(null)
      setError('Could not fetch Weather')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    (async () => {      
      await fetchAssetData()
    })()
  },[])
  const DATA = asset
  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    setLoading(true)
    await fetchAssetData();
  }, []);
  return (
    <SafeAreaView style={styles.container} >
      {loading == true && (
          <ActivityIndicator size={'large'} color={'#009933'} />
      )}
      {error !=null && (
         <View style={styles.disclaimationBox}>
         <Text style={styles.disclaimationText}>Oops ! Failed to load Data. Please Refresh it</Text>
       </View>
      )}
      {asset!=null && error==null && (<FlatList
        data={DATA}
        renderItem={({ item }) => <AssetsList data={item} />}
        keyExtractor={(item) => item.Asset_Code}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />)}
   
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 10,
    marginTop: 10,
    marginBottom:10
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent'
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 20,
    backgroundColor: 'black', // Set your desired button background color
    borderRadius: 60,
    padding: 10,
    elevation: 5 // Add elevation for a shadow effect (Android)
  },
  scrollView: {
    flex: 1,
   
  },
  disclaimationText:{fontSize:16,fontWeight:'bold',alignItems: 'center',textAlign:'center'},
  disclaimationBox: { display: 'flex', alignItems: 'center' ,alignContent:'center',paddingTop:10}
})
export default EntireAssets
