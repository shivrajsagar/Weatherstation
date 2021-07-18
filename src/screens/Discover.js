import React, {useState} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {searchWeather} from '../redux/actions/weatherAction';
import {connect} from 'react-redux';
import SearchCard from '../components/SearchCard';
import getColorTheme from '../helpers/theme';
import {fonts} from '../constants';

const Discover = ({data, loading, error, searchWeather}) => {
  const color = getColorTheme();

  const [value, setValue] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: color.background, flex: 1}}>
      <SearchBar
        autoCapitalize="none"
        keyboardType="default"
        showLoading={loading}
        value={value}
        placeholder="Search here"
        onChangeText={text => setValue(text)}
        onEndEditing={() => searchWeather(value)}
        containerStyle={{
          backgroundColor: color.background,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
        inputContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 15,
          borderColor: color.text,
          borderWidth: 0.4,
          borderBottomWidth: 0.5,
        }}
        inputStyle={{
          color: 'black',
        }}
      />

      {data && <SearchCard item={data} />}
      {!!error && (
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts.bold,
            fontSize: 22,
            color: color.text,
            padding: 10,
          }}>
          {error}
        </Text>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  data: state.weather.search,
  loading: state.weather.searchLoading,
  error: state.weather.searchError,
});

export default connect(mapStateToProps, {searchWeather})(Discover);
