import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {Marker} from 'react-native-maps';
import styles from './MapPointerStyles';
import {Images} from '../../theme';

export default function MapPointerView(props) {
  const {coordinates, image, circularMap} = props;
  return (
    <Marker
      coordinate={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }}>
      <View style={styles.currentLocationWrap}>
        <RnImage
          source={{uri: image}}
          style={circularMap ? styles.smallPin : styles.bigPin}
        />
      </View>
    </Marker>
  );
}
