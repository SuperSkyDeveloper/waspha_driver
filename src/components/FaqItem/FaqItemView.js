import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './FaqItemStyles';
import {Metrics, Images, Colors, Fonts, AppStyles} from '../../theme';
import util from '../../util';
export default function FaqItemView(props) {
  const {item, toggler, active} = props;
  return (
    <View>
      <TouchableOpacity
        onPress={() => toggler(item.id)}
        style={[styles.spacing, util.isRTL() && AppStyles.rowReverse]}>
        <View
          style={[
            AppStyles.flexRow,
            AppStyles.flex,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          <Text
            textAlign={util.rtlRightText()}
            style={styles.idTextStyle}
            size=   {Fonts.size.xxSmall}

            type="semiBold">
            {util.isRTL() && '.'}
            {item.id}
            {!util.isRTL() && '.'}
          </Text>
          <Text
            style={[styles.questionText]}
            size ={Fonts.size.xxSmall}

            textAlign={util.rtlRightText()}
            type="semiBold">
            {item.title}
          </Text>
        </View>
        <RnImage
          source={Images.Icon2}
          style={[
            !active && styles.iconStyle,
            styles.icon,
            util.isRTL() && AppStyles.mLeft20,
            {tintColor:Colors.text.primary}

          ]}
        />
      </TouchableOpacity>
      <View style={styles.hLine} />
      {active && (
        <>
          <View style={styles.descText}>
            <Text
              textAlign={util.rtlRightText()}
              size={Fonts.size.xxSmall}
              type="semiBold"
              color={Colors.text.penta}>
              {item.description}
            </Text>
          </View>
          <View style={styles.hLine} />
        </>
      )}
    </View>
  );
}
