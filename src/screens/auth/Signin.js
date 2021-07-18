import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {Button, Divider, Input, SocialIcon} from 'react-native-elements';
import {connect} from 'react-redux';

import {fonts} from '../../constants';

import getColorTheme from '../../helpers/theme';
import {
  login,
  userValue,
  gmail,
  facebook,
} from '../../redux/actions/authAction';

const Signin = ({
  navigation,
  email,
  password,
  loading,
  error,
  success,
  userValue,
  login,
  gmail,
  facebook,
}) => {
  const color = getColorTheme();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.background}}>
      <View style={styles.container}>
        <Text style={[styles.text, {color: color.text}]}>Signin</Text>
        {!!success && (
          <Text
            style={{
              color: 'green',
              fontFamily: fonts.medium,
              fontSize: 22,
              textAlign: 'center',
            }}>
            {success}
          </Text>
        )}
        {!!error && (
          <Text
            style={{
              color: 'red',
              fontFamily: fonts.medium,
              fontSize: 22,
              textAlign: 'center',
            }}>
            {error}
          </Text>
        )}
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={color.text}
          leftIcon={{name: 'email', color: color.text}}
          style={{color: color.text, fontFamily: fonts.regular}}
          value={email}
          onChangeText={text => userValue({prop: 'email', value: text})}
        />
        <Input
          autoCapitalize="none"
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor={color.text}
          leftIcon={{name: 'lock', color: color.text}}
          style={{color: color.text, fontFamily: fonts.regular}}
          value={password}
          onChangeText={text => userValue({prop: 'password', value: text})}
        />
        <Button
          title="Signin"
          containerStyle={{margin: 10}}
          loading={loading}
          onPress={() => login(email, password)}
        />

        <View style={styles.social}>
          <SocialIcon
            type="google"
            onPress={() =>
              gmail().then(() => console.log('Signed in with Google!'))
            }
          />
          <SocialIcon
            type="facebook"
            onPress={() =>
              facebook().then(() => console.log('Signed in with Facebook!'))
            }
          />
        </View>
      </View>
      <View>
        <Button
          title="Register"
          type="outline"
          containerStyle={{margin: 10}}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: fonts.bold,
  },
});

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  loading: state.auth.loading,
  error: state.auth.error,
  success: state.auth.success,
});

export default connect(mapStateToProps, {userValue, login, gmail, facebook})(
  Signin,
);
