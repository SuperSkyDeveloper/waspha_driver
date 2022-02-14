import React from 'react';
import {View, Image as RnImage, ScrollView} from 'react-native';
import _ from 'lodash';
import {
  Text,
  AcceptOrderInfoCard,
  OrderList,
  PaymentBreakDown,
  CustomNavbar,
} from '../../components';
import styles from './RecieveAmountDetailsStyles';
import {AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';

export default function RecieveAmountDetailsView(props) {
  const {request, filterOrder, handleShareBtn} = props;
  const items = request.orders[0].items;

  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.DETAILS}
        titleColor={Colors.text.secondary}
        hasBottomRadius={true}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={[AppStyles.flex]}>
        <AcceptOrderInfoCard isCloseBox={true} request={request} />

        <View style={[AppStyles.mTop60, AppStyles.flex]}>
          <Text
            style={[
              AppStyles.mLeft25,
              AppStyles.mBottom10,
              util.isRTL() && AppStyles.mRight20,
            ]}
            textAlign={util.rtlRightText()}>
            {`${strings.DELIVER} ${items.length} ${
              items.length > 1 ? strings.ITEMS : strings.ITEM
            } `}
          </Text>
          <OrderList items={request.orders[0].items} />
        </View>
        <View style={[AppStyles.mTop30, AppStyles.mBottom30, AppStyles.flex]}>
          <PaymentBreakDown
            handleShareBtn={handleShareBtn}
            data={{
              ...request.orders[0].invoice,
              order_type: request.order_type,
            }}
            selectedPromoCode={
              !_.isNil(request.orders[0].promo_code)
                ? request.orders[0].promo_code
                : null
            }
            paymentTypeOfUser={request.payment_method}
          />
        </View>
      </ScrollView>
    </View>
  );
}
