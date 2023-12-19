import React, { useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import AssetsModal from './AssetsModal'
import { FontAwesome } from '@expo/vector-icons'

const AssetsList = (props) => {
  const { data } = props
  const [modalVisible, setModalVisible] = useState(false)

  const handleClick = () => {
    setModalVisible(true)
  }
  return (
    <>     
      <TouchableOpacity style={data.Status === 'In use'
                ? [styles.greenContainer,styles.itemContainer]
                : data.Status === 'In storage'
                  ? [styles.yellowContainer,styles.itemContainer]
                  : data.Status === 'Loaned out'
                    ? [styles.redContainer,styles.itemContainer]
                    : [styles.blackContainer,styles.itemContainer]} onPress={handleClick}>
        <View style={styles.itemsPartition}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Name:</Text> {data.Asset_Name}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Code:</Text> {data.Asset_Code}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Description:</Text> {data.Description}
          </Text>
        </View>
        <View style={styles.itemsPartition}>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Type:</Text> {data.Asset_Type}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Category:</Text> {data.Asset_Name}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Sub Category:</Text> {data.Asset_Name}
          </Text>
        </View>
        <View style={styles.itemPartitionforicons}>
          <FontAwesome
            name="circle"
            size={24}
            style={
              data.Status === 'In use'
                ? styles.greenIcon
                : data.Status === 'In storage'
                  ? styles.yellowIcon
                  : data.Status === 'Loaned out'
                    ? styles.redIcon
                    : styles.blackIcon
            }
          />
          <Text style={styles.statustext}>
            <Text style={styles.boldText}>{data.Status}</Text>
          </Text>
        </View>
      </TouchableOpacity>
      {modalVisible && (
        <AssetsModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          data={data}
        />
      )}
    </>
  )
}
const styles = StyleSheet.create({
  infoText:{fontSize:16},
  greenContainer: { backgroundColor: '#d0f595' },
  yellowContainer: { backgroundColor: '#fcec90' },
  redContainer: { backgroundColor: '#fcaeb3' },
  blackContainer: { backgroundColor: '#e0dede' },
  greenIcon: { color: '#009933' },
  yellowIcon: { color: '#e3d005' },
  redIcon: { color: '#f01826' },
  blackIcon: { color: 'black' },
  statustext: {
    fontSize:13,
    textAlign: 'center'
  },
  itemPartitionforicons: {
    flex: 1,
    paddingHorizontal: 3,
    alignItems: 'center'
  },
  itemContainer: {
    //backgroundColor: '#d0f595',
    padding: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 15
  },
  boldText: {
    fontWeight: 'bold'
  },
  itemsPartition: {
    paddingHorizontal: 3,
    flex: 3,
    fontSize: 14
  },
  stretch: {
    width: 100,
    height: 150,
    resizeMode: 'contain'
  },
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.13)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  imagebox: {
    justifyContent: 'center'
  },
  assetdescbox: {
    paddingBottom: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
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
export default AssetsList
