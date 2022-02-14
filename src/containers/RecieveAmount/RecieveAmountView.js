import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  AcceptOrderInfoCard,
  TextInput,
  Button,
  ConfirmationModal,
} from '../../components';
import styles from './RecieveAmountStyles';
import {AppStyles, Images, Fonts, Colors, Metrics} from '../../theme';
import {PLACED_ORDER_TYPE, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';

export default function RecieveAmountView(props) {
  const {
    request,
    filterOrder,
    showUser,
    amount,
    amountError,
    setValue,
    isConfirmationModal,
    amountFocus,
    handleAddCashUserWallet,
    isLoading,
    user,
    handleReturnCash,
    handleBackButtonClick,
  } = props;
  const {customer, vendor} = request;
  console.log({request});
  return (
    <ScrollView style={styles.container}>
      <AcceptOrderInfoCard
        isCloseBox={true}
        request={request}
        filterOrder={filterOrder}
        user={showUser ? customer : {}}
        vendor={!showUser ? vendor : {}}
      />
      <View style={[styles.mainContent, styles.shadowStyle]}>
        <View style={styles.contentWrap}>
          <View style={styles.collectCashWrap}>
            <RnImage source={Images.CoinsIcon} />
            <Text type="semiBold" style={styles.collectCashText}>
              {strings.COLLECT_CASH}
            </Text>
          </View>

          <View style={AppStyles.mRight5}>
            <View style={AppStyles.flexRow}>
              <Text
                type="bold"
                color={Colors.text.weca}
                style={[AppStyles.mRight5, {top: 5}]}
                size={8}>
                {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}
              </Text>

              <Text type="bold" size={Fonts.size.xxxxSmall}>
                {request.orders[0].invoice.total.value.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity>
              <Text
                type="medium"
                size={Fonts.size.xxSmall}
                style={styles.detailsText}
                onPress={() =>
                  Actions.recieveAmountDetails({showUser, request, filterOrder})
                }>
                {strings.DETAILS}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={amountFocus}
          style={styles.amountInputWrap}>
          <Text
            style={{top: 16}}
            type="bold"
            color={Colors.text.weca}
            size={Fonts.size.xxxLarge}>
            {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}
          </Text>
          <TextInput
            autoFocus
            inputStyle={styles.inputStyle}
            autoCapitalize="none"
            keyboardType={'number-pad'}
            value={amount}
            onChangeText={(val) => {
              setValue({amount: val});
            }}
            ref={(ref) => {
              props.amountRef(ref);
            }}
          />
        </TouchableOpacity>
        {!_.isEmpty(amountError) && (
          <Text style={styles.amountErrorStyle}>{amountError}</Text>
        )}

        <View style={styles.btnSec}>
          <View style={styles.btnWrap}>
            <Button
              style={[styles.btn1Style, styles.shadowStyle]}
              textStyle={styles.btn1Text}
              type="semiBold"
              onPress={() => {
                handleBackButtonClick();
              }}>
              {strings.CANCEL}
            </Button>
          </View>
          <View style={styles.btnWrap}>
            <Button
              style={[styles.btn2Style, styles.shadowStyle]}
              textStyle={styles.btn2Text}
              type="semiBold"
              onPress={props.handleSubmit}>
              {strings.OK}
            </Button>
          </View>
        </View>
      </View>

      {isConfirmationModal && (
        <ConfirmationModal
          isTraditionalOrder={
            request.order_type === PLACED_ORDER_TYPE.TRADITIONAL
          }
          isLoading={isLoading}
          isModalOpen={isConfirmationModal}
          closeModal={setValue}
          modalType="isConfirmationModal"
          amount={amount}
          orderTotalAmount={request.orders[0].invoice.total.value}
          handleReturnCash={handleReturnCash}
          handleAddCashUserWallet={handleAddCashUserWallet}
        />
      )}
    </ScrollView>
  );
}
