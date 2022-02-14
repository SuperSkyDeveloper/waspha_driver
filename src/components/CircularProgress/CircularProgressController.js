import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressView from './CircularProgressView';
import {connect} from 'react-redux';
import {Metrics} from '../../theme';
import {Easing} from 'react-native';

class CircularProgressController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    duration: PropTypes.number,
    prefillAnimation: PropTypes.number,
  };

  componentDidMount() {
    this.circularProgressRef.animate(
      100,
      this.props.duration * 60000,
      Easing.quad,
    );
  }

  render() {
    return (
      <CircularProgressView
        circularProgressRef={(ref) => {
          this.circularProgressRef = ref;
        }}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(CircularProgressController);
