import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {fonts} from '../constants';

import {useNavigation} from '@react-navigation/native';

const SearchCard = ({item}) => {
  const navigation = useNavigation();

  const {name, weather} = item;
  return (
    <View
      style={styles.container}
      onTouchStart={() => navigation.navigate('Detail', {item})}>
      <View style={{justifyContent: 'space-evenly'}}>
        <Text
          style={{fontFamily: fonts.regular, fontSize: 22, fontWeight: '600'}}>
          City-{name}
        </Text>
        <Text style={{fontFamily: fonts.regular, fontSize: 18}}>
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
          style={{width: 200, height: 100}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
});

export default SearchCard;
