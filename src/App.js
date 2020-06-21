import React, { useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from './services/api'

export default function App() {
  /** 
   * Create a repository variable to store all repo data and
   * a function to set all repo information
   */
  const [repositories, setRepositories] = useState([]);
  // This function will run when the app start
  useEffect(() => {
    // Get all repositories from server
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    }).catch((e) => {
      alert('Ops, não foi possivel carregar os dados dos repositorios');
    });
  }, []);

  async function handleLikeRepository(id) {
    try {
      const response = await api.post(`repositories/${id}/like`);
      setRepositories(repositories.map((repo) => {
        if (repo.id === id) {
          repo = response.data;
        }
        return repo;
      }));
    } catch (e) {
      alert('Ops, não foi possivel curtir este repositorio');
    }
  }

  return (
    <>
      {/* Set the status bar configuration */}
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      {/* Set all content to be displayed into a safe area! */}
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={({ item }) => (
              /* Create a container to store all repositories */
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{item.title}</Text>

                <View style={styles.techsContainer}>
                  <Text style={styles.tech}>
                    ReactJS
                  </Text>
                  <Text style={styles.tech}>
                    Node.js
                  </Text>
                </View>

                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${item.id}`}>
                    {`${item.likes} curtidas`}
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.button}
                  onPress={() => handleLikeRepository(item.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${item.id}`}>

                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
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
    paddingTop: 10,
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    textAlign: 'center'
  },
});
