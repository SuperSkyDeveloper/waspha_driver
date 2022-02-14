import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  FlatList,
  Switch,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import {
  Text,
  BottomSheet,
  SelectLanguageModal,
  SideBarItem,
  ChangeFreeZoneKmModal,
  Loader,
} from '..';

import styles from './SideBarStyles';
import {Images, Fonts, Colors, AppStyles, Metrics} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import {strings, APP_VERSION, ZONE_OPTIONS, RIDER_TYPE} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import Modal from 'react-native-modal';

export default function SideBarView(props) {
  const {
    setValue,
    activeIndex,
    handleIndex,
    riderOnlineStatus,
    setAvailabilityStatus,
    onlineStatusLoading,
    isLangModalVisible,
    handleLanguageModal,
    isLoading,
    handleChangeLanguage,
    handleLogout,
    logoutLoader,
    handleChangeRadiusModal,
    isChangeRadiusModalVisible,
    user,
    assignRadiusToFreeZone,
    freeZoneRadius,
    onChangeText,
    error,
  } = props;

  let LINK_LIST = [
    {
      id: 1,
      title: strings.DASHBOARD,
      icon: Images.DashboardIcon2,
      notifications: '',
      info: '',
      action: () => {
        Actions.drawerClose();
        Actions.earningDetails();
      },
    },
    {
      id: 2,
      title: strings.REVIEWS,
      icon: Images.RatingsIcon,
      notifications: '',
      info: '',
      action: () => {
        Actions.drawerClose();

        Actions.ratingsList();
      },
    },

    // {
    //   id: 9,
    //   title: strings.ACTIVATE_NIGHT_MODE,
    //   icon: Images.MoonIcon,
    //   notifications: '',
    //   info: '',
    //   action: () => {},
    // },

    {
      id: 3,
      title: strings.LEGAL,
      icon: Images.LegalIcon,
      dropDownIcon: Images.DownArrowIcon,
      subMenus: [
        {
          id: 6,
          title: strings.FAQ.toUpperCase(),
          icon: Images.FAQ,
          notifications: '',
          info: '',
          action: () => {
            Actions.drawerClose();

            Actions.faqs();
          },
        },

        {
          id: 14,

          title: strings.PRIVACY_POLICY,
          icon: Images.PrivacyPolicy,
          notifications: '',
          info: '',
          action: () => {
            Actions.privacyPolicy();
          },
        },

        {
          id: 143,

          title: strings.TERMS_AND_CONDITION,
          icon: Images.TermsCondition,
          notifications: '',
          info: '',
          action: () => {
            Actions.termsAndCondition();
          },
        },

        {
          id: 12,

          title: strings.COOKIE_POLICY,
          icon: Images.CookiePolicy,
          notifications: '',
          info: '',
          action: () => {
            Actions.cookiePolicy();
          },
        },

        {
          id: 13,

          title: strings.COPY_RIGHT_POLICY,
          icon: Images.CopyRightIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.copyrightPolicy();
          },
        },

        {
          id: 15,

          title: strings.GDPR_COMPLIANCE_STATEMENT,
          icon: Images.GDPRIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.gdprComplianceStatement();
          },
        },

        {
          id: 7,
          title: strings.CONTACT_US,
          icon: Images.ContactIconImage,
          notifications: '',
          info: '',
          action: () => {
            Actions.drawerClose();

            Actions.contactUs();
          },
        },
      ],
    },

    {
      id: 4,
      title: strings.CHAT,
      icon: Images.Chat,
      restricted: user.is_approved,
      notifications: '',
      info: '',
      action: () => {
        Actions.rclisting();
      },
    },

    {
      id: 5,
      title: strings.SETTINGS,
      dropDownIcon: Images.DownArrowIcon,
      icon: Images.SettingsIcon,

      subMenus: [
        {
          id: 4,
          title: strings.LANGUAGES,
          icon: Images.ChangeLanguageIcon,
          notifications: '',
          info: '',
          action: () => {
            handleLanguageModal();
          },
        },
        {
          id: 3,
          title: strings.RESET_PASSWORD,
          icon: Images.ResetPasswordIcon,
          notifications: '',
          info: '',
          action: () => {
            Actions.drawerClose();

            Actions.resetPassword();
          },
        },
        {
          id: 8,
          title: strings.LOGOUT,
          icon: Images.LogoutIcon,
          notifications: '',
          info: '',
          action: () => {
            handleLogout();
          },
        },
      ],
    },

    {
      id: 6,
      title: strings.ONLINE_STATUS,
      icon: Images.SwitchIcon,
      notifications: '',
      info: '',
      action: () => {},
      isSwitch: true,
      switchAction: () => {
        setAvailabilityStatus();
      },
      riderOnlineStatus: riderOnlineStatus,
      onlineStatusLoading: onlineStatusLoading,
    },
    {
      id: 26,
      title: strings.INVITE_EARN,
      icon: Images.InviteAndearn,

      notifications: '',
      info: '',
      action: () => {
        Actions.referralCode();
      },
    },
  ];

  let changeRadius = {
    id: 7,
    title: strings.CHANGE_YOUR_RADIUS,
    icon: Images.LogoutIcon,

    notifications: '',
    info: '',
    action: () => {
      handleChangeRadiusModal();
    },
  };

  let changeRegion = {
    id: 8,
    title: strings.CHANGE_YOUR_REGION,
    icon: Images.LogoutIcon,

    notifications: '',
    info: '',
    action: () => {
      Actions.reset('drawerMenu');
      Actions.refresh({fromZoneOptions: true});
    },
  };

  let changeZone = {
    id: 9,
    title: strings.CHANGE_YOUR_ZONE,
    icon: Images.LogoutIcon,

    notifications: '',
    info: '',
    action: () => {
      Actions.zoneOptions();
    },
  };

  if (user.zone_option === ZONE_OPTIONS.ALL) {
    LINK_LIST.push(changeZone);
    if (!_.isNil(user.fixed_zone_id)) {
      LINK_LIST.push(changeRegion);
    }
    if (!_.isNil(user.free_zone_radius)) {
      LINK_LIST.push(changeRadius);
    }
  }

  if (user.zone_option === ZONE_OPTIONS.FREE_ZONE) {
    LINK_LIST.push(changeRadius);
  }
  if (user.zone_option === ZONE_OPTIONS.FIXED_ZONE) {
    LINK_LIST.push(changeRegion);
  }

  return (
    <>
      <Spinner
        // visible={loading}
        color={Colors.green}
      />

      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 2.5, y: 0}}
        colors={Colors.gradient.primary}
        style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[styles.baseIconSec, util.isRTL() && styles.baseIconSecRtl]}>
            <TouchableOpacity
              style={styles.baseIconWrp}
              onPress={() => {
                Actions.drawerClose();
              }}>
              <RnImage style={styles.baseIcon} source={Images.BaselineIcon} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              Actions.profile();
            }}
            style={[styles.profileSec, util.isRTL() && AppStyles.rowReverse]}>
            <View style={[styles.imgWrap, util.isRTL() && AppStyles.mLeft15]}>
              <RnImage
                style={[
                  styles.profileImg,
                  _.isNil(user.avatar) && {tintColor: Colors.white},
                ]}
                source={util.riderImagePlaceholder(user.avatar)}
              />
            </View>
            <View
              style={[
                AppStyles.mLeft10,
                AppStyles.pTop15,
                AppStyles.flex,
                util.isRTL() && AppStyles.width100,
              ]}>
              <Text
                style={AppStyles.mBottom5}
                textAlign={util.rtlRightText()}
                size={Fonts.size.xxxxSmall}
                type="medium"
                color={Colors.text.secondary}>
                {util.isEmptyReturnValue(user.name)}
              </Text>
              <View
                style={[
                  AppStyles.flexRow,
                  AppStyles.mBottom10,
                  util.isRTL() && AppStyles.width100,
                  util.isRTL() && AppStyles.rowReverse,
                ]}>
                <RnImage
                  source={Images.StarIcon}
                  style={[
                    AppStyles.mRight5,
                    util.isRTL() && AppStyles.mLeft5,
                    {height: 13, width: 13},
                  ]}
                />
                <Text
                  textAlign={util.rtlRightText()}
                  size={Fonts.size.xxxSmall}
                  color={Colors.text.secondary}>
                  {/* {util.isEmptyReturnValue(
                    user.location && user.location.address,
                  )} */}
                  {user.avg_rating}
                </Text>
              </View>
              <View
                style={[
                  util.isRTL() ? AppStyles.rowReverse : AppStyles.flexRow,
                  AppStyles.alignItemsCenter,
                ]}>
                <RnImage
                  source={Images.GiftIcon}
                  style={[AppStyles.mRight5, {tintColor: Colors.white}]}
                />
                <Text
                  size={Fonts.size.font15}
                  // color={Colors.text.tertiary}
                  color={Colors.white}
                  type={'bold'}>
                  {user.loyalty_points} points
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.hLine} />
          <View style={styles.linkSec}>
            <FlatList
              data={LINK_LIST}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const active = index === activeIndex;
                if (
                  user.type === RIDER_TYPE.WASPHA_EXPRESS &&
                  user.is_approved === false
                ) {
                  if (item.id !== 3 && item.id !== 5) {
                    return true;
                  }
                }

                return (
                  <SideBarItem
                    item={item}
                    active={active}
                    togglePress={handleIndex}
                    index={index}
                  />
                );
              }}
            />
          </View>
          <View style={styles.versionWrap}>
            <Text
              style={AppStyles.mRight10}
              size={Fonts.size.xSmall}
              color={Colors.text.secondary}
              type="medium">
              {strings.VERSION}
            </Text>
            <Text
              textAlign="center"
              size={Fonts.size.xSmall}
              color={Colors.text.secondary}
              type="medium">
              {APP_VERSION}
            </Text>
          </View>
        </ScrollView>
        {isLangModalVisible && (
          <SelectLanguageModal
            isModalOpen={isLangModalVisible}
            closeModal={setValue}
            modalType="isLangModalVisible"
            handleLangSelect={handleChangeLanguage}
          />
        )}

        {isChangeRadiusModalVisible && (
          <ChangeFreeZoneKmModal
            isModalOpen={isChangeRadiusModalVisible}
            closeModal={setValue}
            modalType="isChangeRadiusModalVisible"
            submit={assignRadiusToFreeZone}
            freeZoneRadius={freeZoneRadius}
            error={error}
            changeRadiusValue={(freeZoneRadius) => onChangeText(freeZoneRadius)}
            //changeRadiusValue={(val) => setValue({freeZoneRadius: val})}
          />
        )}
      </LinearGradient>
    </>
  );
}
