import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Maps,
  CircularProgress,
  Button,
  RequestOrderCard,
  Loader,
} from '../../components';
import styles from './RequestOrderStyles';
import {Images, Metrics, Colors, Fonts, AppStyles} from '../../theme';
import {RIDER_TYPE, strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import EmptyStateText from '../../components/EmptyStateText';

export default class RequestOrderView extends React.PureComponent {
  render() {
    const {
      request,
      user,
      isLoading,
      handleSubmitButtonAction,
      acceptLoading,
      directionData,
      handleDeclineOrder,
    } = this.props;

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <RnImage
          style={this.props.getheaderImageFinalDimension()}
          source={Images.SignBg2}
        />
        {isLoading && <Loader loading={isLoading} />}
        {!isLoading && (
          <View style={styles.contentSec}>
            {_.isEmpty(request) ? (
              <EmptyStateText text={strings.REQUEST_NOT_FOUND} />
            ) : (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {user.type === RIDER_TYPE.WASPHA_EXPRESS && (
                    <TouchableOpacity
                      onPress={() => handleDeclineOrder()}
                      style={styles.declineTxt}>
                      <Text
                        type="bold"
                        color={Colors.text.zeka}
                        size={Fonts.size.xxSmall}>
                        {strings.DECLINE.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.smallImageStyle}>
                    <RnImage
                      source={util.riderImagePlaceholder(user && user.avatar)}
                      style={styles.driverImg}
                    />
                  </View>
                </View>
                <View>
                  <View style={{alignSelf: 'center', flex: 1}}>
                    <CircularProgress
                      duration={this.props.acceptTripDuration}
                      prefillAnimation={
                        100 -
                        ((this.props.acceptTripDuration * 60) /
                          (request.expiry_minutes * 60)) *
                          100
                      }
                    />
                    <View style={styles.circularMapStyle}>
                      <Maps
                        circularMap={true}
                        directionData={directionData}
                        initialRegion={{
                          latitude:
                            request.vendor && request.vendor.location.lat,
                          longitude:
                            request.vendor && request.vendor.location.lng,
                        }}
                      />
                    </View>
                  </View>
                  <Text type="medium" style={styles.remainingTimeStyle}>
                    {this.props.acceptTripDuration} {strings.MIN.toUpperCase()}{' '}
                    {strings.LEFT.toUpperCase()}
                  </Text>
                  <View style={styles.btnWrap}>
                    <Button
                      disabled={acceptLoading}
                      isLoading={acceptLoading}
                      textStyle={styles.btnTextStyle}
                      indicatorColor={Colors.text.secondary}
                      color={Colors.text.secondary}
                      style={[styles.btnStyle, styles.shadowStyle]}
                      onPress={handleSubmitButtonAction}>
                      {strings.ACCEPT.toUpperCase()}
                    </Button>
                  </View>
                  <View style={styles.requestOrderCard}>
                    <RequestOrderCard orderRequest={request} />
                  </View>
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}
