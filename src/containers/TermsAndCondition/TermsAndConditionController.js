import React from 'react';
import PropTypes from 'prop-types';
import TermsAndConditionView from './TermsAndConditionView';
import {connect} from 'react-redux';
import {getTermsAndConditionRequest} from '../../actions/GeneralActions';

class TermsAndConditionController extends React.Component {
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
    const {getTermsAndConditionRequest} = this.props;

    this.setState({loading: true});
    getTermsAndConditionRequest((response) => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  };

  render() {
    const {loading} = this.state;
    return <TermsAndConditionView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  termsAndCondition: general.termsAndCondition,
});

const actions = {getTermsAndConditionRequest};

export default connect(mapStateToProps, actions)(TermsAndConditionController);
