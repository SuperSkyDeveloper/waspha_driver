import React from 'react';
import PropTypes from 'prop-types';
import DriverTripsDetailSecView from './DriverTripsDetailSecView';
import {connect} from 'react-redux';

class DriverTripsDetailSecController extends React.Component {
  constructor() {
    super();
    this.state = {
      totalTrips: 0,
      totalEarning: 0,
    };
  }
  static propTypes = {
    items: PropTypes.array,
  };
  static defaultProps = {items: []};

  componentDidMount() {
    this.getTripAndEarning();
  }

  getTripAndEarning = () => {
    let totalTrips = 0;
    let totalEarning = 0;
    const {items} = this.props;
    items.map((item) => {
      totalTrips = totalTrips + item.count;
      totalEarning = totalEarning + item.earning;
    });

    this.setState({totalTrips, totalEarning});
  };

  render() {
    const {totalTrips, totalEarning} = this.state;
    return (
      <DriverTripsDetailSecView
        totalTrips={totalTrips}
        totalEarning={totalEarning}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(DriverTripsDetailSecController);
