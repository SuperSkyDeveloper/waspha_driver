import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import {
  Text,
  CustomNavbar,
  DriverTripsDetailSec,
  DayListItemDetails,
} from '../../components';
import styles from './OrderHistoryDetailsStyles';
import {strings, DATE_FORMAT4} from '../../constants';
import {Colors, Fonts, AppStyles} from '../../theme';
import {ISOToFormat} from '../../helpers/generalHelper';

export default function OrderHistoryDetailsView(props) {
  const {item, user} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.ORDER_DETAILS}
        titleColor={Colors.text.secondary}
        hasBottomRadius={true}
      />
      <View style={styles.espWrap}>
        <Text size={Fonts.size.xSmall} type="medium">
          {ISOToFormat(item.title, DATE_FORMAT4)}
        </Text>
        <View>
          <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
            <Text
              style={{top: 11}}
              type="medium"
              color={Colors.text.weca}
              size={Fonts.size.small}>
              {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
            </Text>
            <Text
              type="medium"
              style={[AppStyles.mLeft5, AppStyles.mTop5]}
              color={Colors.text.primary}
              size={Fonts.size.xLarge}>
              {item.earning.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* <View style={AppStyles.mTop20}>
        <DriverTripsDetailSec items={[item]} />
      </View> */}

      <View style={styles.dayListDetailsWrap}>
        <DayListItemDetails
          changeCardColor={true}
          item={item}
          isHorizontal={false}
          isToggleAble={true}
        />
      </View>
    </View>
  );
}
