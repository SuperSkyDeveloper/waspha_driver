import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import _ from 'lodash';
import {View, TouchableOpacity, Image as RnImage} from 'react-native';
import styles from './CircularProgressStyles';
import Text from '../Text';
import {Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';

export default function CircularProgressView(props) {
  const {prefillAnimation} = props;
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        ref={(ref) => {
          props.circularProgressRef(ref);
        }}
        size={300}
        width={15}
        fill={100}
        prefill={prefillAnimation}
        tintColor={Colors.text.secondary}
        backgroundColor={Colors.border.deca}
        backgroundWidth={0}
        onAnimationComplete={(anim) => {
          if (anim.finished) {
            if (Actions.currentScene === 'cancelOrder') {
              Actions.pop();
            }
            Actions.pop();
          }
        }}
      />
    </View>
  );
}
