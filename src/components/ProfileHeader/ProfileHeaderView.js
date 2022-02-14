import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';

import {Actions} from 'react-native-router-flux';

import {ImagePicker, Loader, Text} from '../../components';
import styles from './ProfileHeaderStyles';
import {Images, Colors, AppStyles, Metrics, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function ProfileHeaderView(props) {
  const {
    user,
    setValue,
    isImgUploadVisible,
    updateProfileImage,
    closeImageModal,
    loading,
  } = props;
  return (
    <>
      <Loader loading={loading} />
      <LinearGradient
        start={{x: -1.1, y: 1.8}}
        end={{x: 3.1, y: -2.5}}
        colors={Colors.gradient.primary}
        style={styles.mainSec}>
        <View
          style={[
            AppStyles.pTop20,
            AppStyles.flexRow,
            util.isRTL() && AppStyles.rowReverse,
          ]}>
          <TouchableOpacity
            style={styles.backWrap}
            onPress={() => Actions.pop()}>
            <RnImage
              source={Images.BackBtn}
              style={util.isRTL() && styles.imageRtl}
            />
          </TouchableOpacity>
          <View style={styles.profilePicWrap}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setValue({isImgUploadVisible: true})}
              style={[
                styles.cameraIconWrap,
                util.isRTL() && styles.cameraIconWrapRtl,
              ]}>
              <RnImage
                source={Images.CameraIcon}
                style={{width: 17, height: 17}}
              />
            </TouchableOpacity>
            <RnImage
              source={util.riderImagePlaceholder(user.avatar)}
              style={[
                styles.profilePic,
                _.isNil(user.avatar) && {tintColor: Colors.white},
                util.isRTL() && AppStyles.mRight25,
              ]}
            />
          </View>
          {/* <Views
            style={
              util.isRTL()
                ? {marginRight: Metrics.doubleMediumBaseMargin}
                : {marginLeft: Metrics.doubleBaseMargin}
            }> */}
          <View
            style={[
              !util.isRTL()
                ? {width: Metrics.screenWidth / 2, marginLeft: 18}
                : {width: Metrics.screenWidth / 2.3, paddingRight: 0},
            ]}>
            <Text
              type="semiBold"
              size={Fonts.size.normal}
              style={[
                AppStyles.mBottom5,
                styles.userTextStyle,
                util.isRTL() && {textAlign: 'right'},
              ]}>
              {util.isEmptyReturnValue(user.name)}
            </Text>
            <Text
              type="medium"
              numberOfLines={1}
              size={Fonts.size.xSmall}
              style={[
                AppStyles.mBottom5,
                styles.userTextStyle,
                util.isRTL() && {textAlign: 'right'},
              ]}>
              {util.isEmptyReturnValue(user.email.address)}
            </Text>
            <Text
              type="medium"
              size={Fonts.size.xSmall}
              style={[
                styles.userTextStyle,
                util.isRTL() && {textAlign: 'right'},
              ]}>
              {util.isEmptyReturnValue(
                `${user.contact.country_code}${user.contact.number}`,
              )}
            </Text>
          </View>
        </View>
        {isImgUploadVisible && (
          <ImagePicker
            addImage={updateProfileImage}
            showPickerModal={isImgUploadVisible}
            closeModal={closeImageModal}
          />
        )}
      </LinearGradient>
    </>
  );
}
