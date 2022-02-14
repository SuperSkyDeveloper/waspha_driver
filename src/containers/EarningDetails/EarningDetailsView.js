import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  DashboardHeader,
  ChartWhite,
  DayList,
  DriverTripsDetailSec,
  Loader,
} from '../../components';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './EarningDetailsStyles';
import {AppStyles, Fonts, Colors, Metrics, Images} from '../../theme';
import {earningFilter, strings} from '../../constants';
import util from '../../util';

export default function EarningDetailsView(props) {
  const {
    dayWiseTrips,
    activeIndex,
    handleIndex,
    handleFilter,
    filterValue,
    filterValueTitle,
    isLoading,
    handleFilterPress,
    handleEarningFilterOpt,
    user,
    totalEarnings,
    totalPenalty,
  } = props;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <DashboardHeader />
      <View style={{marginVertical: 15}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{alignItems: 'center'}}>
            <Text>{strings.TOTAL_EARNINGS}</Text>
            <Text size={23}>{totalEarnings.toFixed(2)}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text>{strings.TOTAL_PENALTY}</Text>

            <Text size={23}>{totalPenalty.toFixed(2)}</Text>
          </View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text>{strings.TOTAL_AMOUNT_EARNED} </Text>
          <Text size={26}> {(totalEarnings - totalPenalty).toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleEarningFilterOpt('show');
        }}
        style={[
          styles.selectWrap,
          {justifyContent: 'space-between'},
          util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
        ]}>
        <Text type="medium" textAlign={util.rtlRightText()}>
          {util.capitalizeFirstLetter(filterValueTitle)}
        </Text>
        <View
          style={{
            transform: [{rotate: '-90deg'}],
            top: 6,
            width: 11,
            height: 11,
          }}>
          <RnImage
            source={Images.BackBtn}
            style={{width: 11, height: 11, tintColor: Colors.black}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>

      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <>
          {_.isEmpty(dayWiseTrips) ? (
            <View>
              <Text style={AppStyles.mTop25} type="medium" textAlign="center">
                {strings.DATA_NOT_FOUND}
              </Text>
            </View>
          ) : (
            <>
              {false && (
                <>
                  <View style={styles.todayEarnWrap}>
                    <Text color={Colors.text.hexa}>{strings.TODAY}</Text>
                    <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                      <Text
                        type="extraBold"
                        color={Colors.text.weca}
                        size={Fonts.size.xxSmall}
                        style={{top: 8}}>
                        {_.isNil(user.currency_code)
                          ? 'ESP'
                          : user.currency_code}{' '}
                      </Text>
                      <Text
                        type="extraBold"
                        color={Colors.text.primary}
                        size={Fonts.size.xLarge}>
                        154
                      </Text>
                    </View>
                  </View>
                  <View style={[AppStyles.mTop20, AppStyles.mBottom10]}>
                    <ScrollView horizontal={true}>
                      <ChartWhite data={dayWiseTrips} />
                    </ScrollView>
                  </View>
                  <View style={[AppStyles.marginHorizontalBase]}>
                    <DriverTripsDetailSec items={dayWiseTrips} />
                  </View>
                </>
              )}
              <View
                style={[
                  AppStyles.flex,
                  AppStyles.mTop15,
                  AppStyles.marginHorizontalBase,
                ]}>
                {dayWiseTrips.map((item, index) => {
                  const active = index === activeIndex;
                  return (
                    <DayList
                      item={item}
                      active={active}
                      handleIndex={handleIndex}
                      index={index}
                    />
                  );
                })}
              </View>
            </>
          )}
          <RBSheet
            ref={(ref) => {
              props.refRBSheet(ref);
            }}
            closeOnDragDown={true}
            closeOnPressMask={false}
            customStyles={{
              wrapper: {
                backgroundColor: '#0000009e',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            {util.EARNING_FILTER().map((item) => {
              return (
                <TouchableOpacity
                  style={styles.optionWrap}
                  onPress={() => {
                    handleFilterPress(item);
                  }}>
                  <Text textAlign={util.rtlRightText()} type="medium">
                    {item && util.capitalizeFirstLetter(item.title)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </RBSheet>
        </>
      )}
    </ScrollView>
  );
}
