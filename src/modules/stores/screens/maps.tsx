import React, {Fragment, useCallback, useRef} from 'react';
import {Icon, Spinner, View, IconButton} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import {StatusBar, StyleSheet} from 'react-native';
import {useCurrentLocation} from 'shared/geolocation';
import {COLORS, MAP_STYLE} from 'shared/styles';
import {useFocusEffect} from '@react-navigation/native';
import {useGetStoreBranches} from '../hooks/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BranchMapInfo, BranchMapInfoRef} from '../components/branch-map-info';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigationActions} from 'shared/navigation';

export const StoresMap = () => {
  const {loading: loadingLocation, location} = useCurrentLocation();
  const {latitude, longitude} = location;
  const {stores, getStoreBranches} = useGetStoreBranches();
  const {navigateToSearch} = useNavigationActions();
  const branchMapInfoRef = useRef<BranchMapInfoRef>(null);

  useFocusEffect(
    useCallback(() => {
      getStoreBranches();
    }, [getStoreBranches]),
  );

  return (
    <View
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      paddingTop={StatusBar.currentHeight}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      {loadingLocation ? (
        <Spinner />
      ) : (
        <Fragment>
          <IconButton
            onPress={() => navigateToSearch()}
            icon={<Icon as={MaterialIcons} name="search" />}
            _icon={{
              size: 7,
            }}
            position={'absolute'}
            right={4}
            variant={'solid'}
            top={12}
            zIndex={1}
            colorScheme={'secondary'}
          />
          <MapView
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.1,
            }}
            showsMyLocationButton={false}
            style={StyleSheet.absoluteFillObject}
            showsUserLocation
            customMapStyle={MAP_STYLE}
            followsUserLocation>
            {stores.map(item => {
              const {lat: latitude, long: longitude} = item.branch;
              if (latitude === null) return;
              if (longitude === null) return;
              return (
                <Marker
                  key={`store_${item.store.id}_${item.branch.id}`}
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  onPress={() => {
                    branchMapInfoRef.current?.showInfo(item);
                  }}>
                  <View
                    p={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={'full'}
                    backgroundColor={COLORS.primary[500]}
                    width={42}
                    height={42}>
                    <Icon
                      size={7}
                      color={COLORS.primary[100]}
                      name="store"
                      as={MaterialCommunityIcons}
                    />
                  </View>
                </Marker>
              );
            })}
          </MapView>
          <BranchMapInfo ref={branchMapInfoRef} />
        </Fragment>
      )}
    </View>
  );
};
