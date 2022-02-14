import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {Text, DashboardHeader} from '../../components';
import styles from './VendorDashboardStyles';
import {Images, AppStyles} from '../../theme';

export default function VendorDashboardView(props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <DashboardHeader />
    </ScrollView>
  );
}
