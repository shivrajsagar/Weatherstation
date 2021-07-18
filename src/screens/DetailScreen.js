import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {Icon} from 'react-native-elements';

const DetailScreen = ({route}) => {
  const {item} = route.params;

  const {
    coord,
    weather,
    base,
    main,
    visibility,
    wind,
    clouds,
    dt,
    sys,
    timezone,
    name,
  } = item;

  return (
    <SafeAreaView>
      <View>
        <Icon />

        <Text></Text>
      </View>
      <Text></Text>
      <Image
        source={{uri: `https://openweathermap.org/img/wn/10d@4x.png`}}
        style={{width: 200, height: 100}}
      />
      <View>
        <Text>{name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
