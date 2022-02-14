import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  Text,
  NotificationListItem,
  DashboardHeader,
  Loader,
} from '../../components';
import styles from './NotificationStyles';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';
import {strings} from '../../constants';
export default function NotificationView(props) {
  const {notifications, loading, initial} = props;
  return (
    <View style={styles.container}>
      <DashboardHeader />
      <View style={[AppStyles.flex]}>
        <Loader loading={loading} />
        {!loading && (
          <FlatList
            data={notifications}
            showsVerticalScrollIndicator={false}
            onRefresh={() => initial()}
            refreshing={loading}
            renderItem={({item, index}) => {
              return <NotificationListItem item={item} />;
            }}
            ListEmptyComponent={
              <View
                style={{
                  alignSelf: 'center',
                  marginTop: Metrics.screenHeight / 4,
                }}>
                <Text
                  color={Colors.text.hexa}
                  type="semiBold"
                  size={Fonts.size.xLarge}>
                  {strings.NO_NOTIFICATIONS_FOUND}
                </Text>
              </View>
            }
          />
        )}
      </View>
      <View></View>
    </View>
  );
}
