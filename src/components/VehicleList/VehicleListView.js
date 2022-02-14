import React from 'react';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {Text} from '..';
import styles from './VehicleListStyles';
import {Colors} from '../../theme';

export default function VehicleListView(props) {
  const {items, isHorizontal, activeIndex, togglePress, user} = props;

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={isHorizontal}
        data={items}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const active = index === activeIndex;
          // const active = false;

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => togglePress(item, index)}
              style={[
                styles.vehicleWrap,
                styles.shadowStyle,
                active && {backgroundColor: Colors.background.seca},
              ]}>
              <RnImage
                source={{uri: item.image.color}}
                style={styles.itemImage}
              />
              <Text type="semiBold" style={styles.vehicleSecText}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
