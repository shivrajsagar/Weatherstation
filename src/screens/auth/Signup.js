import React, {useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

import {Button, Input} from 'react-native-elements';
import {connect, useDispatch} from 'react-redux';

import {fonts} from '../../constants';

import getColorTheme from '../../helpers/theme';
import {
  userValue,
  signup,
  verifyPhoneNumber,
  confirmCode,
} from '../../redux/actions/authAction';

import auth from '@react-native-firebase/auth';
import {
  SET_CONFIRM,
  SET_INITIALIZING,
  SET_USER,
  SET_CODE,
} from '../../redux/types';

const Signup = ({
  navigation,
  loading,
  email,
  password,
  userValue,
  signup,
  success,
  error,
  initializing,
  code,
  user,
  confirm,
  verifyPhoneNumber,
  confirmCode,
  mobile,
}) => {
  const color = getColorTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    dispatch({type: SET_USER, payload: user});
    if (initializing) dispatch({type: SET_INITIALIZING, payload: false});
  }

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Text style={[styles.text, {color: color.text}]}>Sign Up</Text>
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
            keyboardType="default"
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor={color.text}
            leftIcon={{name: 'lock', color: color.text}}
            style={{color: color.text, fontFamily: fonts.regular}}
            value={password}
            onChangeText={text => userValue({prop: 'password', value: text})}
          />
          <Button
            title="Signup"
            containerStyle={{margin: 10}}
            loading={loading}
            onPress={() => signup(email, password)}
          />
        </View>

        <Button
          title="Signin"
          type="outline"
          containerStyle={{margin: 10}}
          onPress={() => navigation.navigate('Signin')}
        />
      </SafeAreaView>
    );
  } else if (!user.phoneNumber) {
    if (!confirm) {
      return (
        <SafeAreaView style={styles.container}>
          <Input
            placeholder="Mobile"
            placeholderTextColor={color.text}
            leftIcon={{name: 'mobile', type: 'entypo', color: color.text}}
            value={mobile}
            onChangeText={text => userValue({prop: 'mobile', value: text})}
          />
          <Button
            title="Verify Phone Number"
            onPress={() => verifyPhoneNumber(mobile)}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <Input
          placeholder="Otp"
          value={code}
          onChangeText={text => dispatch({type: SET_CODE, payload: text})}
        />
        <Button
          title="Confirm Code"
          onPress={() => confirmCode(confirm, code)}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <Text>
          Welcome! {user.phoneNumber} linked with {user.email}
        </Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: 25,
  },
});

const mapStateToProps = state => ({
  email: state.auth.email,
  password: state.auth.password,
  loading: state.auth.loading,
  error: state.auth.error,
  success: state.auth.success,
  mobile: state.auth.mobile,
  //mfa
  initializing: state.auth.initializing,
  user: state.auth.user,
  confirm: state.auth.confirm,
  code: state.auth.code,
});

export default connect(mapStateToProps, {
  userValue,
  signup,
  verifyPhoneNumber,
  confirmCode,
})(Signup);
