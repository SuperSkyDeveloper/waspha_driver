import React from 'react';
import {View, Image as RnImage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './ConfirmationModalStyles';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function ConfirmationModalView(props) {
  const {
    isModalOpen,
    closeModal,
    modalType,
    showOnlyWallet,
    changeAmount,
    handleAddCashUserWallet,
    handleReturnCash,
    isLoading,
    isTraditionalOrder,
  } = props;

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
          start={{x: 1.0, y: 2.0}}
          end={{x: 1.7, y: -0.09}}
          colors={Colors.gradient.primary}
          style={styles.modalStyle}>
          <View>
            <View
              style={{
                paddingHorizontal:
                  changeAmount === 0
                    ? Metrics.doubleBaseMargin
                    : Metrics.baseMargin,
                paddingBottom:
                  changeAmount === 0 ? Metrics.doubleBaseMargin : 0,
                paddingTop: changeAmount === 0 ? Metrics.baseMargin : 0,
                marginTop: Metrics.baseMargin,
              }}>
              <Text
                textAlign={util.rtlRightText()}
                size={Fonts.size.xLarge}
                type="semiBold"
                color={Colors.text.secondary}>
                {strings.CONFIRMATION}
              </Text>
              <Text
                textAlign={util.rtlRightText()}
                size={
                  changeAmount === 0 ? Fonts.size.medium : Fonts.size.xxSmall
                }
                type="medium"
                color={Colors.text.secondary}>
                {`${
                  changeAmount === 0
                    ? strings.THANKYOU_FOR_TRIP
                    : strings.REMAINING_AMOUNT
                } .`}
              </Text>
            </View>
            {changeAmount !== 0 && (
              <View style={styles.contentSec}>
                <View style={styles.amountWrap}>
                  <Text
                    color={Colors.text.secondary}
                    size={Fonts.size.xLarge}
                    type="semiBold">
                    {util.decimalPlaces(changeAmount)}
                  </Text>
                </View>
              </View>
            )}

            <View style={styles.btnSec}>
              {!isTraditionalOrder && changeAmount !== 0 && (
                <View style={[styles.btnWrap, AppStyles.mRight10]}>
                  <Button
                    style={styles.btn1Style}
                    textStyle={styles.btn1Text}
                    type="medium"
                    isLoading={isLoading}
                    disabled={isLoading}
                    indicatorColor={Colors.loader.secondary}
                    onPress={() => {
                      handleAddCashUserWallet(changeAmount);
                    }}>
                    {strings.ADD_TO_WALLET.toUpperCase()}
                  </Button>
                </View>
              )}
              {!showOnlyWallet && (
                <View style={styles.btnWrap}>
                  <Button
                    style={styles.btn2Style}
                    textStyle={styles.btn2Text}
                    type="medium"
                    onPress={() => {
                      handleReturnCash();
                    }}>
                    {changeAmount === 0
                      ? strings.OK.toUpperCase()
                      : strings.RETURN_CHANGE.toUpperCase()}
                  </Button>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
