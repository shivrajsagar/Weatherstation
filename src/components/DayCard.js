import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

const DayCard = ({item}) => {
  const {temp, title, icon} = item;
  return (
    <View style={styles.container}>
      <Text style={{color: '#a7adbe'}}>{title}</Text>
      <Icon name={icon} size={25} color="#ff8e8e" style={{marginTop: 5}} />
      <Text style={{textAlign: 'center', marginTop: 5, color: '#a7adbe'}}>
        {temp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default DayCard;
