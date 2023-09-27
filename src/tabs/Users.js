import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  //   useEffect(() => {
  //     const backAction = () => {
  //       Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => BackHandler.exitApp()},
  //       ]);
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );

  //     return () => backHandler.remove();
  //   }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage?.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage?.getItem('EMAIL');
    firestore()
      .collection('users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUsers(tempData);
        console?.log(JSON?.stringify(res?.docs[0]?.data()));
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.txtreal}>
          <Text style={styles.textreal1}>R</Text>
          <Text style={styles.textreal2}>eal</Text>
          <Text style={styles.texttalk1}>T</Text>
          <Text style={styles.texttalk2}>alk</Text>
        </View>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.imgcontainer}
              onPress={() => {
                navigation.navigate('MessageScreen', {data: item, id: id});
              }}>
              <Image
                source={require('../assets/images/users.png')}
                style={styles.img}
              />
              <Text style={styles.name}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: 'orange',
    width: '100%',
    borderWidth: 2,
    borderBottomColor: 'red',
    borderLeftColor: 'red',
    borderRightColor: 'red',
    borderTopColor: 'orange',
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    padding: '2%',
  },
  txtreal: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textreal1: {
    fontSize: 50,
    color: '#00a8ff',
    fontStyle: 'italic',
  },
  textreal2: {
    fontSize: 20,
    color: '#000000',
    fontStyle: 'italic',
    top: 10,
  },
  texttalk1: {
    fontSize: 50,
    color: '#f368e0',
    fontStyle: 'italic',
  },
  texttalk2: {
    fontSize: 20,
    color: '#000000',
    fontStyle: 'italic',
    top: 10,
    right: 8,
  },
  imgcontainer: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    // justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingLeft: 8,
    marginVertical: '3%',
    borderRadius: 15,
    // backgroundColor:'red'
  },
  img: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    tintColor: 'orange',
  },
  name: {
    color: '#000',
    fontSize: 20,
    alignSelf: 'center',
    paddingLeft: 15,
  },
});
