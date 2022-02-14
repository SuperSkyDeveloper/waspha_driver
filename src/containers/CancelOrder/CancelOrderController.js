import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CancelOrderView from './CancelOrderView';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {strings} from '../../constants';
import {
  cancelOrderRequest,
  changeRideStatusSuccess,
} from '../../actions/RequestsActions';
import {alertMessage} from '../../actions/GeneralActions';
import {BackHandler} from 'react-native';

class CancelOrderController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      description: '',
      isLoading: false,
      showPenaltyModal: props.isPenalty,
    };
  }
  static propTypes = {
    cancelOrderPoints: PropTypes.array,
    requestId: PropTypes.number.isRequired,
    isPenalty: PropTypes.bool,
    penaltyFee: PropTypes.number,
  };
  static defaultProps = {
    isPenalty: false,
    penaltyFee: 0,
  };

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick = () => {
    Actions.pop();
    return true;
  };

  setValue = (key) => {
    this.setState(key);
  };

  handleItemSelect = (key) => {
    let selectedItem = _.xor([key], this.state.selectedItems);
    this.setState({selectedItems: selectedItem});
  };

  validation = () => {
    const {description, selectedItems} = this.state;
    const {alertMessage} = this.props;
    if (_.isEmpty(description) && _.isEmpty(selectedItems)) {
      // util.topAlert(strings.PLEASE_GIVE_A_REASON);
      alertMessage(strings.PLEASE_GIVE_A_REASON);
      return false;
    }
    return true;
  };

  // handle trip status request
  handleChangeRideStatus = () => {
    // start loading

    this.props.changeRideStatusSuccess('cancelled');
  };

  handleSubmit = () => {
    if (this.validation()) {
      // start loading
      this.setState({
        isLoading: true,
      });
      const {selectedItems, description} = this.state;
      const {alertMessage} = this.props;
      let payload = {
        request_id: this.props.requestId,
        reasons: selectedItems,
        description: description,
      };

      if (_.isEmpty(description)) {
        delete payload['description'];
      }

      this.props.cancelOrderRequest(payload, (status) => {
        // stop loading
        this.setState({
          isLoading: false,
        });
        if (status) {
          this.handleChangeRideStatus();
          Actions.reset('drawerMenu');
        } else {
          alertMessage(strings.PLEASE_GIVE_A_REASON);
        }
      });
    }
  };

  render() {
    const {description, selectedItems, isLoading, showPenaltyModal} =
      this.state;
    return (
      <CancelOrderView
        handleSubmit={this.handleSubmit}
        handleItemSelect={this.handleItemSelect}
        setValue={(data) => this.setValue(data)}
        description={description}
        showPenaltyModal={showPenaltyModal}
        selectedItems={selectedItems}
        isLoading={isLoading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user, general}) => ({
  cancellationReasons: general.appSetting.cancellation_reasons,
  user: user.data,
  penaltyFee: general.appSetting.penalty_fee,
});

const actions = {cancelOrderRequest, alertMessage, changeRideStatusSuccess};

export default connect(mapStateToProps, actions)(CancelOrderController);
