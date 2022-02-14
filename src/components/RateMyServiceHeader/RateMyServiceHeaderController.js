import React from 'react';
import PropTypes from 'prop-types';
import RateMyServiceHeaderView from './RateMyServiceHeaderView';
import {connect} from 'react-redux';

class RateMyServiceHeaderController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    setValue: PropTypes.func.isRequired,
  };
  static defaultProps = {
    setValue: () => {},
  };

  render() {
    return <RateMyServiceHeaderView {...this.props} />;
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(RateMyServiceHeaderController);
