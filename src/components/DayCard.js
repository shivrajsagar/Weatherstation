import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import getColorTheme from '../helpers/theme';

const DayCard = ({item}) => {
  const color = getColorTheme();

  const {temp, title, icon} = item;
  return (
    <View style={styles.container}>
      <Text style={{color: color.text}}>{title}</Text>
      <Icon name={icon} size={25} color="#ff8e8e" style={{marginTop: 5}} />
      <Text style={[styles.text, {color: color.text}]}>{temp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
  },
});

export default DayCard;
