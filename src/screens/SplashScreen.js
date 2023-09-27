import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      checkLogInUser()
    }, 2000);
  }, []);

  const checkLogInUser = async () => {
    try {
      const id = await AsyncStorage.getItem('USERID');
      if (id !== null) {
        navigation.navigate('Main');
      } else {
        navigation.navigate('LogIn');
      }
    } catch (error) {
      console.log('ERROR IN LOGIN CHECK SPLASH!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text style={styles.maintext}>Real</Text>
        <Text style={styles.maintext2}>Talk</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsiveWidth(100),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maintext: {
    fontSize: 80,
    fontWeight: '800',
    fontFamily: 'cursive',
    color: '#546de5',
  },
  maintext2: {
    fontSize: 60,
    fontWeight: '800',
    fontFamily: 'cursive',
    color: '#546de5',
  },
  background: {
    backgroundColor: 'orange',
    width: 250,
    height: 250,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: responsiveWidth(250),
  },
});
