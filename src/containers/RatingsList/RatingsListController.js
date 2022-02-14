import React from 'react';
import PropTypes from 'prop-types';
import RatingsListiew from './RatingsListView';
import {connect} from 'react-redux';
import {getRatingsRequest} from '../../actions/GeneralActions';

class RatingsListController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {ratingsList: PropTypes.array};
  static defaultProps = {
    ratingsList: [],
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getRatingsRequest} = this.props;
    this.setState({loading: true});

    getRatingsRequest((response) => {
      this.setState({loading: false});

      if (response) {
      }
    });
  };

  render() {
    const {loading} = this.state;
    return (
      <RatingsListiew
        loading={loading}
        initial={this.initial}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  ratingsList: general.ratings,
});

const actions = {getRatingsRequest};

export default connect(mapStateToProps, actions)(RatingsListController);
