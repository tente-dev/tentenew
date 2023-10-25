import Geolocation from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'

export const useCurrentLocation = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    Geolocation.getCurrentPosition(info => {
      setLoading(false)
      setLocation({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      })
    })
  }, [])
  return {
    location,
    loading,
  }
}
