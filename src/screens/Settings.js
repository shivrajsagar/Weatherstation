import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {Switch, ListItem, Icon} from 'react-native-elements';

import {changeTheme} from '../redux/actions/themeAction';
import {connect} from 'react-redux';

import getColorTheme from '../helpers/theme';

import {Settings as Data} from '../constants/data';
import {fonts} from '../constants';

import {shareApp} from '../utils';

import {useSelector} from 'react-redux';

const Settings = ({theme, changeTheme, navigation}) => {
  const [value, setValue] = useState(false);
  const color = getColorTheme();

  const onPress = title => {
    switch (title) {
      case 'Account':
        return navigation.navigate('Signin');
      case 'Notification':
        return;
      case 'Dark Mode':
        return changeTheme(!theme);
      case 'Share':
        return shareApp();
      case 'Help':
        return;
      default:
        return;
    }
  };

  const switchValue = title => {
    switch (title) {
      case 'Notification':
        return;
      case 'Dark Mode':
        theme;
        return theme;
      default:
        return;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <ScrollView>
        <Text style={[styles.title, {color: color.text}]}>Settings</Text>
        {Data.map(({title, iconName, iconType}) => {
          if (title == 'Notification' || title == 'Dark Mode') {
            return (
              <ListItem
                key={title}
                containerStyle={[
                  styles.list,
                  {backgroundColor: color.background},
                ]}>
                <Icon
                  name={iconName}
                  type={iconType}
                  size={30}
                  color={color.text}
                />
                <ListItem.Content>
                  <ListItem.Title style={{color: color.text}}>
                    {title}
                  </ListItem.Title>
                </ListItem.Content>
                <Switch
                  value={switchValue(title)}
                  onValueChange={() => onPress(title)}
                />
              </ListItem>
            );
          }

          return (
            <ListItem
              key={title}
              containerStyle={[
                styles.list,
                {backgroundColor: color.background},
              ]}
              onPress={() => onPress(title)}>
              <Icon
                name={iconName}
                type={iconType}
                size={30}
                color={color.text}
              />
              <ListItem.Content>
                <ListItem.Title style={{color: color.text}}>
                  {title}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: fonts.regular,
    fontWeight: '900',
    padding: 10,
  },
  list: {
    backgroundColor: '#f3f3f3',
  },
});

export default connect(mapStateToProps, {changeTheme})(Settings);
