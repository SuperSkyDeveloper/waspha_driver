import React from 'react';
import _ from 'lodash';
import {Share} from 'react-native';
import PropTypes from 'prop-types';
import RecieveAmountDetailsView from './RecieveAmountDetailsView';
import {connect} from 'react-redux';
import {strings} from '../../constants';

class RecieveAmountDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    showUser: PropTypes.bool,
  };
  static defaultProps = {showUser: false, request: {}, filterOrder: {}};

  // handle request
  handleShareBtn = async () => {
    let data = await this.getDataForSharing();
    // this function is for message which you want to share
    try {
      const result = await Share.share({
        title: 'App link',
        message: data,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // format and data share
  getDataForSharing = async () => {
    const {request, user} = this.props;
    let str = `
    ${strings.WASPHA}
    
`;

    request.orders &&
      request.orders[0].invoice.bill.map((item) => {
        return (str += ` -> ${item.label} : ${
          !item.label.includes('Rate')
            ? _.isNil(user.currency_code)
              ? 'ESP'
              : user.currency_code
            : ''
        } ${item.value.toFixed(2)} ${item.label.includes('Rate') ? '%' : ''}  

`);
      });

    str += `   

${request.orders[0].invoice.total.label}    
${
  _.isNil(user.currency_code) ? 'ESP' : user.currency_code
} ${request.orders[0].invoice.total.value.toFixed(2)}
      `;

    return str;
  };

  render() {
    return (
      <RecieveAmountDetailsView
        {...this.props}
        handleShareBtn={this.handleShareBtn}
      />
    );
  }
}

const mapStateToProps = ({user, requests}) => ({
  user: user.data,
  request: requests.requests[0],
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(RecieveAmountDetailsController);
