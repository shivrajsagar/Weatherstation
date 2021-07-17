import React, {useEffect} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Text, View, StyleSheet, SafeAreaView, Image} from 'react-native';

import {fonts} from '../constants';
import {Loading} from '../components';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

import {fetchCurrent} from '../redux/actions/weatherAction';
import {connect} from 'react-redux';

const Home = ({loading, error, data, fetchCurrent}) => {
  useEffect(() => {
    //fetchCurrent();
  }, []);

  const {main, weather} = data;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.view}>
          <View>
            <Text style={styles.text}>San Francisco</Text>
            <Text style={{fontSize: 60}}>
              {weather[0].icon} {'\u00b0'}
            </Text>

            <Text
              style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
                padding: 10,
              }}>
              Cloudy
            </Text>
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

const mapStateToProps = state => ({
  loading: state.weather.loading,
  data: state.weather.weather,
  error: state.weather.error,
});

export default connect(mapStateToProps, {fetchCurrent})(Home);
