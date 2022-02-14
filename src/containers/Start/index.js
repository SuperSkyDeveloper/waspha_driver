// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {View, Image, ImageBackground, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import moment, {duration} from 'moment';
import {Images, Colors} from '../../theme';
import styles from './styles';
import util from '../../util';
import {
  appSettingsRequest,
  getTranslationsRequest,
  setCountryCode,
} from '../../actions/GeneralActions';
import {RIDER_TYPE, strings, ZONE_OPTIONS} from '../../constants';
import {getCurrentRegion} from '../SelectLocationMap/assets/locationHelper';

class Start extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {appLanguage} = this.props;

    util.updateLocale(appLanguage);

    this.initial();
  }

  // handle initial
  initial = () => {
    const {translationsUpdateAt, setCountryCode} = this.props;
    getCurrentRegion(true).then((countryCode) => {
      return setCountryCode(countryCode);
    });
    this.props.appSettingsRequest({}, (response) => {
      if (response.status) {
        if (
          _.isNil(translationsUpdateAt) ||
          moment(translationsUpdateAt).isBefore(
            response.translations_updated_at,
          )
        ) {
          this.props.getTranslationsRequest((res) => {
            if (res) {
              setTimeout(() => {
                this.getUpdatedString();
              }, 1000);
            }
          });
        } else {
          this.getUpdatedString();
        }
      }
    });
  };

  // getUpdatedString
  getUpdatedString = () => {
    strings.setContent(this.props.translations);
    util.switchLanguage(this.props.appLanguage);

    this.setState({});
    this.navigate();
  };

  // handle initial
  // initial = () => {
  //   const {userData} = this.props;
  //   if (!_.isEmpty(userData.access_token) && !userData.is_approved) {
  //     return Actions.waiting();
  //   }
  //   if (!_.isEmpty(userData) && !_.isEmpty(userData.access_token)) {
  //     return Actions.reset('drawerMenu');
  //     ``;
  //   }
  //   return Actions.reset('login');
  // };

  navigate = () => {
    console.log({initial_run: this.props.initialRun});

    if (this.props.initialRun) {
      Actions.reset('welcome');
    } else if (
      !_.isEmpty(this.props.userData.access_token) &&
      !this.props.userData.is_approved &&
      RIDER_TYPE.WASPHA_EXPRESS === this.props.userData.type
    ) {
      Actions.replace('waiting');
    } else if (
      !this.props.userData.is_zone_selected &&
      RIDER_TYPE.WASPHA_EXPRESS === this.props.userData.type
    ) {
      if (this.props.userData.zone_option === ZONE_OPTIONS.FIXED_ZONE) {
        Actions.reset('drawerMenu');
        Actions.refresh({fromZoneOptions: true});
      } else if (this.props.userData.zone_option === ZONE_OPTIONS.FREE_ZONE) {
        Actions.reset('drawerMenu');
      } else {
        return Actions.reset('zoneOptions');
      }
    } else if (
      this.props.userData.is_zone_selected &&
      this.props.userData.zone_option === ZONE_OPTIONS.FIXED_ZONE
    ) {
      console.log('helele');
      Actions.reset('drawerMenu');
      // Actions.refresh({fromZoneOptions: true});
    } else if (!_.isEmpty(this.props.userData.access_token)) {
      return Actions.reset('drawerMenu');
    } else {
      return Actions.reset('login');
    }
  };
  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <ImageBackground source={Images.SplashBg} style={styles.container}>
          <Image source={Images.Logo} style={styles.image} />
          {/* <DoubleBounce size={15} color={Colors.blue2} /> */}
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  userData: user.data,
  initialRun: general.initialRun,
  appLanguage: general.appLanguage,
  translations: general.translationLocales.strings,
  translationsUpdateAt: general.translationLocales.translationsUpdatedAt,
});

const actions = {
  appSettingsRequest,
  getTranslationsRequest,
  setCountryCode,
};

export default connect(mapStateToProps, actions)(Start);
