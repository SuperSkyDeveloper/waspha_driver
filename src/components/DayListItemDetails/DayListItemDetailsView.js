import React from 'react';
import Dash from 'react-native-dash';
import {View, Image as RnImage, FlatList, TouchableOpacity} from 'react-native';
import {Text, DayListItemDetailsCard} from '..';
import styles from './DayListItemDetailsStyles';
import {Colors, AppStyles, Fonts, Images, Metrics} from '../../theme';
import {strings, DATE_TIME, TIME_FORMAT} from '../../constants';
import {ISOToFormat} from '../../helpers/generalHelper';
import util from '../../util';

export default function DayListItemDetailsView(props) {
  const {
    item,
    isHorizontal,
    isToggleAble,
    activeIndex,
    handleIndex,
    changeCardColor,
  } = props;

  return (
    <View style={[styles.container]}>
      <FlatList
        inverted={util.isRTL()}
        scrollEnabled={item.obj.length > 1}
        horizontal={isHorizontal}
        data={item.obj}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const active = index === activeIndex;
          return (
            <>
              <DayListItemDetailsCard
                item={item}
                isToggleAble={isToggleAble}
                handleIndex={handleIndex}
                changeCardColor={changeCardColor}
                active={active}
                index={index}
              />
            </>
          );
        }}
      />
    </View>
  );
}
