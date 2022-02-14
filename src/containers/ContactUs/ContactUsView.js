import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  RichTextEditor,
  RemoveItemModal,
} from '../../components';
import {Actions} from 'react-native-router-flux';
import {Images, Colors, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import styles from './ContactUsStyles';
import util from '../../util';

export default function ContactUsView(props) {
  const {
    handleSubmitPress,
    subject,
    message,
    subjectEror,
    messageError,
    subjectRef,
    messageRef,
    messageFocus,
    setValue,
    confirmModal,
    isLoading,
    refSubject,
    refMessage,
  } = props;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{flexGrow: 1}}
      enableOnAndroid
      scrollEnabled
      //keyboardShouldPersistTaps="always"
      style={styles.container}>
      <View>
        <LinearGradient
          start={{x: 0.1, y: 1}}
          end={{x: 1.8, y: 0.6}}
          colors={Colors.gradient.primary}
          style={styles.bgImage}>
          <TouchableOpacity
            onPress={() => {
              Actions.pop();
            }}
            style={[
              styles.backBtnStyle,
              util.isRTL() && styles.backBtnStyleRtl,
            ]}>
            <View>
              <RnImage
                source={Images.BackBtn}
                style={[util.isRTL() && styles.backBtnRtl]}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.contactUsTextWrap}>
            <Text type="bold" style={styles.contactUsTextStyle}>
              {strings.CONTACT_US.toUpperCase()}
            </Text>
          </View>
        </LinearGradient>
        <View style={styles.cardWrap}>
          <RnImage style={styles.imgStyle} source={Images.ContactUsIcon} />
          <View style={styles.inputFieldsStyle}>
            <View style={styles.subjectFieldStyle}>
              {/* <TextInput
                placeholder={strings.SUBJECT_HERE}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={AppStyles.inputStyle}
                textAlign={util.isRTL() ? 'right' : 'left'}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.SUBJECT}
                labelType={'semiBold'}
                value={subject}
                error={subjectEror}
                onChangeText={(val) => {
                  setValue({subject: val});
                }}
                ref={(ref) => {
                  subjectRef(ref);
                }}
                onSubmitEditing={messageFocus}
              /> */}

              <RichTextEditor
                inputStyle={AppStyles.inputStyle}
                value={subject}
                onChange={(text) => setValue({subject: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                label={strings.SUBJECT}
                labelType={'semiBold'}
                fontSize={Fonts.size.xxSmall}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                placeholder={strings.SUBJECT_HERE}
                error={subjectEror}
                isLabel={true}
                heightInput={50}
                refRichText={refSubject}
              />
            </View>
            <View style={AppStyles.mTop30}>
              {/* <TextInput
                placeholder={strings.MESSAGE_HERE}
                placeholderTextColor={Colors.text.quaternary}
                inputStyle={AppStyles.inputStyle}
                textAlign={util.isRTL() ? 'right' : 'left'}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                label={strings.MESSAGE}
                labelType={'semiBold'}
                value={message}
                error={messageError}
                onChangeText={(val) => {
                  setValue({message: val});
                }}
                ref={(ref) => {
                  messageRef(ref);
                }}
                onSubmitEditing={handleSubmitPress}
              /> */}
              <RichTextEditor
                inputStyle={AppStyles.inputStyle}
                value={message}
                onChange={(text) => setValue({message: text})}
                textAlign={util.isRTL() ? 'right' : 'left'}
                label={strings.MESSAGE}
                labelType={'semiBold'}
                fontSize={Fonts.size.xxSmall}
                labelStyle={[
                  AppStyles.labelStyle,
                  util.isRTL() && AppStyles.alignRight,
                ]}
                isLabel={true}
                placeholder={strings.MESSAGE_HERE}
                error={messageError}
                heightInput={50}
                refRichText={refMessage}
              />
            </View>
            <View style={styles.submitBtnWrap}>
              <Button
                color={Colors.button.primary}
                style={styles.submitBtn}
                textStyle={styles.submitBtnText}
                type="semiBold"
                isLoading={isLoading}
                indicatorColor={Colors.loader.secondary}
                disabled={isLoading}
                onPress={() => handleSubmitPress()}>
                {strings.SEND.toUpperCase()}
              </Button>
            </View>
          </View>
        </View>
      </View>

      {confirmModal && (
        <RemoveItemModal
          title={strings.MESSAGE_HAS_BEEN_SENT_SUCCESSFULLY}
          showOneBtn={true}
          btnTwoText={strings.OK}
          isModalOpen={confirmModal}
          closeModal={setValue}
          modalType="confirmModal"
        />
      )}
    </KeyboardAwareScrollView>
  );
}
