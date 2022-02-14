import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Text, FaqItem, CustomNavbar, Loader} from '../../components';
import styles from './FAQSStyles';
import {AppStyles, Colors} from '../../theme';
import {strings} from '../../constants';

export default function FAQSView(props) {
  const {faqs, activeIndex, handleIndex, isLoading} = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={`${strings.FAQ.toUpperCase()}`}
        titleColor={Colors.text.secondary}
        hasBottomRadius={true}
      />
      {isLoading && <Loader loading={isLoading} />}
      {!isLoading && (
        <FlatList
          data={faqs}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            const active = activeIndex === item.id;
            return (
              <FaqItem item={item} toggler={handleIndex} active={active} />
            );
          }}
        />
      )}
    </View>
  );
}
