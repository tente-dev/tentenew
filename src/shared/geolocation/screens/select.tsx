import React, { useEffect, useState } from 'react'
import { Button, Spinner, View } from 'native-base'
import MapView, { LatLng, Marker } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import { useCurrentLocation } from 'shared/geolocation'
import { MAP_STYLE } from 'shared/styles'
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { SelectLocationRouteParams } from 'shared/navigation'

export const SelectLocation = () => {
  const { loading, location } = useCurrentLocation()
  const { latitude, longitude } = location
  const route = useRoute()
  const navigation = useNavigation<NavigationProp<any>>()
  const params = route.params as SelectLocationRouteParams
  const [marker, setMarker] = useState<LatLng | undefined>()

  const handleConfirm = () => {
    if (params?.type === 'branch') {
      navigation.navigate('StoreRegistration', {
        screen: 'BranchesInfo',
        params: { ...marker },
      })
    }
    if (params?.type === 'update') {
      navigation.navigate('CorrectInfo', {
        ...marker,
        id: params.id,
        ...params,
      })
    }
    setMarker(undefined)
  }

  useEffect(() => {
    if (params?.title) {
      navigation.setOptions({
        title: params.title,
      })
    }
  }, [params?.title, navigation])

  useEffect(() => {
    if (params?.initialCoordinates) {
      setMarker(params.initialCoordinates)
    }
  }, [params?.initialCoordinates])

  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      {loading ? (
        <Spinner />
      ) : (
        <MapView
          onPress={event => {
            setMarker(event.nativeEvent.coordinate)
          }}
          initialRegion={{
            latitude: marker?.latitude ? marker?.latitude : latitude,
            longitude: marker?.longitude ? marker?.longitude : longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.1,
          }}
          style={StyleSheet.absoluteFillObject}
          showsUserLocation
          customMapStyle={MAP_STYLE}
          followsUserLocation>
          {marker && <Marker coordinate={marker} />}
        </MapView>
      )}
      <Button
        isDisabled={!marker}
        position={'absolute'}
        bottom={6}
        width={'80%'}
        onPress={handleConfirm}>
        {'Confirmar'}
      </Button>
    </View>
  )
}
