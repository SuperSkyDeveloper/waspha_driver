import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {Text, CustomNavbar, HTMLView, Loader} from '../../components';
import styles from './RatingsListStyles';
import {Colors, Images, AppStyles, Metrics, Fonts} from '../../theme';
import {strings} from '../../constants';
import util from '../../util';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function RatingsListView(props) {
  const {ratingsList, loading} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.RATINGS_LIST}
        titleColor={Colors.text.secondary}
        hasBottomRadius={true}
      />
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <View style={AppStyles.marginHorizontalsmall}>
          <FlatList
            data={ratingsList}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onRefresh={() => props.initial()}
            refreshing={loading}
            renderItem={({item}) => {
              return (
                <View style={[AppStyles.flex]}>
                  <View
                    style={[
                      styles.ratingWrap,
                      util.isRTL() && styles.ratingWrapRtl,
                    ]}>
                    <RnImage
                      source={Images.StarIcon}
                      style={styles.starIconStyle}
                    />
                    <Text size={Fonts.size.xxxSmall}>{item.rating}</Text>
                  </View>
                  <View
                    style={[
                      AppStyles.flexRow,
                      util.isRTL() && AppStyles.rowReverse,
                    ]}>
                    <RnImage
                      source={
                        _.isNil(item.reviewed_by.image)
                          ? Images.ProfilePlaceholder
                          : {uri: item.reviewed_by.image}
                      }
                      style={[
                        styles.reviewerImg,
                        util.isRTL() && AppStyles.mLeft10,
                      ]}
                      resizeMode="cover"
                    />

                    <View
                      style={[
                        {maxWidth: '50%'},
                        {top: _.isNil(item.review) ? 8 : 2},
                      ]}>
                      <HTMLView
                        htmlContent={renderNameStringAndImageRender(
                          item.reviewed_by.name,
                        )}
                        size={Fonts.size.medium}
                        color={Colors.grey11}
                        textAlign="right"
                        type="semiBold"
                      />
                      {/* <Text type="semiBold" color={Colors.grey11}>
                        {renderNameStringAndImageRender(item.reviewed_by.name)}
                      </Text> */}
                      {!_.isNil(item.review) && (
                        <HTMLView
                          htmlContent={item.review ? item.review : ''}
                          size={Fonts.size.xxxSmall}
                          color={Colors.text.penta}
                          textAlign={util.isRTL() ? 'right' : 'left'}
                        />
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: Metrics.smallMargin,
                      borderBottomWidth: 1,
                      opacity: 0.1,
                    }}
                  />
                </View>
              );
            }}
            ListEmptyComponent={
              <View style={styles.noReviewsWrap}>
                <Text
                  size={Fonts.size.xLarge}
                  type="semiBold"
                  color={Colors.text.hexa}>
                  {strings.NO_REVIEWS_AVAILABLE}
                </Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
