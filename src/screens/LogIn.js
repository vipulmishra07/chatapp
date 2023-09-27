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
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {TextInput} from 'react-native-gesture-handler';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

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

  const loginUser = () => {
    try {
      setVisible(true);
      firestore()
        .collection('users')
        .where('email', '==', email)
        .get()
        .then(res => {
          setVisible(false);
          if (res.docs != []) {
            console.log(JSON.stringify(res.docs[0].data()));
            goToNext(
              res.docs[0].data().name,
              res.docs[0].data().email,
              res.docs[0].data().userId,
            );
          } else {
            console.log('USER NOT FOUND');
          }
        });
    } catch (error) {
      setVisible(false);
      console.log('USER IS NOT EXIST');
    }
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem("NAME",name)
    await AsyncStorage.setItem("EMAIL",email)
    await AsyncStorage.setItem("USERID",userId)
    navigation.navigate('Main')
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.maintxt}>Log In</Text>

        <TextInput
          placeholder="Enter Email"
          style={styles.textbox}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />

        <TextInput
          placeholder="Enter Password"
          style={styles.textbox}
          value={password}
          onChangeText={txt => setPassword(txt)}
        />

        <TouchableOpacity
          onPress={() => {
            loginUser();
          }}>
          <View style={styles.buttonStyle}>
            <Text style={styles.buttontxt}>LOG IN</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginview}
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}>
          <Text style={styles.logintxt}>Or Sign Up ?</Text>
        </TouchableOpacity>
        <Loader visible={visible} />
      </View>
    </ScrollView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(20),
  },
  maintxt: {
    fontSize: responsiveFontSize(4),
    fontWeight: '700',
    marginTop: responsiveHeight(5),
    marginBottom: responsiveHeight(8),
  },
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
