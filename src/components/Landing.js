import React,{useState,useEffect} from 'react'
import { StyleSheet } from 'react-native'
import ContentLanding from './ContentLanding'
import LoginLanding from './LoginLanding'
import { useSelector } from 'react-redux'
const Landing = ()=> {
  const loggedinstate=useSelector((state)=>state.loginState)
  const [loggedin, setLoggedin] = useState(loggedinstate?loggedinstate:false)
  console.log("Logging in...");
  useEffect(()=>{setLoggedin(loggedinstate)},[loggedinstate])
  return (
    <>
    {!loggedin && <LoginLanding/>}    
    {loggedin && <ContentLanding/>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  boldText: {
    fontWeight: 'bold'
  }
})

export default Landing
