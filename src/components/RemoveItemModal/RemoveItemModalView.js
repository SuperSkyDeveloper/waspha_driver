import React from 'react';
import {View, Image as RnImage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import styles from './RemoveItemModalStyles';
import {Colors, AppStyles, Metrics} from '../../theme';

export default function RemoveItemModalView(props) {
  const {
    isModalOpen,
    title,
    btnOneText,
    btnTwoText,
    btnOneFunc,
    btnTwoFunc,
    closeModal,
    modalType,
    showOneBtn,
    applybackPressAndDrop,
  } = props;
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalOpen}
        style={styles.modal}
        onBackButtonPress={() => {
          if (applybackPressAndDrop) {
            closeModal({[modalType]: false});
          }
        }}
        onBackdropPress={() => {
          if (applybackPressAndDrop) {
            closeModal({[modalType]: false});
          }
        }}
        backdropOpacity={0.8}
        backdropColor={Colors.background.primary}
        style={styles.imageSelectorWrapper}>
        <LinearGradient
          start={{x: 0.0, y: 0.8}}
          end={{x: 0.0, y: -0.3}}
          colors={Colors.gradient.primary}
          style={styles.linearWrap}>
          <View style={styles.titleWrap}>
            <Text type="semiBold" style={styles.titleStyle}>
              {title}
            </Text>
          </View>
          <View style={styles.btnSec}>
            {!showOneBtn && (
              <View style={styles.btnWrap}>
                <Button
                  style={styles.btn1Style}
                  textStyle={styles.btn1Text}
                  type="semiBold"
                  onPress={() => {
                    closeModal({[modalType]: false});
                    btnOneFunc();
                  }}>
                  {btnOneText}
                </Button>
              </View>
            )}
            <View style={styles.btnWrap}>
              <Button
                style={styles.btn2Style}
                textStyle={styles.btn2Text}
                type="semiBold"
                onPress={() => closeModal({[modalType]: false})}>
                {btnTwoText}
              </Button>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
}
