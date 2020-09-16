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
  Image,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [render, setRender] = useState(0);
  const [data, setData] = useState();

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
        <StatusBar barStyle="dark-content" />
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
                <Text style={styles.textRender}>Rendered {render} times</Text>
                {data ? (
                  data.map((i) => (
                    <View style={styles.list}>
                      <Image style={styles.image} source={{uri: i.avatar}} />
                      <Text key={i.name}>{i.name}</Text>
                    </View>
                  ))
                ) : (
                  <Text> </Text>
                )}
              </View>
              <Button
                onPress={() => setRender((prev) => prev + 1)}
                title="Add render"
              />
              <Separator />
              <Button
                onPress={() => {
                  setRender(0);
                  setData(null);
                }}
                title="remove render"
              />
              <Separator />
              <Button
                onPress={() => Alert.alert('Button Pressed')}
                title="Btn"
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  list: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
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
