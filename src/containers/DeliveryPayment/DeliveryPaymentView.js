import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {Text, AcceptOrderInfoCard, Button} from '../../components';
import styles from './DeliveryPaymentStyles';
import {Images, Colors, Metrics, Fonts, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function DeliveryPaymentView(props) {
  const {request, filterOrder, showUser, handleNavigation, user} = props;
  const {customer, vendor} = request;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AcceptOrderInfoCard
        isCloseBox={true}
        request={request}
        filterOrder={filterOrder}
        user={showUser ? customer : {}}
        vendor={!showUser ? vendor : {}}
      />
      <View style={[styles.contentWrap, styles.shadowStyle]}>
        <View style={{alignItems: 'center'}}>
          <View style={AppStyles.flexRow}>
            <RnImage source={Images.CoinsIcon} />
            <Text type="semiBold" style={styles.collectCashText} />
          </View>
          <View
            style={[
              {
                marginTop: Metrics.baseMargin,
                alignItems: 'center',
                flexDirection: 'row',
              },
              util.isRTL() && AppStyles.rowReverse,
            ]}>
            <Text
              type="medium"
              style={[AppStyles.mRight5, AppStyles.mLeft5]}
              size={Fonts.size.xxxLarge}
              textAlign={util.rtlRightText()}>
              {_.isNil(user.currency_code) ? 'ESP' : user.currency_code}{' '}
            </Text>
            <Text
              size={60}
              color={Colors.text.weca}
              type="bold"
              textAlign={util.rtlRightText()}>
              {util.isEmptyNumber(
                util.decimalPlaces(request.orders[0].invoice.total.value),
              )}
            </Text>
          </View>
        </View>
        {false && (
          <View style={{marginTop: Metrics.baseMargin}}>
            <View style={styles.innerBtnWrap}>
              <Button
                color={Colors.text.primary}
                style={[styles.innerBtn, {backgroundColor: Colors.button.seca}]}
                textStyle={[styles.submitBtnText]}
                type="bold">
                {strings.CASH_ON_DELIVERY}
              </Button>
            </View>
            <View style={[styles.innerBtnWrap]}>
              <Button
                color={Colors.text.primary}
                style={[
                  styles.innerBtn,
                  styles.shadowStyle,
                  {backgroundColor: Colors.button.reca},
                ]}
                textStyle={[styles.submitBtnText]}
                type="bold">
                {strings.CREDIT_CARD}
              </Button>
            </View>
          </View>
        )}
      </View>
      <View style={styles.submitBtnWrap}>
        <Button
          color={Colors.text.secondary}
          style={styles.submitBtn}
          textStyle={styles.submitBtnText}
          onPress={() => {
            handleNavigation(request.status);
          }}>
          {strings.RECIEVE_PAYMENT.toUpperCase()}
        </Button>
      </View>
    </ScrollView>
  );
}
