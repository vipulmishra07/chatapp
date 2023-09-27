import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const MessageScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params?.id + route.params?.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc');
    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: Date.parse(new Date())};
      });
      setMessages(allmessages);
    });
    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params?.id,
      sendTo: route.params?.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc('' + route.params?.id + route.params?.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params?.data.userId + route.params?.id)
      .collection('messages')
      .add(myMsg);
  }, []);

  return (
    <View style={{flex: 1 / 1.004, backgroundColor: '#fff'}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params?.id,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#574b90',
                  borderWidth: 5,
                  borderColor: '#ffffff',
                },
                left: {
                  backgroundColor: 'orange',
                  borderWidth: 5,
                  borderColor: '#ffffff',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
