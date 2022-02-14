import React from 'react';
import _ from 'lodash';
import PhoneInput from 'react-native-phone-number-input';
import {View, Image as RnImage} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Text} from '..';
import {strings} from '../../constants';
import styles from './style';
import {AppStyles, Colors, Fonts} from '../../theme';
import util from '../../util';
import DataHandler from '../../services/DataHandler';

class PhoneInputView extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      translation: util.isRTL() ? 'ara' : 'common',
    };
  }

  static propTypes = {
    onNumberChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
  };
  static defaultProps = {
    label: strings.PHONE_NO,
  };

  componentDidUpdate(prevProps, prevState) {
    console.warn('appLanguage');

    if (prevProps.appLanguage !== this.props.appLanguage) {
      if (this.props.appLanguage === 'en') {
        console.warn('EN');
        this.setState({translation: 'common'});
      } else {
        console.warn('ARA');

        this.setState({translation: 'ara'});
      }
    }
  }

  handlePhoneNumber = (phoneNumber) => {
    let numberData = {
      country_code: `+${this.phoneRef.getCallingCode()}`,
      isNumberValid: this.phoneRef.isValidNumber(phoneNumber),
      number: phoneNumber,
      phone_number: `${this.phoneRef.getCallingCode()}${phoneNumber}`,
    };

    // callback function fire
    this.props.onNumberChange(numberData, this.phoneRef);
  };

  render() {
    const {error, value, label, phoneRef} = this.props;
    console.warn({TRASN: this.state.translation});
    return (
      <View style={styles.wrap}>
        {label !== '' && (
          <Text
            color={Colors.text.quaternary}
            style={[AppStyles.labelStyle, util.isRTL() && {textAlign: 'right'}]}
            type="medium">
            {strings.PHONE_NO}
          </Text>
        )}
        <View>
          <PhoneInput
            ref={(ref) => {
              this.phoneRef = ref;
            }}
            placeholder={'1234567'}
            containerStyle={styles.containerStyle}
            textContainerStyle={styles.textContainerStyle}
            flagButtonStyle={styles.flagButtonStyle}
            codeTextStyle={styles.codeTextStyle}
            textInputProps={styles.textInputProps}
            // translationCode={util.isRTL() ? 'ara' : 'common'}
            translationCode={this.state.translation}
            defaultCode={DataHandler.getStore().getState().general.countryCode}
            onChangeText={(phoneNumber) => {
              this.handlePhoneNumber(phoneNumber);
            }}
            // onChangeFormattedText={(phone) => {}}
          />
        </View>

        {!_.isEmpty(error) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.error.primary}
            style={[
              AppStyles.mTop5,
              AppStyles.mBottom5,
              util.isRTL() && {textAlign: 'right'},
            ]}>
            {error}
          </Text>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({general}) => {
  console.log('sjah');
  return {
    appLanguage: general.appLanguage,
  };
};

const actions = {};

export default connect(mapStateToProps, actions)(PhoneInputView);
