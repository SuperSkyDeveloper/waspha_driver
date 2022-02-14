import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, ScrollView} from 'react-native';
import {Text, AcceptOrderInfoCard, Button, OrderList} from '../../components';
import styles from './ConfirmScreenStyles';
import {Images, Colors, Metrics} from '../../theme';
import {RIDER_TYPE, strings, TRIP_TYPE} from '../../constants';
import util from '../../util';
import {Actions} from 'react-native-router-flux';

export default function ConfirmScreenView(props) {
  const {
    request,
    filterOrder,
    loader,
    setFunction,
    selectBtnText,
    submitBtnText,
    showUser,
    fromAtDelivery,
    handleNavigation,
    btnLoading,
    user,
  } = props;

  const {customer, vendor} = request;

  if (loader) {
    return true;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AcceptOrderInfoCard
        isCloseBox={true}
        request={request}
        filterOrder={!_.isEmpty(filterOrder) && filterOrder}
        user={showUser ? customer : {}}
        vendor={!showUser ? vendor : {}}
      />
      <OrderList
        items={!_.isEmpty(request) && request.orders[0].items}
        fromAtDelivery={fromAtDelivery}
        showNoOfItems={true}
      />
      <View style={styles.submitBtnWrap}>
        <Button
          color={Colors.text.secondary}
          style={styles.submitBtn}
          isLoading={btnLoading}
          disabled={btnLoading}
          indicatorColor={Colors.loader.secondary}
          textStyle={styles.submitBtnText}
          // onPress={() => setFunction()}
          onPress={() => {
            handleNavigation();
          }}>
          {util.capitalizeSentence(submitBtnText())}
        </Button>
      </View>
      {TRIP_TYPE.AT_PICKUP === request.status &&
        user.type === RIDER_TYPE.WASPHA_EXPRESS && (
          <View style={{paddingHorizontal: 62}}>
            <Button
              color={Colors.text.secondary}
              style={styles.submitBtn}
              indicatorColor={Colors.loader.secondary}
              textStyle={styles.submitBtnText}
              onPress={() =>
                Actions.cancelOrder({
                  requestId: request.request_id,
                  isPenalty: true,
                })
              }>
              {strings.DECLINE.toUpperCase()}
            </Button>
          </View>
        )}
    </ScrollView>
  );
}
