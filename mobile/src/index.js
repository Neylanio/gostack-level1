import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

const App = () => {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [repositories]);

  async function handleAddRepository(){

    const repository = {
      title: `Novo repositório ${Date.now()}`,
      owner: "Neylanio"
    }

    const response = await api.post('repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

      <Text style={styles.title}> Repositórios </Text>

      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={( { item: repo } ) => (
            <Text style={styles.repository}>{repo.title}</Text>
          )}
        />

        <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={handleAddRepository}>
            <Text style={styles.buttonText}> Adicionar </Text>
        </TouchableOpacity>            

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
    fontWeight: "bold",
    textAlign: "center"
  },
  repository: {
    fontSize: 20,
    color: "#FFF",
    margin: 20,
  },
  button: {
    backgroundColor: "black",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFF',
  }
});

export default App;