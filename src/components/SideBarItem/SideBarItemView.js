import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  FlatList,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {Text} from '..';
import styles from './SideBarItemStyles';
import {Colors, Fonts, AppStyles, Metrics} from '../../theme';
import util from '../../util';

export default function SideBarItemView(props) {
  const {item, active, togglePress, index} = props;
  return (
    <>
      <TouchableOpacity
        onPress={
          !_.isNil(item.subMenus) ? () => togglePress(index) : item.action
        }
        style={[styles.linkWrap, util.isRTL() && AppStyles.rowReverse]}>
        <RnImage
          source={item.icon}
          style={{
            width: 22,
            height: 22,
            marginRight: 10,
            tintColor: Colors.text.secondary,
          }}
          tintColor={Colors.background.primary}
          resizeMode="contain"
        />
        <View style={[{width: '72%'}]}>
          <Text
            numberOfLines={3}
            textAlign={util.rtlRightText()}
            size={Fonts.size.small}
            style={util.isRTL() && AppStyles.mRight10}
            color={Colors.white}
            type={'medium'}>
            {item.title}
          </Text>
        </View>

        {!_.isNil(item.dropDownIcon) && (
          <View style={[AppStyles.pLeft5, {position: 'absolute', right: 0}]}>
            <RnImage
              source={item.dropDownIcon}
              style={[
                styles.iconMain,
                active && styles.activeBtn,
                {width: 11, height: 11, tintColor: Colors.text.secondary},
              ]}
              tintColor={Colors.white}
            />
          </View>
        )}

        {!_.isNil(item.switchAction) && (
          <View style={styles.switchWrap}>
            {item.onlineStatusLoading && (
              <ActivityIndicator color={Colors.loader.secondary} />
            )}
            {!item.onlineStatusLoading && (
              <Switch
                trackColor={{
                  false: Colors.button.tertiary,
                  true: Colors.button.accent,
                }}
                style={
                  (!util.isPlatformAndroid() && {
                    transform: [{scaleX: 0.9}, {scaleY: 0.8}],
                  },
                  util.isRTL() ? {marginLeft: 10} : {right: 10})
                }
                ios_backgroundColor="grey"
                onValueChange={item.switchAction}
                value={item.riderOnlineStatus}
                // style={[
                //   util.isPlatformAndroid()
                //     ? styles.androidSize
                //     : styles.iosSize,
                // ]}
              />
            )}
          </View>
        )}

        {/*
      {item.notifications !== '' && (
        <View style={styles.badge}>
          <Text size={Fonts.size.font13} color={Colors.white} type={'bold'}>
            {item.notifications}
          </Text>
        </View>
      )} */}
      </TouchableOpacity>

      {active && !_.isNil(item.subMenus) && (
        <View
          style={[
            util.isRTL() ? AppStyles.mRight20 : AppStyles.mLeft25,
            AppStyles.mBottom15,
            {top: -17},
          ]}>
          <FlatList
            data={item.subMenus}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={item.action}
                  style={[
                    AppStyles.flexRow,
                    util.isRTL() && AppStyles.rowReverse,
                    util.isRTL() && AppStyles.mLeft20,
                    {
                      marginTop: Metrics.baseMargin,
                      marginRight: Metrics.xsmallMargin,
                    },
                  ]}>
                  <RnImage
                    source={item.icon}
                    style={[styles.icon, util.isRTL() && AppStyles.mLeft10]}
                    tintColor={Colors.background.primary}
                    resizeMode="contain"
                  />
                  <Text
                    numberOfLines={2}
                    textAlign={util.rtlRightText()}
                    style={{maxWidth: '87%'}}
                    size={Fonts.size.xSmall}
                    color={Colors.white}
                    type={'medium'}>
                    {item.title}
                  </Text>
                  {item.info !== '' && (
                    <View style={AppStyles.pLeft5}>
                      <Text
                        textAlign={util.rtlRightText()}
                        size={Fonts.size.font15}
                        color={Colors.malachite}
                        type={'bold'}>
                        {item.info}
                      </Text>
                    </View>
                  )}
                  {item.notifications !== '' && (
                    <View style={styles.badge}>
                      <Text
                        size={Fonts.size.font13}
                        color={Colors.white}
                        type={'bold'}>
                        {item.notifications}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </>
  );
}
