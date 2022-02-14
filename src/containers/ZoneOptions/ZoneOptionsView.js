import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Button, CustomNavbar, Text, TextInput} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';
import styles from './ZoneOptionsStyles';

export default function ZoneOptionsView(props) {
  const {
    selectedZoneId,
    selectZone,
    setValue,
    freeZoneKm,
    freeZoneKmError,
    onSubmit,
    isLoading,
    onChangeText,
    canProceedFurther,
    checkValueInFloat,
  } = props;
  const zones = [
    {
      id: 1,
      name: strings.FIXED_ZONE,
    },
    {
      id: 2,
      name: strings.FREE_ZONE,
    },
  ];
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <CustomNavbar
          title={strings.ZONE_OPTIONS}
          titleColor={Colors.white}
          hasBottomRadius={true}
        />
        <View
          style={[
            AppStyles.flex,
            {marginVertical: 20, justifyContent: 'space-between'},
          ]}>
          <View style={{marginTop: 30}}>
            {zones.map((zone) => (
              <TouchableOpacity
                onPress={() => {
                  selectZone(zone.id);
                }}
                style={[
                  styles.optionItem,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <View
                  style={[styles.radioBtn, util.isRTL() && AppStyles.mLeft15]}>
                  <View
                    style={selectedZoneId === zone.id && styles.activeRadioBtn}
                  />
                </View>
                <Text type="bold" style={styles.optionText}>
                  {zone.name}
                </Text>
              </TouchableOpacity>
            ))}

            {selectedZoneId == 2 && (
              <View
                style={[
                  AppStyles.mTop20,
                  {
                    marginHorizontal: Metrics.tripleBaseMargin,

                    height: 70,
                  },
                ]}>
                <TextInput
                  autoFocus={true}
                  keyboardType={'number-pad'}
                  placeholder={strings.ENTER_RADIUS}
                  placeholderTextColor={Colors.text.quaternary}
                  inputStyle={[
                    AppStyles.inputStyle,
                    {fontSize: Fonts.size.xLarge},
                  ]}
                  textAlign={util.isRTL() ? 'right' : 'left'}
                  labelStyle={[
                    AppStyles.labelStyle,
                    util.isRTL() && AppStyles.alignRight,
                  ]}
                  //error={}
                  maxLength={checkValueInFloat ? 3 : 4}
                  value={freeZoneKm}
                  // onChangeText={(val) => {
                  //   setValue({freeZoneKm: val});
                  // }}
                  onChangeText={(freeZoneKm) => onChangeText(freeZoneKm)}
                  ///onSubmitEditing={Keyboard.dismiss()}
                  // ref={(ref) => {
                  //   messageRef(ref);
                  // }}
                  onSubmitEditing={onSubmit}
                />
                {!_.isEmpty(freeZoneKm) && (
                  <View
                    style={[
                      util.isRTL()
                        ? styles.percentSignWrapRtl
                        : styles.percentSignWrap,
                    ]}>
                    <Text type="medium" size={Fonts.size.medium}>
                      KM
                    </Text>
                  </View>
                )}
                <Text type="medium" color="red" size={Fonts.size.xxSmall}>
                  {freeZoneKmError}
                </Text>
              </View>
            )}
          </View>
          <View
            style={[styles.loginBtnWrap, styles.paddingHr, {marginBottom: 30}]}>
            <LinearGradient
              start={{x: 0.3, y: 2}}
              end={{x: 1, y: 0}}
              colors={Colors.gradient.primary}
              style={styles.gradBtn}>
              <Button
                isLoading={isLoading}
                disabled={isLoading || !canProceedFurther}
                color={Colors.button.hexa}
                background={Colors.transparent}
                style={styles.loginBtn}
                size={Fonts.size.normal}
                indicatorColor={Colors.button.hexa}
                onPress={onSubmit}
                type="semiBold">
                {strings.CONTINUE.toUpperCase()}
              </Button>
            </LinearGradient>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
