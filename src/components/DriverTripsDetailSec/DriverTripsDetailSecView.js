import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {Text} from '..';
import styles from './DriverTripsDetailSecStyles';
import {strings} from '../../constants';
import {AppStyles, Fonts} from '../../theme';

export default function DriverTripsDetailSecView(props) {
  const {totalTrips, totalEarning, user} = props;
  return (
    <View style={styles.container}>
      <View style={[styles.boxWrap, styles.borderRightStyle]}>
        <Text style={styles.valueText}>{totalTrips}</Text>
        <Text style={styles.headingText}>
          {totalTrips > 1 ? strings.TRIPS : strings.TRIP}
        </Text>
      </View>
      <View style={[styles.boxWrap, styles.borderRightStyle]}>
        <Text style={styles.valueText}>33:20</Text>
        <Text style={styles.headingText}>{strings.ONLINE_HRS}</Text>
      </View>
      <View style={[styles.boxWrap]}>
        <View style={[AppStyles.flexRow, AppStyles.mRight20]}>
          <Text size={Fonts.size.xxxxSmall} style={{top: 8}}>
            {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
          </Text>
          <Text style={styles.valueText}>{totalEarning}</Text>
        </View>
        <Text style={styles.headingText}>{strings.CASH_TRIP}</Text>
      </View>
    </View>
  );
}
