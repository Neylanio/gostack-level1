import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList } from 'react-native';

import api from './services/api';

const App = () => {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={( { item: repo } ) => (
            <Text style={styles.repository}>{repo.title}</Text>
          )}
        />
      </SafeAreaView>
    </>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  title: {
    fontSize: 40,
    color: "#FFF",
    fontWeight: "bold"
  },
  repository: {
    fontSize: 30,
    color: "#FFF",
    marginTop: 10,
  }
});

export default App;