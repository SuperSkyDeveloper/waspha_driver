import React from 'react';
import PropTypes from 'prop-types';
import AcceptOrderInfoCardView from './AcceptOrderInfoCardView';
import {connect} from 'react-redux';
import {Metrics} from '../../theme';

class AcceptOrderInfoCardController extends React.Component {
  constructor() {
    super();
    this.state = {
      openCard: true,
    };
  }
  static propTypes = {
    request: PropTypes.object.isRequired,
    filterOrder: PropTypes.object,
    user: PropTypes.object,
    vendor: PropTypes.object,
    isCloseBox: PropTypes.bool,
  };
  static defaultProps = {
    user: {},
    vendor: {},
    isCloseBox: false,
    filterOrder: {},
  };

  toggleCard = () => {
    this.setState({openCard: !this.state.openCard});
  };

  render() {
    const {openCard} = this.state;
    return (
      <AcceptOrderInfoCardView
        openCard={openCard}
        toggleCard={this.toggleCard}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(mapStateToProps, actions)(AcceptOrderInfoCardController);
