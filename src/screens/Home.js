import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {DayCard, WeekCard} from '../components';
import {Icon} from 'react-native-elements';

import {fetchCurrent} from '../redux/actions/weatherAction';
import {connect} from 'react-redux';

import {DATA, Current} from '../constants/data';

navigator.geolocation = require('@react-native-community/geolocation');

import Geolocation from '@react-native-community/geolocation';
import getColorTheme from '../helpers/theme';
import {fonts} from '../constants';

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const Home = ({data, loading, fetchCurrent}) => {
  const color = getColorTheme();

  const [lat, setLat] = useState(28.535517);
  const [long, setLong] = useState(77.391029);

  useEffect(() => {
    if (Platform.OS == 'android') {
      requestCameraPermission();
    }
    Geolocation.getCurrentPosition(
      info => {
        setLat(info.coords.latitude);
        setLong(info.coords.longitude);
      },
      error => console.log(error, 'Geolocation error'),

      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    fetchCurrent(lat, long);
  }, []);

  const Header = () => {
    const weatherData = data != null ? data : Current;

    const {weather, name} = weatherData;
    return (
      <>
        <View style={styles.view}>
          <View>
            <Text style={[styles.text, {color: color.text}]}>{name}</Text>
            <Text style={{fontSize: 60, color: color.text}}>
              {weather[0].icon}
              {'\u00b0'}
            </Text>
            <View
              style={{
                backgroundColor: '#FFFDDD',
                justifyContent: 'center',
                padding: 10,
                alignItems: 'center',
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '600',
                  color: '#232323',
                }}>
                {weather[0].main}
              </Text>
            </View>
          </View>
          <View>
            <ImageBackground style={styles.image}>
              <Icon
                name="cloud"
                type="entypo"
                size={150}
                color="#517fa4"
                style={{marginLeft: -150, marginTop: 60}}
              />
            </ImageBackground>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="enviromento"
              type="antdesign"
              color="#6e7798"
              size={20}
            />
            <Text
              style={{
                marginLeft: 5,
                color: color.text,
                fontFamily: fonts.italic,
              }}>
              15%
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="infocirlceo"
              type="antdesign"
              color="#6e7798"
              size={20}
            />
            <Text
              style={{
                marginLeft: 5,
                color: color.text,
                fontFamily: fonts.italic,
              }}>
              0.533 mBar
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="speed" color="#6e7798" size={20} />
            <Text
              style={{
                marginLeft: 5,
                color: color.text,
                fontFamily: fonts.italic,
              }}>
              9 KM/h
            </Text>
          </View>
        </View>
        <View style={{marginTop: 30, marginLeft: 30}}>
          <Text style={{fontSize: 20, color: color.text}}>Today </Text>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={DATA}
          renderItem={({item}) => {
            return <DayCard item={item} />;
          }}
          keyExtractor={item => item.id}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DATA}
        ListHeaderComponent={
          loading ? <ActivityIndicator size="large" /> : <Header />
        }
        renderItem={({item}) => {
          return <WeekCard item={item} />;
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  image: {
    height: 250,
    width: 300,
    borderRadius: 150,
    backgroundColor: '#ff689d',
    marginRight: -140,
  },
  text: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 5,
    fontFamily: fonts.bold,
  },
});

const mapStateToProps = state => ({
  loading: state.weather.loading,
  data: state.weather.weather,
  error: state.weather.error,
});

export default connect(mapStateToProps, {fetchCurrent})(Home);
