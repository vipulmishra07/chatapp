import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const Main = () => {
  const [selectedIcon, setSelectedIcon] = useState(0);

  return (
    <View style={styles.container}>
      {selectedIcon == 0 ? <Users /> : <Setting />}
      <View style={styles.bottomtab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedIcon(0);
          }}>
          <Icon
            name="people"
            size={30}
            style={[
              styles.tabicon,
              {
                color: selectedIcon == 0 ? '#ffffff' : '#8e8e8e',
                borderColor: selectedIcon == 0 ? '#ffffff' : '#8e8e8e',
              },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedIcon(1);
          }}>
          <Icon
            name="settings"
            size={30}
            style={[
              styles.tabicon,
              {
                color: selectedIcon == 1 ? '#ffffff' : '#8e8e8e',
                borderColor: selectedIcon == 1 ? '#ffffff' : '#8e8e8e',
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bottomtab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'orange',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  tabicon: {
    borderWidth: 3,
    borderColor: '#000',
    padding: 9.2,
    borderRadius: 35,
    width: 50,
    height: 50,
  },
});
