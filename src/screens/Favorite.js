import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {fonts} from '../constants';
import getColorTheme from '../helpers/theme';

const Favorite = () => {
  const color = getColorTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <Text
        style={{
          color: color.text,
          fontFamily: fonts.bold,
          fontSize: 25,
          textAlign: 'center',
        }}>
        Favorite
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Favorite;
