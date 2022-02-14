import React from 'react';
import PropTypes from 'prop-types';
import ZoneOptionsView from './ZoneOptionsView';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {saveZoneRequest} from '../../actions/ZoneActions';
import {updateUserData} from '../../actions/UserActions';
import {Keyboard} from 'react-native';

class ZoneOptionsController extends React.Component {
  constructor(props) {
    function preSelectedZone() {
      if (
        _.isNil(props.user.free_zone_radius) &&
        _.isNil(props.user.fixed_zone_id)
      ) {
        return null;
      } else if (!_.isNil(props.user.fixed_zone_id)) {
        return 1;
      } else {
        return 2;
      }
    }
    super(props);
    this.state = {
      selectedZoneId: preSelectedZone(),
      freeZoneKm: _.isNil(props.user.free_zone_radius)
        ? ''
        : _.toString(props.user.free_zone_radius),
      freeZoneKmError: '',
      isLoading: false,
      canProceedFurther: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    if (!_.isNil(this.state.selectedZoneId)) {
      this.setState({canProceedFurther: true});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedZoneId !== this.state.selectedZoneId) {
      if (this.state.selectedZoneId === 1) {
        this.setState({canProceedFurther: true});
      }

      if (this.state.selectedZoneId === 2) {
        this.validateFreeZoneKm();
      }
    }

    if (prevState.freeZoneKm !== this.state.freeZoneKm) {
      this.validateFreeZoneKm();
    }
  }

  validateFreeZoneKm = () => {
    if (this.state.freeZoneKm === '') {
      this.setState({canProceedFurther: false, freeZoneKmError: ''});
    }

    if (this.state.freeZoneKm !== 0 && this.state.freeZoneKm !== '') {
      this.setState({canProceedFurther: true, freeZoneKmError: ''});
    }
  };

  selectZone = (id) => {
    this.setState({selectedZoneId: id});
  };

  validation = () => {
    let isValid = true;
    const {selectedZoneId, freeZoneKm} = this.state;
    console.log({freeZoneKm});
    const freeZoneKmInNumber = _.toNumber(freeZoneKm);
    if (selectedZoneId === 2) {
      if (freeZoneKmInNumber === 0) {
        this.setState({freeZoneKmError: 'Radius cannot be 0'});
        isValid = false;
      }
      if (freeZoneKmInNumber === '') {
        this.setState({freeZoneKmError: 'Radius cannot be empty'});
        isValid = false;
      }

      if (!_.isFinite(freeZoneKmInNumber)) {
        this.setState({freeZoneKmError: 'Wrong radius'});
        isValid = false;
      }
    }
    return isValid;
  };

  onSubmit = () => {
    const {selectedZoneId} = this.state;
    this.setState({freeZoneKmError: ''});
    Keyboard.dismiss();
    if (this.validation()) {
      if (selectedZoneId == 1) {
        Actions.reset('drawerMenu');
        Actions.refresh({fromZoneOptions: true});
      } else {
        this.selectRegion();
      }
    }
  };

  selectRegion = () => {
    const {saveZoneRequest, alertMessage, updateUserData} = this.props;
    const {freeZoneKm} = this.state;
    const payload = {
      free_zone_radius: _.toNumber(freeZoneKm),
    };

    updateUserData({fixed_zone_id: null});
    saveZoneRequest(payload, (status) => {
      if (status) {
        Actions.reset('drawerMenu');
        alertMessage('Radius fixed Successfully');
      }
    });
  };

  setValue = (key) => {
    console.warn(key);

    this.setState(key);
  };
  onChangeText = (value) => {
    let val = _.toNumber(value);

    if (_.isNaN(val)) {
      this.setState({
        error: 'Value not correct',
      });
      console.log('wrong');
    } else {
      this.setState({
        freeZoneKm: value,
      });
    }
  };
  checkValueInFloat() {
    const value = this.state.freeZoneKm;
    console.log({value});
    var er = /^-?[0-9]+$/;

    return er.test(value);
  }
  render() {
    const {
      selectedZoneId,
      freeZoneKm,
      freeZoneKmError,
      isLoading,
      canProceedFurther,
    } = this.state;
    return (
      <ZoneOptionsView
        selectedZoneId={selectedZoneId}
        freeZoneKm={freeZoneKm}
        freeZoneKmError={freeZoneKmError}
        isLoading={isLoading}
        canProceedFurther={canProceedFurther}
        onSubmit={this.onSubmit}
        setValue={this.setValue}
        selectZone={this.selectZone}
        onChangeText={this.onChangeText}
        checkValueInFloat={this.checkValueInFloat}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {
  saveZoneRequest,
  updateUserData,
};

export default connect(mapStateToProps, actions)(ZoneOptionsController);
