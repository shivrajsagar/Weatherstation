import React, {useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';

import {fonts} from '../constants';
import {Loading} from '../components';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import {fetchCurrent} from '../redux/actions/weatherAction';
import {connect} from 'react-redux';

const DATA = [
  {
    id: '1',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Sunday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '2',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Monday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '3',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Tuesday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '4',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Wednesday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '5',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Thursday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '6',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Friday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '7',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Saturday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '8',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Sunday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '9',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Monday',
    tempmin: 20,
    tempmax: 18,
  },
  {
    id: '10',
    title: '10 AM',
    icon: 'cloud',
    temp: 20,
    day: 'Tuesday',
    tempmin: 20,
    tempmax: 18,
  },
];

const Item = ({title, icon, temp}) => {
  return (
    <View style={styles.item}>
      <Text style={{color: '#a7adbe'}}>{title}</Text>
      <Icon name={icon} size={25} color="#ff8e8e" style={{marginTop: 5}} />
      <Text style={{textAlign: 'center', marginTop: 5, color: '#a7adbe'}}>
        {temp}
      </Text>
    </View>
  );
};
const ViewItem = ({day, icon, tempmax, tempmin}) => {
  return (
    <View style={styles.itemview}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{color: '#000'}}>{day}</Text>
        <Icon name={icon} size={25} color="#ff8e8e" style={{}} />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>
          {tempmax} {'\u00b0'}
        </Text>
        <Text>
          {tempmin} {'\u00b0'}
        </Text>
      </View>
    </View>
  );
};

const Home = ({loading, error, data, fetchCurrent}) => {
  useEffect(() => {
    fetchCurrent();
  }, []);

  const {weather} = data;
  const renderItem = ({item}) => (
    <Item title={item.title} icon={item.icon} temp={item.temp} />
  );
  const VerticalrenderItem = ({item}) => (
    <ViewItem
      day={item.day}
      icon={item.icon}
      tempmax={item.tempmax}
      tempmin={item.tempmin}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.view}>
          <View>
            <Text style={styles.text}>San Francisco</Text>
            <Text style={{fontSize: 60}}>
              {weather[0].icon}
              {'\u00b0'}
            </Text>

            <Text
              style={{
                backgroundColor: '#FFFDDD',
                justifyContent: 'center',
                margin: 10,
                fontSize: 30,
                fontWeight: '600',
                color: '#232323',
              }}>
              Cloudy
            </Text>
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
            <Text style={{marginLeft: 5, color: '#6e7798'}}>13%</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="infocirlceo"
              type="antdesign"
              color="#6e7798"
              size={20}
            />
            <Text style={{marginLeft: 5, color: '#6e7798'}}>0.533 mBar</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="speed" color="#6e7798" size={20} />
            <Text style={{marginLeft: 5, color: '#6e7798'}}>9 KM/h</Text>
          </View>
        </View>
        <View style={{marginTop: 30, marginLeft: 30}}>
          <Text style={{fontSize: 20, color: '#342432'}}>Today </Text>
        </View>
        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={DATA}
            renderItem={VerticalrenderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
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
  iconview: {},
  text: {
    fontSize: 25,
    marginTop: 20,
    marginLeft: 5,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemview: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
});

const mapStateToProps = state => ({
  loading: state.weather.loading,
  data: state.weather.weather,
  error: state.weather.error,
});

export default connect(mapStateToProps, {fetchCurrent})(Home);
