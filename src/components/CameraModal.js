import React, { useRef } from 'react'
import {
  Text,
  Modal,
  StyleSheet,
  Pressable,
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { Camera, CameraType } from 'expo-camera'

const CameraModal = ({ modalVisible, setModalVisible, setImageUri }) => {
  const cameraRef = useRef(null)
  const takePicture = async () => {
    console.log('clicked')
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync()
        setImageUri(uri)
        setModalVisible(!modalVisible)
      } catch (error) {
        console.error('Failed to take picture:', error)
      }
    }
  }
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
        <View
          style={styles.centeredView}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <View style={{ position: 'absolute', top: -20, right: -20 }}>
                <Entypo name="circle-with-cross" size={30} color="black" />
              </View>
            </Pressable>

            <Camera
              style={{ width: 300, height: 400 }}
              ref={cameraRef}
              type={Camera.Constants.Type.back}
              autoFocus={true} // Disable autofocus
            />
            <View
              style={{
                width: 300,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <TouchableOpacity
                onPress={takePicture}
                style={{
                  margin: 10,
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: 15, color: 'black' }}>
                  <Entypo name="camera" size={24} color="white" />
                </Text>
              </TouchableOpacity>
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
export default CameraModal
