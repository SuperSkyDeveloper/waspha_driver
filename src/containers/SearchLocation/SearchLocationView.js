import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text} from '../../components';
import styles from './SearchLocationStyles';
import {AppStyles, Colors, Fonts} from './../../theme';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {PLACES_API_KEY} from '../../constants';
import util from '../../util';

export default class SearchLocationView extends React.PureComponent {
  render() {
    const {handleSearchLocation, addressRef} = this.props;

    return (
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          enablePoweredByContainer={false}
          placeholder={'Enter Location'}
          listViewDisplayed={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            handleSearchLocation(details);
          }}
          // style={AppStyles.inputStyle}
          styles={{
            textInputContainer: [
              styles.textInputContainer,
              !util.isPlatformAndroid() && {paddingHorizontal: 10},
            ],
            textInput: [
              styles.textInput,
              !util.isPlatformAndroid() && {borderWidth: 1, marginTop: 30},
            ],
            predefinedPlacesDescription: styles.row,
            listView: [
              styles.listView,
              !util.isPlatformAndroid() && {paddingHorizontal: 10},
            ],
            row: styles.row,
          }}
          query={{
            key: PLACES_API_KEY,
            language: 'en',
          }}
        />
      </View>
    );
  }
}
