import React from 'react';
import _ from 'lodash';
import {
  View,
  Image as RnImage,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  TextInput,
  Button,
  RemoveItemModal,
} from '../../components';
import styles from './CancelOrderStyles';
import {strings} from '../../constants';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {renderNameStringAndImageRender} from '../../helpers/multilingualHelper';

export default function CancelOrderView(props) {
  const {
    cancelOrderPoints,
    description,
    setValue,
    isLoading,
    cancellationReasons,
    showPenaltyModal,
    user,
    penaltyFee,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar
        title={strings.CANCEL_ORDER}
        titleColor={Colors.text.secondary}
        hasBottomRadius={true}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid
        scrollEnabled
        //keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentSec}>
          <View style={styles.questionStyleWrap}>
            <Text style={styles.questionStyle}>
              {strings.WHY_CANCEL_ORDER}?
            </Text>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.list}>
              <FlatList
                data={cancellationReasons}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => {
                  const isItemSelected = props.selectedItems.includes(item.id);
                  return (
                    <TouchableOpacity
                      style={styles.itemWrap}
                      onPress={() => props.handleItemSelect(item.id)}>
                      <View style={styles.itemParent}>
                        <View style={styles.radioBtn}>
                          <RnImage
                            source={
                              isItemSelected ? Images.TickBox : Images.Rectangle
                            }
                            style={styles.checkBox}
                          />
                        </View>
                        <View style={styles.contentTextWrap}>
                          <Text style={styles.contentTextStyle}>
                            {renderNameStringAndImageRender(item.value)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            multiline={true}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            label={strings.ADD_DESCRP}
            style={styles.addressInputWrap}
            value={description}
            onChangeText={(val) => {
              setValue({description: val});
            }}
          />
        </View>

        <View style={styles.submitBtnWrap}>
          <Button
            color={Colors.text.secondary}
            indicatorColor={Colors.text.secondary}
            isLoading={isLoading}
            disabled={isLoading}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
            onPress={props.handleSubmit}>
            {strings.SUBMIT.toUpperCase()}
          </Button>
        </View>
      </KeyboardAwareScrollView>
      {showPenaltyModal && (
        <RemoveItemModal
          title={`${strings.PENALTY_OF} ${
            _.isNil(user.currency_code) ? 'ESP' : user.currency_code
          } ${penaltyFee}`}
          showOneBtn={true}
          btnTwoText={strings.OK}
          isModalOpen={showPenaltyModal}
          applybackPressAndDrop={false}
          closeModal={setValue}
          modalType="showPenaltyModal"
        />
      )}
    </View>
  );
}
