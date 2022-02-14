import React from 'react';
import {
  View,
  Image as RnImage,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Text} from '../../components';
import styles from './SignHeaderStyles';
import {Images, Fonts, Colors, AppStyles} from '../../theme';
import {strings} from '../../constants';
import {Actions} from 'react-native-router-flux';
import util from '../../util';

export default function SignHeaderView(props) {
  const {
    title,
    subTitle,
    mainHeading,
    subHeading,
    drawerImg,
    leftBtnPress,
    showMask,
  } = props;
  return (
    <View>
      <ImageBackground
        source={Images.SignBg}
        style={styles.bgImage}
        imageStyle={styles.imageStyle}>
        <View style={styles.leftImgViewWrapper}>
          {drawerImg !== '' && (
            <TouchableOpacity
              onPress={leftBtnPress}
              style={styles.backBtnStyle}>
              <RnImage style={styles.drawerImgimgStyle} source={drawerImg} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.content}>
          {title !== '' && (
            <Text
              textAlign={util.rtlRightText()}
              size={Fonts.size.medium}
              color={Colors.text.secondary}
              type="medium">
              {title}
            </Text>
          )}
          {subTitle !== '' && (
            <Text
              textAlign={util.rtlRightText()}
              size={Fonts.size.xxLarge}
              color={Colors.text.secondary}
              type="semiBold">
              {subTitle}
            </Text>
          )}
        </View>
      </ImageBackground>
      <View style={styles.headingSec}>
        {mainHeading !== '' && (
          <Text
            textAlign={util.rtlRightText()}
            color={Colors.text.accent}
            size={Fonts.size.xxLarge}
            type="semiBold"
            textAlign="center">
            {mainHeading}
          </Text>
        )}
        {subHeading !== '' && (
          <Text
            style={AppStyles.mTop5}
            color={Colors.text.quaternary}
            size={Fonts.size.xxxSmall}
            textAlign="center">
            {subHeading}
          </Text>
        )}
        {showMask == true ? (
          <RnImage source={Images.Mask3} style={styles.mask1} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
