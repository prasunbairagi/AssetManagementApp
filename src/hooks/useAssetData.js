import React, { useState, useEffect } from 'react'
const useAssetData = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [asset, setAsset] = useState([])
  
  const fetchAssetData = async () => {
    try {
      const res = await fetch(
        `http://192.168.1.7:1443/api/asset/getAllAssetMaster`
      )
      const data = await res.json()
      setAsset(data)
      // console.log('data is 2')
      
    } catch (e) {
      setError('Could not fetch Weather')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    (async () => {      
      await fetchAssetData()
    })()
  })

  return [loading, error, asset]
}

export default useAssetData