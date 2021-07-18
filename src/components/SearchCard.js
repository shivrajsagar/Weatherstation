import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {fonts} from '../constants';

import {useNavigation} from '@react-navigation/native';
import getColorTheme from '../helpers/theme';

const SearchCard = ({item}) => {
  const color = getColorTheme();

  const navigation = useNavigation();

  const {name, weather} = item;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color.background,
          borderColor: color.text,
          borderWidth: 0.5,
        },
      ]}
      onTouchStart={() => navigation.navigate('Detail', {item})}>
      <View style={{justifyContent: 'space-evenly'}}>
        <Text style={[styles.text, {color: color.text}]}>City-{name}</Text>
        <Text
          style={{fontFamily: fonts.regular, fontSize: 18, color: color.text}}>
          Description-{weather[0].description}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: `https://openweathermap.org/img/wn/10d@4x.png`}}
          style={{width: 150, height: 100}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 22,
    fontWeight: '600',
  },
});

export default SearchCard;
