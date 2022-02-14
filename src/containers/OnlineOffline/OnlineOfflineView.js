import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  AppState,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  Maps,
  AmountAnimation,
  BackHandlerModel,
  ChangeFreeZoneKmModal,
  Loader,
} from '../../components';
import styles from './OnlineOfflineStyles';
import {RIDER_TYPE, strings} from '../../constants';
import {Colors, AppStyles, Metrics, Fonts, Images} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import util from '../../util';

export default function OnlineOfflineView(props) {
  const {
    coordinates,
    riderOnlineStatus,
    setAvailabilityStatus,
    setValue,
    totalAmountListing,
    totalSales,
    toggleModal,
    tripsRenderList,
    showTotalSales,
    user,
    onlineStatusLoading,
    loading,
    earningLoader,
    fromZoneOptions,
    BackHandler,
    isBackHandler,
    backHandlerModal,
    isFreeZoneModal,
    selectRegion,
    freeZoneRadius,
    isInRegion,
  } = props;

  // check driver have earning
  const calculateTodayEarning = () => {
    return _.isEmpty(tripsRenderList) ? 0 : tripsRenderList[0].earning;
  };

  // check driver have eaning then show detail or not
  const hanldeEarning = () => {
    console.log({calculateTodayEarning: calculateTodayEarning()});
    calculateTodayEarning() !== 0 ? toggleModal(showTotalSales) : () => {};
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mapWrap}>
          {!loading && !_.isUndefined(coordinates.latitude) && (
            <Maps
              initialRegion={coordinates}
              isRiderOnline={riderOnlineStatus}
              driverData={user}
              fromZoneOptions={props.fromZoneOptions}
              selectRegion={selectRegion}
              showRegions={props.showRegions}
            />
          )}

          {user.type === RIDER_TYPE.WASPHA_EXPRESS && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.totalAmountWrap}
              onPress={() => hanldeEarning()}>
              <LinearGradient
                start={{x: -0.1, y: 0.2}}
                end={{x: 0.3, y: 2.9}}
                colors={Colors.gradient.primary}
                style={styles.totalAmountStyle}>
                {earningLoader && (
                  <ActivityIndicator color={Colors.loader.secondary} />
                )}
                {!earningLoader && (
                  <View>
                    {showTotalSales ? (
                      <Text
                        color={Colors.text.secondary}
                        type="medium"
                        size={Fonts.size.xLarge}>
                        {`${
                          _.isNil(user.currency_code)
                            ? 'ESP'
                            : user.currency_code
                        }     ${calculateTodayEarning().toFixed(2)}`}
                      </Text>
                    ) : (
                      <RnImage
                        source={Images.HidePasswordIcon}
                        resizeMode="contain"
                        style={{
                          width: 30,
                          height: 30,
                          tintColor: Colors.text.secondary,
                        }}
                      />
                    )}
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          )}
          <Loader loading={loading} />
          <View
            style={{
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
              flex: 1,
              width: Metrics.screenWidth,
            }}>
            <TouchableOpacity
              style={styles.goWrap}
              activeOpacity={0.8}
              onPress={() => {
                if (!isInRegion && !_.isNil(user.fixed_zone_id)) {
                } else {
                  setAvailabilityStatus(!riderOnlineStatus);
                }
              }}>
              {!riderOnlineStatus && (
                <LinearGradient
                  start={{x: 0.3, y: 1.1}}
                  end={{x: -0.1, y: 0.1}}
                  colors={Colors.gradient.primary}
                  style={[styles.goBtnWrap]}>
                  <View style={styles.goContent}>
                    {onlineStatusLoading && (
                      <View style={styles.loaderWrap}>
                        <ActivityIndicator color={Colors.loader.secondary} />
                      </View>
                    )}
                    {!onlineStatusLoading && (
                      <Text
                        color={Colors.text.secondary}
                        type="semiBold"
                        size={
                          util.isRTL() ? Fonts.size.xSmall : Fonts.size.xLarge
                        }
                        style={styles.goTxt}>
                        {strings.GO}
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              )}
            </TouchableOpacity>
            <View>
              <LinearGradient
                start={{x: 0.7, y: 1}}
                end={{x: 0, y: 3.1}}
                colors={Colors.gradient.primary}
                style={styles.bottomSec}>
                <View
                  style={[
                    styles.bottomContent,
                    util.isRTL() && AppStyles.rowReverse,
                  ]}>
                  {false && (
                    <RnImage
                      source={Images.Icon2}
                      style={{marginTop: Metrics.baseMargin}}
                    />
                  )}
                  <View
                    style={{
                      maxWidth: Metrics.screenWidth / 1.2,
                    }}>
                    <Text
                      numberOfLines={2}
                      color={Colors.text.secondary}
                      textAlign={util.rtlRightText()}
                      size={Fonts.size.xLarge}
                      type="semiBold">
                      {`${
                        riderOnlineStatus
                          ? strings.YOU_ARE_ONLINE
                          : strings.YOU_ARE_OFFLINE
                      } !!`}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => Actions.drawerOpen()}>
                    <RnImage
                      style={{marginTop: Metrics.xsmallMargin}}
                      source={Images.DrawerIcon}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
        {totalAmountListing && (
          <AmountAnimation
            list={tripsRenderList}
            isModalOpen={totalAmountListing}
            closeModal={toggleModal}
            showEyeIcon={showTotalSales}
          />
        )}
        {isBackHandler && (
          <BackHandlerModel
            isModalOpen={isBackHandler}
            closeModal={setValue}
            BackHandler={BackHandler}
            backHandlerModal={backHandlerModal}
          />
        )}

        {isFreeZoneModal && (
          <ChangeFreeZoneKmModal
            isModalOpen={isFreeZoneModal}
            closeModal={setValue}
            modalType="isFreeZoneModal"
            submit={selectRegion}
            freeZoneRadius={freeZoneRadius}
            changeRadiusValue={(val) => setValue({freeZoneRadius: val})}
          />
        )}
      </View>
    </>
  );
}
