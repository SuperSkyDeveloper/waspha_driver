import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Platform,
} from 'react-native';
import _ from 'lodash';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import styles from './RichTextEditorStyles';
import {Text} from '../../components';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import util from '../../util';

export default class RichTextEditorView extends Component {
  async getHtml() {
    // Get the data here and call the interface to save the data
    //let html = await this.richText.current.getContentHtml();
    //console.log({html});
  }
  render() {
    const {
      refRichText,
      handleHeightChange,
      editorInitializedCallback,
      insertVideo,
      onPressAddImage,
      strikethrough,
      video,
      heightChange,
      onChangeText,
      text,
      iconTint,
      selectedIconTint,
      disabledIconTint,
      iconSize,
      placeholder,
      containerStyle,
      inputStyle,
      value,
      onChange,
      label,
      labelStyle,
      labelType,
      error,
      formErrorAlign,
      fontSize,
      textAlign,
      isLabel,
      heightInput,
      disabled,
      showToolbar,
    } = this.props;

    return (
      <ScrollView
        behavior={'height'}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {isLabel && value == '' && (
          <Text
            style={[labelStyle, AppStyles.width100]}
            type={labelType}
            textAlign={util.rtlRightText()}>
            {label}
          </Text>
        )}
        <View style={{marginLeft: 0}}>
          <RichEditor
            initialContentHTML={value}
            containerStyle={[styles.editor, containerStyle]}
            ref={refRichText}
            style={[styles.rich, inputStyle, {height: heightChange}]}
            placeholder={placeholder}
            initialContentHTML={value}
            disabled={disabled}
            onChange={(text) => {
              onChange(text);
            }}
            editorStyle={{
              contentCSSText: `font-size:${fontSize}px;color: black; height:${heightInput}px;  text-align: ${textAlign}; `,
            }}
            editorInitializedCallback={editorInitializedCallback}
            onHeightChange={handleHeightChange}
          />
        </View>
        {/* <HTMLView value={value} stylesheet={styleHtml} /> */}
        {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
          <Text
            type="medium"
            size={Fonts.size.xxSmall}
            color={Colors.red}
            textAlign={
              !_.isEmpty(formErrorAlign) ? formErrorAlign : util.rtlRightText()
            }
            style={[AppStyles.mTop5, AppStyles.mBottom5]}>
            {error}
          </Text>
        )}

        {showToolbar && (
          <View style={styles.mainToolbar}>
            <RichToolbar
              style={[styles.richBar]}
              editor={refRichText}
              iconTint={iconTint}
              selectedIconTint={selectedIconTint}
              disabledIconTint={disabledIconTint}
              onPressAddImage={onPressAddImage}
              iconSize={iconSize}
              actions={[
                actions.undo,
                actions.redo,
                actions.keyboard,
                actions.setBold,
                actions.setItalic,
                actions.heading1,
                actions.heading2,
                actions.insertBulletsList,
                actions.insertOrderedList,

                actions.setStrikethrough,
                actions.setUnderline,
                actions.removeFormat,

                actions.checkboxList,
              ]}
              // map icons for self made actions
              iconMap={{
                [actions.heading1]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
                ),
                [actions.heading2]: ({tintColor}) => (
                  <Text style={[styles.tib, {color: tintColor}]}>H2</Text>
                ),
              }}
            />
            <View
              style={{
                width: 50,
                position: 'absolute',
                left: -36,
                top: 18,
                paddingRight: 10,
                transform: [{rotate: '180deg'}],
              }}>
              <Image
                style={{
                  width: 30,
                  height: 15,
                  marginTop: 10,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
                source={Images.forwordBtn}
              />
            </View>
            <Image
              style={{
                width: 10,
                height: 15,
                marginTop: 10,
                alignSelf: 'center',
              }}
              source={Images.forwordBtn}
            />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styleHtml = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
    color: 'purple',
  },
  /*******************************/
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#F5FCFF',
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 50,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },
});
