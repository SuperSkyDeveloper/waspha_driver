import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  ProfileHeader,
  VehicleList,
  ProfileInputFields,
  Button,
  Loader,
} from '../../components';
import styles from './ProfileStyles';
import {Images, AppStyles, Colors, Fonts} from '../../theme';
import {DRIVERS_TYPE, strings} from '../../constants';
import util from '../../util';

export default function ProfileView(props) {
  const {
    vehicles,
    user,
    activeIndex,
    handleIndex,
    showByWalkFields,
    handleLogout,
    isLoading,
    isEditAble,
    setValue,

    vehicleName,
    vehicleNameError,
    regNo,
    regNoError,
    email,
    emailError,

    vehicleNameRef,
    regNoRef,
    emailRef,
    updateProfile,
    isBtnLoading,
  } = props;
  return (
    <>
      <Loader loading={isLoading || _.isEmpty(user)} />
      <View style={styles.container}>
        <View>
          <ProfileHeader user={user} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {user.type === DRIVERS_TYPE.WASPHA_EXPRESS && (
            <TouchableOpacity
              style={[
                AppStyles.mTop20,
                AppStyles.mBottom20,
                util.isRTL() ? {marginLeft: 20} : {marginRight: 20},
                {alignSelf: util.isRTL() ? 'flex-start' : 'flex-end'},
              ]}
              onPress={() => {
                setValue({isEditAble: !isEditAble});
              }}>
              <RnImage
                source={Images.EditIcon}
                style={isEditAble && {opacity: 0.4}}
              />
            </TouchableOpacity>
          )}
          <Text
            type="semiBold"
            textAlign={util.rtlRightText()}
            style={[
              AppStyles.mLeft25,
              AppStyles.mTop20,
              AppStyles.mBottom7,
              styles.vehicleSecText,
              util.isRTL() && AppStyles.mRight20,
            ]}>
            {isEditAble ? strings.SELECT_VEHICLE : strings.VEHICLE_DETAIL}
          </Text>
          {!isEditAble && (
            <View
              style={[
                util.isRTL() && AppStyles.rowReverse,
                util.isRTL() && AppStyles.mLeft20,
              ]}>
              <VehicleList
                items={util.findVehicle(vehicles, user.vehicle.id)}
                isHorizontal={true}
                user={user}
                activeIndex={activeIndex}
              />
            </View>
          )}
          {isEditAble && (
            <View
              style={[
                util.isRTL() && AppStyles.rowReverse,
                util.isRTL() && AppStyles.mLeft20,
              ]}>
              <VehicleList
                items={vehicles}
                isHorizontal={true}
                user={user}
                activeIndex={activeIndex}
                togglePress={handleIndex}
              />
            </View>
          )}
          <ProfileInputFields
            handleLogout={handleLogout}
            showByWalkFields={showByWalkFields}
            user={user}
            isEditAble={isEditAble}
            vehicleName={vehicleName}
            vehicleNameError={vehicleNameError}
            regNo={regNo}
            regNoError={regNoError}
            email={email}
            emailError={emailError}
            vehicleNameRef={vehicleNameRef}
            regNoRef={regNoRef}
            emailRef={emailRef}
            setValue={setValue}
          />
        </ScrollView>

        {isEditAble && (
          <View style={styles.submitBtnWrap}>
            <Button
              indicatorColor={Colors.loader.secondary}
              color={Colors.text.secondary}
              style={styles.submitBtn}
              isLoading={isBtnLoading}
              disabled={isBtnLoading}
              textStyle={styles.submitBtnText}
              onPress={updateProfile}>
              {strings.SAVE.toUpperCase()}
            </Button>
          </View>
        )}
      </View>
    </>
  );
}
