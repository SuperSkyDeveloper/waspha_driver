import React from 'react';
import _ from 'lodash';
import {View, TouchableOpacity, FlatList, Image as RnImage} from 'react-native';
import SwiperRN from 'react-native-swiper';
import Modal from 'react-native-modal';
import {Text} from '../../components';
import styles from './AmountAnimationStyles';
import {Images, Colors, AppStyles, Metrics, Fonts} from '../../theme';
import {ISOToFormat, GetCurrentTimeInISO} from '../../helpers/generalHelper';
import {DATE_TIME, DATE_FORMAT2, TIME_FORMAT, strings} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import util from '../../util';

export default function AmountAnimationView(props) {
  const {isModalOpen, closeModal, list, tripsLength, showEyeIcon, user} = props;

  return (
    <View>
      <Modal
        animationIn="zoomIn"
        animationInTiming={500}
        isVisible={isModalOpen}
        onBackButtonPress={() => {
          closeModal(showEyeIcon);
        }}
        onBackdropPress={() => {
          closeModal(showEyeIcon);
        }}
        backdropOpacity={0.6}
        backdropColor={Colors.background.secondary}
        style={styles.container}>
        <View style={styles.modalWrap}>
          <SwiperRN
            loop={false}
            scrollEnabled={true}
            horizontal
            paginationStyle={{position: 'absolute', bottom: 20}}>
            {list.map((item) => (
              <LinearGradient
                start={{x: 1.3, y: -1.4}}
                end={{x: -0.7, y: -1.05}}
                colors={Colors.gradient.primary}
                style={styles.modalSec}>
                <View style={styles.contentSec}>
                  <TouchableOpacity
                    onPress={() => closeModal(!showEyeIcon)}
                    style={[
                      styles.eyeIconWrap,
                      util.isRTL() ? {left: 30} : {right: 30},
                    ]}>
                    <RnImage
                      source={
                        showEyeIcon
                          ? Images.ViewPasswordIcon
                          : Images.HidePasswordIcon
                      }
                      resizeMode="contain"
                      style={[
                        styles.eyeIconStyle,
                        {tintColor: Colors.text.secondary},
                      ]}
                    />
                  </TouchableOpacity>

                  <View style={styles.totalSalesStyle}>
                    <Text
                      color={Colors.text.secondary}
                      type="bold"
                      size={Fonts.size.xLarge}>
                      {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
                      {item.earning.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.contentPart}>
                    <Text type="medium" color={Colors.text.secondary}>
                      {ISOToFormat(item.date, DATE_FORMAT2)}
                    </Text>
                  </View>
                  <View style={styles.contentPart}>
                    <Text type="medium" color={Colors.text.secondary}>
                      {item.id === 0
                        ? `${strings.TRIPS_COMPLETED} (${list.length - 1})`
                        : ISOToFormat(item.date, TIME_FORMAT)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            ))}
          </SwiperRN>
        </View>
      </Modal>
    </View>
  );
}
