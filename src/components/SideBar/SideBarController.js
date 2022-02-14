import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SideBarView from './SideBarView';
import {
  changeOnlineStatusRequest,
  userSignOutRequest,
} from '../../actions/UserActions';
import {changeLanguageRequest} from '../../actions/GeneralActions';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {stopTracking} from '../../helpers/trackingHelper';
import {saveZoneRequest} from '../../actions/ZoneActions';

class SideBarController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      onlineStatusLoading: false,
      language: '',
      isLoading: false,
      isLangModalVisible: false,
      logoutLoader: false,
      isChangeRadiusModalVisible: false,
      error: '',
      freeZoneRadius: _.isNil(props.user.free_zone_radius)
        ? 0
        : _.toString(props.user.free_zone_radius),
    };
  }
  static propTypes = {};
  static defaultProps = {};

  setValue = (key) => {
    this.setState(key);
  };

  handleIndex = (index) => {
    console.log({index});
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  onChangeText = (value) => {
    let val = _.toNumber(value);

    if (_.isNaN(val)) {
      this.setState({
        error: 'Value not correct',
      });
    } else {
      this.setState({
        freeZoneRadius: value,
      });
    }
  };

  validation() {
    const {freeZoneRadius} = this.state;

    if (_.isEmpty(freeZoneRadius) || freeZoneRadius == 0) {
      this.setState({
        error: 'Value not correct',
      });
      return false;
    }
    return true;
  }

  assignRadiusToFreeZone = () => {
    const {saveZoneRequest, alertMessage} = this.props;
    const {freeZoneRadius} = this.state;
    const isValidData = this.validation();

    if (isValidData) {
      const payload = {
        free_zone_radius: _.toNumber(freeZoneRadius),
      };

      saveZoneRequest(payload, (status) => {
        if (status) {
          this.setState({isChangeRadiusModalVisible: false});
          alertMessage('Region Selected Successfully');
        }
      });
      this.setState({
        error: '',
      });
    }
  };

  //sets the online/offline status of rider
  setAvailabilityStatus = () => {
    // start loading
    this.setState({
      onlineStatusLoading: true,
    });

    const payload = {
      is_online: !this.props.riderOnlineStatus,
    };

    this.props.changeOnlineStatusRequest(payload, () => {
      // stop loading
      this.setState({
        onlineStatusLoading: false,
      });
    });
  };

  // handle change language
  handleChangeLanguage = (lang) => {
    this.setState({
      isLoading: true,
    });

    const payload = {
      language: lang,
    };
    this.props.changeLanguageRequest(payload, (response) => {
      if (response) {
        util.updateLocale(this.props.appLanguage);
        this.setState({isLoading: false, isLangModalVisible: false});
        Actions.reset('drawerMenu');
      } else {
        this.setState({isLoading: false});
      }
    });
  };

  // handle Visible language modal
  handleLanguageModal = () => {
    this.setState({
      isLangModalVisible: true,
    });
  };

  handleChangeRadiusModal = () => {
    this.setState({
      isChangeRadiusModalVisible: true,
    });
  };

  // handle Logout
  handleLogout = () => {
    this.props.changeOnlineStatusRequest({is_online: false}, () => {});
    Actions.reset('login');

    this.props.userSignOutRequest((status) => {
      stopTracking();
    });
  };

  render() {
    const {
      onlineStatusLoading,
      language,
      isLoading,
      isLangModalVisible,
      logoutLoader,
      isChangeRadiusModalVisible,
      freeZoneRadius,
      error,
    } = this.state;
    return (
      <SideBarView
        logoutLoader={logoutLoader}
        handleLogout={this.handleLogout}
        isLangModalVisible={isLangModalVisible}
        isChangeRadiusModalVisible={isChangeRadiusModalVisible}
        language={language}
        isLoading={isLoading}
        freeZoneRadius={freeZoneRadius}
        onChangeText={this.onChangeText}
        handleChangeRadiusModal={this.handleChangeRadiusModal}
        handleLanguageModal={this.handleLanguageModal}
        handleChangeLanguage={this.handleChangeLanguage}
        onlineStatusLoading={onlineStatusLoading}
        navigate={this.navigate}
        setValue={this.setValue}
        activeIndex={this.state.activeIndex}
        handleIndex={this.handleIndex}
        setAvailabilityStatus={this.setAvailabilityStatus}
        assignRadiusToFreeZone={this.assignRadiusToFreeZone}
        error={error}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  riderOnlineStatus: user.data.is_online,
  appLanguage: general.appLanguage,

  user: user.data,
});

const actions = {
  changeOnlineStatusRequest,
  changeLanguageRequest,
  userSignOutRequest,
  saveZoneRequest,
};
export default connect(mapStateToProps, actions)(SideBarController);
