import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation();

  const signUpUser = () => {
    var userId = uuid.v4();
    console.log('user=======>', userId);
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        password: password,
        userId: userId,
      })
      .then(res => {
        console.log('user is created successfully!!');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const validation = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    } else if (email == '') {
      isValid = false;
    } else if (mobileNumber == '') {
      isValid = false;
    } else if (password == '') {
      isValid = false;
    } else if (confrimPassword !== password) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.maintxt}>Sign Up</Text>
        <TextInput
          placeholder="Enter Name"
          style={styles.textbox}
          value={name}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          placeholder="Enter Email"
          style={styles.textbox}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          placeholder="Enter Mobile Number"
          style={styles.textbox}
          value={mobileNumber}
          onChangeText={txt => setMobileNumber(txt)}
        />
        <TextInput
          placeholder="Enter Password"
          style={styles.textbox}
          value={password}
          onChangeText={txt => setPassword(txt)}
        />
        <TextInput
          placeholder="Enter Confirm Password"
          style={styles.textbox}
          value={confrimPassword}
          onChangeText={txt => setConfirmPassword(txt)}
        />
        <TouchableOpacity
          onPress={() => {
            if (validation()) {
              signUpUser();
            } else {
              Alert.alert('PLEASE ENTER VALID DATA');
            }
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttontxt}>Sign up</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginview}
          onPress={() => {
            navigation.navigate('LogIn');
          }}>
          <Text style={styles.logintxt}>Or Log In ?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
  },
  maintxt: {fontSize: responsiveFontSize(4), fontWeight: '700'},
  textbox: {
    width: responsiveWidth(80),
    borderWidth: 1,
    borderColor: '#8e8e8e',
    padding: '2.5%',
    marginTop: responsiveHeight(3),
    borderRadius: responsiveWidth(3),
  },
  buttonStyle: {
    width: responsiveWidth(80),
    height: responsiveHeight(6.2),
    backgroundColor: 'orange',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  buttontxt: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
  },
  loginview: {
    width: responsiveWidth(100),
    height: responsiveHeight(5),
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintxt: {
    fontSize: responsiveFontSize(2.8),
    color: 'blue',
  },
});
