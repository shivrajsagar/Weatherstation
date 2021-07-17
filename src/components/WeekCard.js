import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const WeekCard = ({item}) => {
  const {day, tempmax, tempmin, icon} = item;

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <Text style={{color: '#000'}}>{day}</Text>
      </View>
      <View style={styles.grid}>
        <Icon name={icon} size={25} color="#ff8e8e" style={{}} />
      </View>
      <View style={styles.grid}>
        <Text style={{textAlign: 'center'}}>
          {tempmax} {'\u00b0'} {tempmin} {'\u00b0'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grid: {
    flex: 1,
  },
});

export default WeekCard;
