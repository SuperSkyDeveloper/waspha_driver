import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, DayListItemDetails} from './../../components';
import styles from './DayListStyles';
import {Fonts, Colors, Images, AppStyles, Metrics} from '../../theme';
import {ISOToFormat} from '../../helpers/generalHelper';
import {DATE_FORMAT3, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function DaysListView(props) {
  const {item, active, handleIndex, index, user} = props;
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => handleIndex(index)}
        style={[styles.optionList, util.isRTL() && AppStyles.rowReverse]}>
        <View style={styles.leftCol}>
          <View>
            <Text
              textAlign={util.rtlRightText()}
              size={Fonts.size.large}
              color={Colors.text.yeka}
              type="medium">
              {item.day}
            </Text>
            <Text
              textAlign={util.rtlRightText()}
              style={AppStyles.mTop5}
              size={Fonts.size.xxSmall}
              color={Colors.text.quaternary}
              type="medium">
              {item.date}
            </Text>
          </View>
        </View>
        <View>
          {false && (
            <View style={AppStyles.flexRow}>
              <Text
                size={Fonts.size.xLarge}
                type="extraBold"
                color={Colors.text.quaternary}>
                {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
              </Text>
              <Text
                size={Fonts.size.xLarge}
                type="extraBold"
                color={Colors.text.primary}>
                {item.earning}
              </Text>
            </View>
          )}

          <View>
            <Text
              size={Fonts.size.xSmall}
              type="extraBold"
              textAlign={util.rtlLeftText()}
              color={Colors.text.quaternary}>
              {strings.NUM_OF_TRIPS}
            </Text>
            <Text
              style={[
                {flex: 1, alignSelf: 'flex-end'},
                util.isRTL() && {alignSelf: 'flex-start'},
              ]}
              size={Fonts.size.xSmall}
              textAlign={util.rtlLeftText()}
              type="extraBold"
              color={Colors.text.primary}>
              {item.obj.length}
            </Text>
          </View>

          <View style={[AppStyles.mTop10]}>
            <RnImage
              source={Images.Icon2}
              style={[
                !active && styles.arrowImg,
                {alignSelf: 'flex-end',tintColor:Colors.text.penta},
                util.isRTL() && {alignSelf: 'flex-start'},
                
              ]}
            />
          </View>
        </View>
      </TouchableOpacity>

      {active && <DayListItemDetails item={item} />}
      {active && (
        <TouchableOpacity
          onPress={() => Actions.orderHistoryDetails({item: item})}
          style={[styles.seeMoreWrap, styles.seeMoreWrapRtl]}>
          <Text type="semiBold" style={styles.seeMoreText}>
            {strings.VIEW_DETAILS}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
