import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Text, Image} from '..';
import styles from './BottomSheetStyles';
import {Colors, Fonts, AppStyles, Images, Metrics} from '../../theme';
import Button from '../Button';
import {strings} from '../../constants';

export default function BottomSheetView(props) {
  const {selectedOption} = props;
  return (
    <RBSheet
      animationType="fade"
      ref={(ref) => props.bottomSheetRef(ref)}
      closeOnDragDown={true}
      height={160}
      duration={250}
      onClose={() => props.toggleBottomSheet('closeSheet')}
      customStyles={{
        container: styles.container,
      }}>
      <View style={styles.iconsWrap}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => selectedOption('googleMap')}>
          <RnImage source={Images.GoogleMapsIcon} style={styles.iconSize} />
          <Text style={styles.iconText} type="semiBold">
            {strings.GOOGLE_MAP}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => selectedOption('wazeMap')}>
          <RnImage source={Images.WazeIcon} style={styles.iconSize} />
          <Text style={styles.iconText} type="semiBold">
            {strings.WAZE_MAP}
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
}
