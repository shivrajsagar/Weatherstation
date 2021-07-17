import React from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';

import {fonts} from '../constants';
import {Loading} from '../components';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.view}>
          <View>
            <Text style={styles.text}>San Francisco</Text>
            <Text style={{fontSize: 60}}>18 {'\u00b0'}</Text>
            <View
              style={{backgroundColor: '#f2efec', justifyContent: 'center'}}>
              <Text>Cloudy</Text>
            </View>
          </View>
          <View>
            <Icon name="cloud" type="entypo" size={40} color="#517fa4" />
            <Image style={styles.image} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffffb',
  },
  view: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: 280,
    width: 300,
    borderRadius: 150,
    backgroundColor: '#ff689d',
    marginRight: -140,
    marginTop: -30,
  },
  iconview: {},
  text: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 5,
  },
});

export default Home;
