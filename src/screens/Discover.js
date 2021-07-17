import React, {useState} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {SearchBar} from 'react-native-elements';

import {searchWeather} from '../redux/actions/weatherAction';
import {connect} from 'react-redux';
import SearchCard from '../components/SearchCard';

const Discover = ({data, loading, error, searchWeather}) => {
  const [value, setValue] = useState('');

  return (
    <SafeAreaView>
      <SearchBar
        autoCapitalize="none"
        keyboardType="default"
        showLoading={loading}
        value={value}
        placeholder="Search here"
        onChangeText={text => setValue(text)}
        onEndEditing={() => searchWeather(value)}
        containerStyle={{
          backgroundColor: '#f3f3f3',
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
        inputContainerStyle={{
          backgroundColor: 'white',
          borderRadius: 15,
        }}
        inputStyle={{
          color: 'black',
        }}
      />

      {data && <SearchCard item={data} />}
      {!!error && <Text>{error}</Text>}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  data: state.weather.search,
  loading: state.weather.searchLoading,
  error: state.weather.searchError,
});

export default connect(mapStateToProps, {searchWeather})(Discover);
