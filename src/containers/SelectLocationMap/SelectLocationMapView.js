import React from 'react';
import _ from 'lodash';
import {
  View,
  TouchableOpacity,
  Image as RnImage,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './SelectLocationMapStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {Button, Loader, Text} from '../../components';
import {Actions} from 'react-native-router-flux';
import {strings} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';

// export default function MapsView(props) {
export default class SelectLocationMapView extends React.Component {
  render() {
    const {
      handleRegionChange,
      handleRegionChangeComplete,
      locationData,
      isStaticPinVisible,
      initialCoordinates,
      isLoading,
      handleSearchLocation,
      setMapRef,
    } = this.props;

    return (
      <View style={styles.mapWraper}>
        {isLoading && <Loader loading={isLoading} />}
        {!isLoading && (
          <>
            <View style={styles.searchWrap}>
              <View style={styles.searchWrapper}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    Actions.searchLocation({
                      handleSearchLocation: handleSearchLocation,
                    });
                  }}
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}>
                  <RnImage
                    source={Images.WasphaIcon}
                    style={[styles.icon, AppStyles.mRight15]}
                  />
                  <View style={styles.locationTextWrap}>
                    <Text
                      size={Fonts.size.xSmall}
                      type="medium"
                      numberOfLines={1}>
                      {locationData.formatted_address &&
                        locationData.formatted_address}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            {isStaticPinVisible && (
              <View style={styles.staticIcon}>
                <RnImage style={{zIndex: 9999}} source={Images.CurrentPin} />
              </View>
            )}
            <MapView
              provider={PROVIDER_GOOGLE}
              onRegionChangeComplete={(data) => {
                handleRegionChangeComplete(data);
              }}
              onRegionChange={(data) => {
                handleRegionChange(data);
              }}
              zoomEnabled={true}
              ref={(ref) => {
                this.props.mapRef(ref);
              }}
              style={styles.map}
              initialRegion={{
                ...initialCoordinates,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {!isStaticPinVisible && (
                <Marker
                  // draggable
                  coordinate={{
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                  }}
                  // onDragEnd={(e) => console.log({coordinate: e})}
                >
                  <RnImage
                    source={Images.CurrentPin}
                    style={styles.currentPin}
                  />
                </Marker>
              )}
            </MapView>
            <View style={styles.btnWrap}>
              <LinearGradient
                start={{x: 0.3, y: 2}}
                end={{x: 1, y: 0}}
                colors={Colors.gradient.primary}
                style={styles.gradBtn}>
                <Button
                  color={Colors.button.hexa}
                  background={Colors.transparent}
                  style={styles.loginBtn}
                  size={Fonts.size.normal}
                  onPress={() => {
                    Actions.pop();
                  }}
                  type="semiBold">
                  {strings.CONFIRM.toUpperCase()}
                </Button>
              </LinearGradient>
            </View>
          </>
        )}
      </View>
    );
  }
}
