import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity, Linking} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './OptionsModalStyles';
import {Colors, Images, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function OptionsModalView(props) {
  const deliveryModeOptions = [
    {id: 0, name: strings.ONLINE_DELIVERY_GUY},
    {id: 1, name: strings.OFFLINE_DELIVERY_GUY},
    {id: 2, name: strings.WASPHA_EXPRESS},
  ];

  const {
    modalType,
    closeModal,
    isModalOpen,
    activeId,
    setValue,
    callBack,
    data,
    isTraditionalOrder,
    showPhoneOptions,
    showHeading,
  } = props;

  console.log({
    ___data___: data,
  });

  let chatOptions = [];

  chatOptions = [
    {
      id: 0,
      name: strings.USER,
      image: Images.UserIcon,
      rcUserName: !_.isNil(data.customer) && data.customer.rc_username,
      userName: !_.isNil(data.customer) && data.customer.name,
      userAvatar: !_.isNil(data.customer) && data.customer.avatar,
    },

    {
      id: 1,
      name: strings.VENDOR,
      image: Images.VendorIcon,
      rcUserName: !_.isNil(data.vendor) && data.vendor.rc_username,
      userName: !_.isNil(data.vendor) && data.vendor.name,
      userAvatar: !_.isNil(data.vendor) && data.vendor.image,
    },

    {
      id: 2,

      name: strings.GROUP_CHAT,
      image: Images.GroupChatIcon,

      rcUserName: !_.isNil(data.customer) && data.customer.rc_username,
      rcUserName2: !_.isNil(data.vendor) && data.vendor.rc_username,
      userName: `${strings.WASPHA} @ Order ID ${data.orders[0].id}`,
      userAvatar: Images.WasphaIcon,
    },
  ];

  if (isTraditionalOrder) {
    delete chatOptions[0];
    delete chatOptions[2];
  }

  return (
    <View style={styles.container}>
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
          start={{x: 0.0, y: 1.0}}
          end={{x: 0.0, y: 0.09}}
          colors={Colors.gradient.primary}
          style={styles.modalStyle}>
          {showHeading && (
            <View style={styles.headTextWrap}>
              <Text type="bold" style={styles.headerText}>
                {modalType === 'isDeliveryMode'
                  ? strings.CHANGE_DELIVERY_MODE
                  : strings.CHAT_OPTION}
              </Text>
            </View>
          )}
          <View style={util.isRTL() && {alignItems: 'flex-end'}}>
            {modalType !== 'isDeliveryMode' &&
              !showPhoneOptions &&
              chatOptions.map((chatOption) => (
                <TouchableOpacity
                  onPress={() => {
                    closeModal({[modalType]: false});
                    if (chatOption.id === 2) {
                      Actions.rocketChatContainer({
                        rc_username: chatOption.rcUserName,
                        rc_username2: chatOption.rcUserName2,
                        chattingWithPersonName: chatOption.userName,
                        userAvatar: chatOption.userAvatar,
                        isGroupChat: true,
                        orderId: data.orders[0].id,
                        userRc:
                          !_.isNil(data.user) && data.customer.rc_username,
                      });
                    } else {
                      Actions.rocketChatContainer({
                        rc_username: chatOption.rcUserName,
                        chattingWithPersonName: chatOption.userName,
                        userAvatar: chatOption.userAvatar,
                        orderId: data.orders[0].id,
                        userRc:
                          !_.isNil(data.user) && data.customer.rc_username,
                      });
                    }
                  }}
                  style={[
                    styles.optionItem,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <RnImage
                    source={chatOption.image}
                    style={[
                      styles.optionIconStyle,
                      util.isRTL() && AppStyles.mLeft15,
                    ]}
                    resizeMode="contain"
                  />
                  <Text type="bold" style={styles.optionText}>
                    {chatOption.name}
                  </Text>
                </TouchableOpacity>
              ))}

            {showPhoneOptions && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${data.vendor.contact}`);
                  }}
                  style={[styles.optionItem, {marginTop: 30}]}>
                  <Text type="bold" style={styles.optionText}>
                    {strings.CALL_STORE}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${data.customer.contact}`);
                  }}
                  style={{
                    ...AppStyles.flexRow,
                    marginLeft: Metrics.mediumBaseMargin,
                  }}>
                  <Text type="bold" style={styles.optionText}>
                    {strings.CALL_CUSTOMER}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {/* //delivery Mode options */}
            {modalType === 'isDeliveryMode' &&
              deliveryModeOptions.map((deliveryModeOption) => (
                <TouchableOpacity
                  onPress={() => setValue({activeId: deliveryModeOption.id})}
                  style={[
                    styles.optionItem,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  <View
                    style={[
                      styles.radioBtn,
                      util.isRTL() && AppStyles.mLeft15,
                    ]}>
                    <View
                      style={
                        activeId === deliveryModeOption.id &&
                        styles.activeRadioBtn
                      }
                    />
                  </View>
                  <Text type="bold" style={styles.optionText}>
                    {deliveryModeOption.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
          {modalType === 'isDeliveryMode' && (
            <View style={styles.btnWrap}>
              <Button
                onPress={() =>
                  closeModal({[modalType]: false}, callBack(activeId))
                }
                textStyle={styles.btnTextStyle}
                style={styles.btnStyle}>
                {strings.SUBMIT}
              </Button>
            </View>
          )}
        </LinearGradient>
      </Modal>
    </View>
  );
}
