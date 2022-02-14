import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import BottomSheetView from './BottomSheetView';
import {strings} from '../../constants';

export default class BottomSheetController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {setSheet: PropTypes.func, selectOption: PropTypes.func};
  static defaultProps = {setSheet: () => {}, selectOption: () => {}};

  componentDidMount() {
    this.renderSheet();
  }

  renderSheet = () => {
    setTimeout(() => {
      this.toggleBottomSheet('open');
    }, 500);
  };

  // this toggles the bottom sheet
  toggleBottomSheet = (action) => {
    if (action === 'open' && !_.isNil(this.bottomSheetRef)) {
      this.bottomSheetRef.open();
    } else if (action === 'closeSheet') {
      this.props.setSheet();
    }
  };

  // this selects the option and passes to the callback function
  selectedOption = (option) => {
    const {setSheet, selectOption} = this.props;
    setSheet();
    selectOption(option);
  };

  render() {
    return (
      <BottomSheetView
        onConfirmPress={this.onConfirmPress}
        toggleBottomSheet={this.toggleBottomSheet}
        selectedOption={this.selectedOption}
        bottomSheetRef={(ref) => (this.bottomSheetRef = ref)}
        {...this.props}
      />
    );
  }
}
