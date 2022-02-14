import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from '..';
import styles from './ChangeFreeZoneKmModalStyles';
import {Colors, Fonts, AppStyles, Metrics, Images} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import LinearGradient from 'react-native-linear-gradient';
import TextInput from '../TextInput';
import Button from '../Button';
import _ from 'lodash';

export default function ChangeFreeZoneKmModalView(props) {
  const {
    isModalOpen,
    closeModal,
    modalType,
    submit,
    freeZoneRadius,
    changeRadiusValue,
    checkValueInFloat,
    error,
  } = props;
  console.log(checkValueInFloat);
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
        backdropColor={Colors.background.primary}>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 0.0, y: -0.3}}
          colors={Colors.gradient.primary}
          style={{
            paddingHorizontal: 90,
            paddingVertical: 90,
            borderRadius: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <View style={{top: -60}}>
              <Text
                type="medium"
                color={Colors.white}
                style={{textAlign: 'center'}}
                size={Fonts.size.large}>
                {strings.GIVE_FREE_ZONE_RADIUS}
              </Text>
            </View>
            <View
              style={{
                height: 60,

                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TextInput
                keyboardType={'number-pad'}
                placeholder={'Enter radius in km'}
                style={{
                  textAlign: 'center',

                  color: Colors.white,
                  borderBottomColor: Colors.black,
                  borderBottomWidth: 1,
                }}
                maxLength={checkValueInFloat ? 2 : 3}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={[AppStyles.inputStyle]}
                textAlign={util.isRTL() ? 'right' : 'left'}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                value={freeZoneRadius}
                // error={freeZoneKmError}
                onChangeText={(val) => {
                  changeRadiusValue(val);
                }}
                // ref={(ref) => {
                //   messageRef(ref);
                // }}
                // onSubmitEditing={handleSubmitPress}
              />
              {!_.isEmpty(freeZoneRadius) && (
                <Text
                  color={Colors.white}
                  size={Fonts.size.xxSmall}
                  style={{
                    position: 'absolute',

                    right: 0,
                    bottom: 25,
                  }}>
                  Km
                </Text>
              )}
            </View>
            <Text color={Colors.error} size={Fonts.size.xxSmall} style={{}}>
              {error}
            </Text>
          </View>

          <View style={[styles.btnWrap, AppStyles.mRight10, AppStyles.mTop25]}>
            <Button
              style={styles.btn1Style}
              textStyle={styles.btn1Text}
              type="medium"
              // isLoading={isLoading}
              // disabled={isLoading}
              indicatorColor={Colors.loader.secondary}
              onPress={() => {
                submit();
              }}>
              {strings.SUBMIT.toUpperCase()}
            </Button>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
