import React from 'react';
import _ from 'lodash';
import MapViewDirections from 'react-native-maps-directions';
import {View, TouchableOpacity, Image as RnImage, Platform} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import styles from './MapsStyles';
import {Metrics, AppStyles, Fonts, Images, Colors} from '../../theme';
import {LATITUDE_DELTA, PLACES_API_KEY, strings} from '../../constants';
import Text from '../Text';
import {MapPointer} from '..';
import util from '../../util';

class MapsView extends React.Component {
  handleMapReady = () => {
    return () =>
      this.mapRef.fitToCoordinates(directionData, {
        edgePadding: {top: 0, right: 0, bottom: 200, left: 10},
        animated: false,
      });
  };

  render() {
    const {
      mapHeight,
      mapStyle,
      coordinates,
      circularMap,
      customer,
      vendor,
      rider,
      isRiderOnline,
      directionData,
      initialRegion,
      driverData,
      allVehicles,
      fixedZoneRegions,
      fromZoneOptions,
      selectRegion,
      showRegions,
      user,
      setPolygon,
    } = this.props;
    let zoomLevel = 25;
    console.log({initialRegion});
    let platFormViewOfPolygon = util.isPlatformAndroid() ? 0.000001 : 1;

    function center_polygon(coordinates) {
      let x = coordinates.map((c) => c.latitude);
      let y = coordinates.map((c) => c.longitude);

      let minX = Math.min.apply(null, x);
      let maxX = Math.max.apply(null, x);

      let minY = Math.min.apply(null, y);
      let maxY = Math.max.apply(null, y);

      return {
        latitude: (minX + maxX) / 2,
        longitude: (minY + maxY) / 2,
      };
    }

    return (
      <View style={[styles.container]}>
        <View
          style={[
            !circularMap && styles.mapContainer,
            !circularMap && {height: mapHeight},
            !circularMap && mapStyle,
          ]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={(ref) => {
              this.mapRef = ref;
            }}
            zoomEnabled={true}
            scrollEnabled={true}
            style={styles.map}
            initialRegion={{
              ...initialRegion,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta:
                LATITUDE_DELTA * (Metrics.screenWidth / Metrics.screenHeight),
            }}
            // onMapReady={Platform.OS === 'android' ? this.handleMapReady : null}
            onMapReady={() => {
              if (fromZoneOptions && showRegions) {
                // setPolygon();
              }
            }}
            onRegionChangeComplete={(region) => {
              let range =
                Math.log2(
                  360 * (Metrics.screenWidth / 256 / region.longitudeDelta),
                ) + 1;
              console.warn({range});
              if (range > 13.5) {
                console.log('1');
                zoomLevel = 30;
              }

              if (range > 12.5 && range < 13.5) {
                console.log('2');

                zoomLevel = 22;
              }

              if (range < 12) {
                console.log('3');

                zoomLevel = 9;
              }
            }}
            // onLayout={() => this.handleMapReady()}
            //region props helps in navigating the region dynamically
            region={
              fromZoneOptions && showRegions
                ? {
                    ...fixedZoneRegions[0].latlng[0],
                    latitudeDelta: LATITUDE_DELTA * 0.1,
                    longitudeDelta:
                      LATITUDE_DELTA *
                      (Metrics.screenWidth / Metrics.screenHeight) *
                      platFormViewOfPolygon,
                  }
                : {
                    ...initialRegion,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta:
                      LATITUDE_DELTA *
                      (Metrics.screenWidth / Metrics.screenHeight),
                  }
            }>
            {!(
              _.isEmpty(driverData) ||
              driverData.latitude === 0 ||
              driverData.longitude === 0
            ) &&
              isRiderOnline && (
                <MapPointer
                  coordinates={driverData.coordinates}
                  image={util.findDriverVehicle(
                    allVehicles,
                    driverData.vehicle.id,
                  )}
                />
              )}

            {!_.isEmpty(rider) && (
              <MapPointer
                coordinates={driverData.coordinates}
                image={driverData.avatar}
                circularMap={circularMap}
              />
            )}

            {!_.isEmpty(vendor) && (
              <MapPointer
                coordinates={vendor.coordinates}
                image={vendor.image}
                circularMap={circularMap}
              />
            )}

            {!_.isEmpty(customer) && (
              <MapPointer
                coordinates={customer.coordinates}
                image={customer.image}
                circularMap={circularMap}
              />
            )}

            {fromZoneOptions &&
              showRegions &&
              fixedZoneRegions.map((region) => {
                return (
                  <View>
                    <Marker
                      coordinate={center_polygon(region.latlng)}
                      tracksViewChanges={false}>
                      <Text size={zoomLevel}>{region.name}</Text>
                    </Marker>

                    <Polygon
                      ref={(ref) => {
                        this.props.polygonRef(ref);
                      }}
                      tappable={true}
                      coordinates={region.latlng}
                      // strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                      fillColor={
                        region.id === user.fixed_zone_id
                          ? 'grey'
                          : 'transparent'
                      }
                      strokeWidth={2}
                      onPress={() => {
                        if (region.id !== user.fixed_zone_id) {
                          selectRegion(region);
                        }
                      }}
                    />
                  </View>
                );
              })}

            {/* directions start*/}

            {!_.isEmpty(directionData) &&
              directionData.map((item, index) => {
                console.log({item____: item});
                return (
                  <>
                    <Marker coordinate={item}>
                      <View style={styles.imgWrap}>
                        <RnImage
                          style={
                            !_.isEmpty(item.icon)
                              ? styles.iconStyle
                              : styles.noIconStyle
                          }
                          source={
                            !_.isEmpty(item.icon)
                              ? {uri: item.icon}
                              : Images.ProfilePlaceholder
                          }
                        />
                      </View>
                    </Marker>
                    <MapViewDirections
                      origin={!_.isNil(directionData) && directionData[0]}
                      destination={!_.isNil(directionData) && directionData[1]}
                      apikey={PLACES_API_KEY}
                      strokeWidth={1.8}
                      strokeColor={Colors.black}
                    />
                    {directionData.length > 2 && (
                      <MapViewDirections
                        origin={!_.isNil(directionData) && directionData[1]}
                        destination={
                          !_.isNil(directionData) && directionData[2]
                        }
                        apikey={PLACES_API_KEY}
                        strokeWidth={1.8}
                        strokeColor={Colors.black}
                      />
                    )}
                  </>
                );
              })}
            {/* directions marker end*/}
          </MapView>
        </View>
      </View>
    );
  }
}

export default MapsView;
