import React from 'react';
import PropTypes from 'prop-types';
import RequestOrderCardView from './RequestOrderCardView';
import {connect} from 'react-redux';

class RequestOrderCardController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    orderRequest: PropTypes.object.isRequired,
  };
  static defaultProps = {};

  render() {
    return <RequestOrderCardView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(RequestOrderCardController);
