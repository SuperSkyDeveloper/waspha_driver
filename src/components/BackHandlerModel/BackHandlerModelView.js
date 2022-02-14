import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from '..';
import styles from './BackHandlerModelStyles';
import {Colors, Fonts, AppStyles, Metrics, Images} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
export default function BackHandlerModelView(props) {
  const {isModalOpen, closeModal, backHandlerModal, modalType, BackHandler} =
    props;
  return (
    <View>
      <Modal
        isVisible={isModalOpen}
        onBackButtonPress={() => {
          closeModal({[modalType]: false});
        }}
        onBackdropPress={() => {
          closeModal({[modalType]: false});
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.black}>
        <View style={styles.modalStyle}>
          <RnImage source={Images.SelectLanguageWrap} />
        </View>
        <View
          style={[
            styles.contentWrap,
            !util.isPlatformAndroid() && {marginRight: 10},
          ]}>
          <View
            style={[
              styles.selectLanguageWrap,
              !util.isPlatformAndroid() && {marginLeft: 4},
            ]}>
            <Text type="bold" size={Fonts.size.small} color={Colors.white}>
              {strings.DO_WANT_CLOSE_APP}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => BackHandler()}
            style={styles.contentSec}>
            <View style={[styles.amountWrap]}>
              <Text
                style={{
                  fontFamily: util.isPlatformAndroid()
                    ? 'Lateef-Regular'
                    : 'Lateef',
                }}
                color={Colors.white}
                size={Fonts.size.xxLarge}
                type="semiBold">
                {strings.YES}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => backHandlerModal()}
            style={styles.contentSec}>
            <View style={[styles.amountWrap]}>
              <View>
                <Text
                  style={{
                    fontFamily: util.isPlatformAndroid()
                      ? 'Lateef-Regular'
                      : 'Lateef',
                  }}
                  color={Colors.white}
                  size={Fonts.size.xxLarge}
                  type="semiBold">
                  {strings.NO}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
