/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TextInput,
  Modal,
  TouchableHighlight,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [render, setRender] = useState(0);
  const [data, setData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [todo, setTodo] = useState();
  console.log(data);

  const Separator = () => <View style={styles.separator} />;

  useEffect(() => {
    axios
      .get('https://5f61ab8607c1770016c523a2.mockapi.io/api/andro/v1/todo')
      .then((result) => {
        setData(result.data);
      });
  }, [render]);

  return (
    <>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalShow}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{margin: 10}}>Input todo</Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => setTodo(text)}
                value={todo}
              />
              <View
                style={{
                  flexDirection: 'row',
                  margin: 20,
                }}>
                <Button
                  onPress={() => {
                    setModalShow(!modalShow);
                    setTodo(null);
                  }}
                  style={styles.button}
                  title="Cancel"
                />
                <Button
                  onPress={() => Alert.alert(`Add ${todo}`)}
                  style={styles.button}
                  title="Add"
                />
              </View>
            </View>
          </View>
        </Modal>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.textRender}>TODO App</Text>
        <Button onPress={() => setModalShow(!modalShow)} title="Add Todo" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                {data ? (
                  data.map((i) => (
                    <View style={styles.list}>
                      <Text key={i.name}>{i.todo}</Text>
                      <Text>{i.detail}</Text>
                    </View>
                  ))
                ) : (
                  <Text> </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    padding: 10,
  },
  inputText: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
    height: 40,
    margin: 10,
  },
  list: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flexDirection: 'column',
    alignContent: 'space-around',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    height: 200,
    width: 300,
    padding: 7,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  textRender: {
    marginBottom: 20,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
