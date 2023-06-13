import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
  StyleSheet
} from "react-native";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function App() {
  const url = "http://192.168.3.13:30000/usuarios";
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    pegarUsuarios();
  }, []);

  const pegarUsuarios = () => {
    axios
      .get(url)
      .then((resposta) => {
        setUsuarios(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>

      <TouchableOpacity onPress={() => auxiliadorDeDel(item.id)}>
        <Feather name="trash-2" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setUpdateModalVisible(true);
          setSelectedUser(item);
          setNome(item.name);
          setEmail(item.email);
        }}
      >
        <Feather name="edit" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );

  const criaNovoUsuario = () => {
    axios
      .post(url, {
        name: nome,
        email: email,
        password: senha
      })
      .then((resposta) => {
        console.log(resposta.data);
        pegarUsuarios();
        setCreateModalVisible(false);
        limparCampos();
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const limparCampos = () => {
    setEmail("");
    setNome("");
    setSenha("");
  };

  const deletarUsuario = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then(() => {
        const usuariosAtualizados = usuarios.filter((usuario) => usuario.id !== id);
        setUsuarios(usuariosAtualizados);
      })
      .catch((erros) => {
        console.log(erros);
      });
  };

  const auxiliadorDeDel = (id) => {
    Alert.alert(
      "Confirme",
      "Tem certeza que deseja excluir o usuário?",
      [
        {
          text: "Sim",
          onPress: () => deletarUsuario(id)
        },
        {
          text: "Não",
          style: "cancel"
        }
      ]
    );
  };

  const atualizarUsuario = (usuario) => {
    const data = {
      name: nome || usuario.name,
      email: email || usuario.email,
      password: usuario.password
    };

    axios
      .put(`${url}/${usuario.id}`, data)
      .then((resposta) => {
        console.log(resposta.data);
        setUsuarios((usuarios) =>
          usuarios.map((item) => {
            if (item.id === usuario.id) {
              return {
                ...item,
                name: data.name,
                email: data.email
              };
            }
            return item;
          })
        );
        setUpdateModalVisible(false);
        setNome("");
        setEmail("");
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 16,
      paddingTop: 40
    },
    addButton: {
      backgroundColor: "#888",
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 20,
      right: 20
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      paddingVertical: 12
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold"
    },
    itemEmail: {
      fontSize: 14,
      color: "#888"
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 24,
      width: "80%"
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 16
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 8,
      marginBottom: 12
    },
    button: {
      backgroundColor: "#888",
      borderRadius: 4,
      paddingVertical: 12,
      alignItems: "center",
      marginBottom: 8
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold"
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setCreateModalVisible(true)}
      >
        <Feather name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={createModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Usuário</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
            />

            <TouchableOpacity style={styles.button} onPress={criaNovoUsuario}>
              <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCreateModalVisible(false);
                limparCampos();
              }}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={updateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar Usuário</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => atualizarUsuario(selectedUser)}
            >
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setUpdateModalVisible(false);
                limparCampos();
              }}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
