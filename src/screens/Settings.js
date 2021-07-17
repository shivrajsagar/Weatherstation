import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Switch} from 'react-native-elements';

import {changeTheme} from '../redux/actions/themeAction';
import {connect} from 'react-redux';

import getColorTheme from '../helpers/theme';

const Settings = ({theme, changeTheme}) => {
  const color = getColorTheme();

  return (
    <SafeAreaView style={{backgroundColor: color.primary, flex: 1}}>
      <Text>Settings</Text>
      <Switch value={theme} onValueChange={() => changeTheme(!theme)} />
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps, {changeTheme})(Settings);
