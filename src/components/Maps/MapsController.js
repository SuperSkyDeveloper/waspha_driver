import React from 'react';
import PropTypes from 'prop-types';
import MapsView from './MapsView';
import {connect} from 'react-redux';
import {Metrics} from '../../theme';

class MapsController extends React.Component {
  constructor() {
    super();
    this.state = {
      showEditModal: false,
    };
  }
  static propTypes = {
    coordinates: PropTypes.object,
    mapHeight: PropTypes.number,
    riders: PropTypes.array,
    selectedRider: PropTypes.object,
    pressSelectedRider: PropTypes.func,
    onMapDrag: PropTypes.func,
    circularMap: false,
    customer: PropTypes.object,
    vendor: PropTypes.object,
    isRiderOnline: PropTypes.bool,
    initialRegion: PropTypes.object,
    directionData: PropTypes.array,
    driverData: PropTypes.object,
    fromZoneOptions: PropTypes.bool,
    selectRegion: PropTypes.func,
    showRegions: PropTypes.bool,
  };
  static defaultProps = {
    coordinates: {},
    mapHeight: Metrics.screenHeight,
    riders: [],
    selectedRider: {},
    pressSelectedRider: () => {},
    onMapDrag: () => {},
    customer: {},
    vendor: {},
    isRiderOnline: false,
    initialRegion: {},
    directionData: [],
    driverData: {},
    fromZoneOptions: false,
    selectRegion: () => {},
    showRegions: false,
  };

  setPolygon = () => {
    this.polygonRef &&
      this.polygonRef.setNativeProps({
        fillColor: 'rgba(0,0,0,0.12)',
        strokeColor: 'rgba(0,0,0,0.3)',
      });

    // this.polygonRef.current.setNativeProps({fillColor: 'rgba(r,g,b,a)'});
  };

  setValue = (key) => {
    this.setState(key);
  };

  render() {
    return (
      <MapsView
        setPolygon={this.setPolygon}
        polygonRef={(ref) => {
          this.polygonRef = ref;
        }}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general, user}) => ({
  allVehicles: general.appSetting.delivery_vehicles,
  fixedZoneRegions: user.data.fixed_zones,
  user: user.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(MapsController);
