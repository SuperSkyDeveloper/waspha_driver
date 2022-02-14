import React from 'react';
import {View, Image as RnImage} from 'react-native';
import _ from 'lodash';
import {
  Maps,
  AcceptOrderInfoCard,
  AcceptOrderBottomSec,
  BottomSheet,
} from '../../components';
import styles from './AcceptOrderStyles';
import {Images} from '../../theme';

export default function AcceptOrderView(props) {
  const {
    request,
    filterOrder,
    openMapSheet,
    showMapOptions,
    selectMapOption,
    user,
    fromPickup,
    fromStartDelivery,
    showUser,
    coordinates,
    orderRequest,

    initialMapData,
    directionData,

    ///////////////////////////////
    setValue,
    cancelOrder,
    selectBtnText,
    setFunction,
    handleChangeRideStatus,
    hanldeConfirmationModal,

    ///////////////////////////////

    isVerificationModal,
    isChatOption,
    removeItemModal,
    fromNotification,
    renderFunction,
    fromAcceptOrder,
    isPhoneOption,
  } = props;

  return (
    <View style={styles.container}>
      <Maps
        directionData={directionData}
        initialRegion={{
          latitude: initialMapData.latitude,
          longitude: initialMapData.longitude,
        }}
      />
      <View style={styles.acceptInfoWrap}>
        <AcceptOrderInfoCard request={orderRequest} filterOrder={filterOrder} />
      </View>
      <AcceptOrderBottomSec
        // request={orderRequest}
        fromAcceptOrder={fromAcceptOrder}
        onMapNavPress={openMapSheet}
        shouldEnableContactOption={true}
        fromPickup={fromPickup}
        fromStartDelivery={fromStartDelivery}
        //////////////////////////////////////////
        isPhoneOption={isPhoneOption}
        setValue={setValue}
        cancelOrder={cancelOrder}
        selectBtnText={selectBtnText}
        setFunction={setFunction}
        handleChangeRideStatus={handleChangeRideStatus}
        hanldeConfirmationModal={hanldeConfirmationModal}
        renderFunction={renderFunction}
        //////////////////////////////////////////////////

        isVerificationModal={isVerificationModal}
        isChatOption={isChatOption}
        removeItemModal={removeItemModal}
        fromNotification={fromNotification}
      />
      {showMapOptions && (
        <BottomSheet setSheet={openMapSheet} selectOption={selectMapOption} />
      )}
    </View>
  );
}
