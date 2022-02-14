import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {strings} from '../../constants';
import {Images, AppStyles, Colors, Metrics} from '../../theme';
import {Text} from '..';
import styles from './RateMyServiceHeaderStyles';
export default function RateMyServiceHeaderView(props) {
  const {user} = props;
  return (
    <LinearGradient
      start={{x: -1.1, y: 1.8}}
      end={{x: 3.1, y: -2.5}}
      colors={Colors.gradient.primary}
      style={styles.mainSec}>
      <View>
        <View style={{alignItems: 'center'}}>
          <RnImage
            source={
              _.isNil(user.avatar)
                ? Images.ProfilePlaceholder
                : {uri: user.avatar}
            }
            style={styles.profilePic}
          />
        </View>

        {/* <View style={[AppStyles.flexRow, AppStyles.mTop15]}> */}
        {/* <View style={[AppStyles.flexRow, styles.userRatingWrap]}>
            {rates.map((rate) => (
              <RnImage source={Images.StarIcon} style={styles.starIcon} />
            ))}
                  </View> */}
        {/* </View> */}
      </View>
    </LinearGradient>
  );
}
