import React from 'react';
import PropTypes from 'prop-types';
import MapPointerView from './MapPointerView';
import {connect} from 'react-redux';

class MapPointerController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {image: PropTypes.number, circularMap: PropTypes.bool};
  static defaultProps = {image: 0, circularMap: false};

  render() {
    return <MapPointerView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(MapPointerController);
