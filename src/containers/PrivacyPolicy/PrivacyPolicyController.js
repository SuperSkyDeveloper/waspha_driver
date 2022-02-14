import React from 'react';
import PropTypes from 'prop-types';
import PrivacyPolicyView from './PrivacyPolicyView';
import {connect} from 'react-redux';
import {getPrivacyPolicyRequest} from '../../actions/GeneralActions';

class PrivacyPolicyController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getPrivacyPolicyRequest} = this.props;

    this.setState({loading: true});
    getPrivacyPolicyRequest((response) => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <PrivacyPolicyView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  privacyPolicy: general.privacyPolicy,
});

const actions = {getPrivacyPolicyRequest};

export default connect(mapStateToProps, actions)(PrivacyPolicyController);
