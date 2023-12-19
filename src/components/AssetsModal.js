import React from 'react'
import { Text, Modal, StyleSheet, Pressable, View, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons'

const AssetsModal = ({ modalVisible, setModalVisible, data }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalView} >
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View style={{ position: 'absolute', top: -20, right: -20 }}>
                <Entypo name="circle-with-cross" size={30} color="black" />
              </View>
            </Pressable>

            <View style={styles.imagebox}>
              <Image style={styles.stretch} src={data.Image_URL} />
            </View>
            <View style={styles.assetdescbox}>
              <View>
                <Text>Name: {data.Asset_Name}</Text>
                <Text>Code: {data.Asset_Code}</Text>
                <Text>Type: {data.Asset_Type}</Text>
                <Text>Description: {data.Description}</Text>
                <Text>Tangible: {data.Tangible_Intangible}</Text>
              </View>
              <View>
                <Text>Category: {data.Asset_Name}</Text>
                <Text>Sub Category: {data.Subcategory_Name}</Text>
                <Text>Manufacturer Name: {data.Manufacturer_Name}</Text>
                <Text>Brand Name: {data.Brand_Name}</Text>
                <Text>Quantity: {data.Quantity}</Text>
                <Text>Model No.: {data.Model_No}</Text>
                <Text>Serial No.: {data.Serial_No}</Text>
                <Text>Condition: {data.Condition}</Text>
                <Text>Purchase Date: {data.Purchase_Date}</Text>
                <Text>Waranty Date: {data.Waranty_Date}</Text>
                <Text>Expiry Date: {data.Expiry_Date}</Text>
                <Text>Current Location: {data.Current_Location}</Text>
                <Text>Status: {data.Status}</Text>
                <Text>Date Added: {data.Date_Added}</Text>
                <Text>Date Updated: {data.Date_Updated}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({  
  stretch: {
    width: 150,
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
    elevation: 5,
    position: 'relative'
  },
  imagebox: {
    justifyContent: 'center',
    alignSelf: 'center'
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
export default AssetsModal
