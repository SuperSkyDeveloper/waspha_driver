import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import EarningDetailsView from './EarningDetailsView';
import {connect} from 'react-redux';
import {DATE_FORMAT3, earningFilter, strings} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';
import {earningsRequest} from '../../actions/TripsActions';
import util from '../../util';

class EarningDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {
      dayWiseTrips: [],
      activeIndex: null,
      isLoading: true,
      filterValue: util.EARNING_FILTER()[0].label,
      filterValueTitle: util.EARNING_FILTER()[0].title,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    this.initial();
  }

  // initial req
  initial = () => {
    // start loader
    this.setState({
      isLoading: true,
    });
    const payload = {filter: this.state.filterValue};
    this.props.earningsRequest(payload, () => {
      this.setState({
        isLoading: false,
      });
      this.getDayWiseOrders();
    });
  };

  getDayWiseOrders = () => {
    const {trips} = this.props;

    let data = [];
    let sortedTrips = _.sortBy(trips, [
      function (o) {
        return o.date;
      },
    ]);
    sortedTrips.map((trip) => {
      if (
        data.length > 0 &&
        data[data.length - 1].date === ISOToFormat(trip.date, DATE_FORMAT3)
      ) {
        this.getOrder(data, trip);
      } else {
        let obj = {
          title: trip.date,
          day: ISOToFormat(trip.date, 'dddd'),
          date: ISOToFormat(trip.date, DATE_FORMAT3),

          obj: [],
          count: 0,
          earning: 0,
        };
        data.push(obj);
        this.getOrder(data, trip);
      }
    });

    let sortedData = _.orderBy(data, ['title'], ['desc']);

    console.log({sortedData});
    this.setState({dayWiseTrips: sortedData});
  };

  getOrder = (data, trip) => {
    const {orders} = this.props;
    orders.map((order) => {
      if (order.trip_id === trip.id) {
        let orderWithDeliveryDate = _.cloneDeep(order);
        orderWithDeliveryDate['deliveryDate'] = trip.date;
        data[data.length - 1].obj.push(orderWithDeliveryDate);
        data[data.length - 1].earning =
          data[data.length - 1].earning + order.price;
      }
    });
    data[data.length - 1].count = data[data.length - 1].count + 1;
  };

  handleIndex = (index) => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };

  // handle filter data
  handleFilterPress = (val) => {
    this.setState({filterValue: val.label, filterValueTitle: val.title}, () => {
      this.initial();
      return this.refRBSheet.close();
    });
  };

  handleEarningFilterOpt = (state = '') => {
    if (state === 'show' && !_.isNil(this.refRBSheet)) {
      return this.refRBSheet.open();
    } else if (!_.isNil(this.refRBSheet)) {
      return this.refRBSheet.close();
    }
  };

  render() {
    const {
      dayWiseTrips,
      activeIndex,
      filterValue,
      isLoading,
      filterValueTitle,
    } = this.state;

    return (
      <EarningDetailsView
        {...this.props}
        refRBSheet={(ref) => {
          this.refRBSheet = ref;
        }}
        handleFilter={this.handleFilter}
        dayWiseTrips={dayWiseTrips}
        filterValue={filterValue}
        filterValueTitle={filterValueTitle}
        activeIndex={activeIndex}
        handleIndex={this.handleIndex}
        isLoading={isLoading}
        handleFilterPress={this.handleFilterPress}
        handleEarningFilterOpt={this.handleEarningFilterOpt}
      />
    );
  }
}

const mapStateToProps = ({user, trips, orders}) => ({
  user: user.data,
  trips: trips.trips,
  orders: orders.orders,
  totalEarnings: orders.totalEarnings,
  totalPenalty: orders.totalPenalty,
});

const actions = {
  earningsRequest,
};

export default connect(mapStateToProps, actions)(EarningDetailsController);
