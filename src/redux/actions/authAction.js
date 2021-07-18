import axios from 'axios';

import {
  LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_VALUE,
  SET_CONFIRM,
  SET_INITIALIZING,
} from '../types';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

GoogleSignin.configure({
  webClientId:
    '913746425822-ugms8u73r6kf4kkdlagp45cinojvmtia.apps.googleusercontent.com',
});

const userValue = ({prop, value}) => {
  return {
    type: USER_VALUE,
    payload: {prop, value},
  };
};

const login = (email, password) => async dispatch => {
  try {
    dispatch({type: LOADING});
    await auth().signInWithEmailAndPassword(email, password);

    dispatch({type: LOGIN_SUCCESS, payload: 'User account login'});
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      dispatch({type: LOGIN_FAIL, payload: 'auth/email-already-in-use'});
    }

    if (error.code === 'auth/invalid-email') {
      dispatch({type: LOGIN_FAIL, payload: 'auth/invalid-email'});
    }
    dispatch({type: LOGIN_FAIL, payload: 'Something went wrong'});
  }
};

const signup = (email, password) => async dispatch => {
  try {
    dispatch({type: LOADING});
    await auth().createUserWithEmailAndPassword(email, password);
    dispatch({type: REGISTER_SUCCESS, payload: 'User account created'});
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      dispatch({type: REGISTER_FAIL, payload: 'auth/email-already-in-use'});
    }

    if (error.code === 'auth/invalid-email') {
      dispatch({type: REGISTER_FAIL, payload: 'auth/invalid-email'});
    }
    dispatch({type: REGISTER_FAIL, payload: 'Something went wrong'});
  }
};

const verifyPhoneNumber = phoneNumber => async dispatch => {
  const confirmation = await auth().verifyPhoneNumber(`+91${phoneNumber}`);
  dispatch({type: SET_CONFIRM, payload: confirmation});
};

const confirmCode = (confirm, code) => async dispatch => {
  try {
    const credential = auth.PhoneAuthProvider.credential(
      confirm.verificationId,
      code,
    );
    let userData = await auth().currentUser.linkWithCredential(credential);
    dispatch({type: SET_USER, payload: userData.user});
  } catch (error) {
    if (error.code == 'auth/invalid-verification-code') {
      console.log('Invalid code.');
      dispatch({LOGIN_FAIL, payload: 'Invalid code'});
    } else {
      dispatch({type: LOGIN_FAIL, payload: 'Account linking error'});
      console.log('Account linking error');
    }
  }
};

const gmail = () => async dispatch => {
  try {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    throw error;
  }
};

const facebook = () => async dispatch => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    throw error;
  }
};

const logout = () => async dispatch => {
  try {
  } catch (error) {
    throw error;
  }
};

export {
  userValue,
  login,
  signup,
  gmail,
  facebook,
  logout,
  verifyPhoneNumber,
  confirmCode,
};
