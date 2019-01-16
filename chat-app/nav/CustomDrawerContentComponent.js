import React from "react";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Icon } from "native-base";

import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  AsyncStorage
} from "react-native";
import api from "../../../VARIAVEIS_GLOBAIS.js";
import axios from "axios";
import qs from "qs";

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaCadastros: [],
      carregando: false
    };
    this._selecionarCpf = this._selecionarCpf.bind(this);
    this._getNomePeloCpfCnpj = this._getNomePeloCpfCnpj.bind(this);
  }

  async _selecionarCpf(obj) {
    this.setState({ carregando: true });
    let data = qs.stringify({
      operacao: "selecionarDocumento",
      cpfCnpj: obj.cpfCnpj
    });
    axios
      .post(api.API_CADASTRO, data)
      .then(async res => {
        state.cpfCnpjSelecionado = obj.cpfCnpj.replace(/[^\d.-]/g, "");
        state.nome = obj.nomeResumido ? obj.nomeResumido : obj.nomeRazaoSocial;
        this.setState({
          carregando: false
        });
      })
      .catch(err => {
        this.setState({
          carregando: false
        });
        console.log(err);
      });
  }

  _destruirSessao = async () => {
    if (this._isMounted) this.setState({ carregando: true });
    axios.defaults.withCredentials = true;
    let data = qs.stringify({ operacao: "DestruirSessao" });
    let header = qs.stringify({
      headers: { "Content-Type": "application/json" }
    });

    axios
      .post(api.API_PESSOA, data, header)
      .then(async response => {
        state.listaCpfCnpj = []
        state.nome = ''
        state.nocpfCnpjSelecionadoe = ''
        if (this._isMounted) this.setState({ carregando: false });
        await AsyncStorage.removeItem("id");
        this.props.navigation.navigate(
          response.data.mensagem == "logout" ? "Login" : "Drawer"
        );
      })
      .catch(e => {
        if (this._isMounted) this.setState({ carregando: false });
        console.warn(e);
      });
  };

  _getNomePeloCpfCnpj() {
    for (var i of state.listaCpfCnpj) {
      if (
        i.cpfCnpj.replace(/\D+/g, "") ==
        state.cpfCnpjSelecionado.replace(/\D+/g, "")
      ) {
        state.nome = i.nomeResumido ? i.nomeResumido : i.nomeRazaoSocial;
      } else {
        state.nome = "";
      }
    }
  }

  async componentDidMount() {
    this._getNomePeloCpfCnpj();
  }

  render() {
    const { carregando } = this.state;
    const { listaCpfCnpj, cpfCnpjSelecionado, nome } = state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={styles.containerImage}>
              <Image
                style={{
                  alignSelf: "center",
                  width: "100%",
                  height: "100%",
                  borderRadius: 10
                }}
                resizeMode="contain"
                source={{
                  uri:
                    "https://www.washingtonpost.com/resizer/zeUI0pPP75Zvhh0lKmg7phuSGRI=/200x200/s3.amazonaws.com/arc-authors/washpost/f4263170-971b-4a1c-a0b6-cfbfbc334580.png"
                }}
              />
            </View>
            {!carregando ? (
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  paddingTop: 10
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    textAlign: "center"
                  }}
                >
                  {nome}
                </Text>
                <View>
                  <View>
                    <TextInputMask
                      editable={false}
                      selectTextOnFocus={false}
                      disabled={true}
                      style={{
                        padding: 5,
                        fontSize: 15,
                        textAlign: "center"
                      }}
                      type={
                        cpfCnpjSelecionado.replace(/\D+/g, "").length < 12
                          ? "cpf"
                          : "cnpj"
                      }
                      value={cpfCnpjSelecionado}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  paddingRight: 10,
                  paddingLeft: 10,
                  paddingBottom: 10,
                  paddingTop: 10
                }}
              >
                <ActivityIndicator size="small" color="#890409" />
              </View>
            )}
          </View>
          <View>
            <SafeAreaView
              style={styles.container}
              forceInset={{ top: "always", horizontal: "never" }}
            >
              <DrawerItems {...this.props} />
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.buttonView}
                  onPress={() => this._destruirSessao()}
                >
                  <Icon name="md-log-out" />
                  <Text
                    style={{ fontWeight: "600", paddingLeft: 35, marginTop: 5 }}
                  >
                    Sair
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </ScrollView>
        <View style={styles.containerImageFooter}>
          {/* <Image
            style={{
              alignSelf: "center",
              width: "100%",
              height: 70,
              borderWidth: 1,
              bottom: 0
            }}
            resizeMode="stretch"
            source={require("../../../assets/logo_santri.png")}
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerImage: {
    justifyContent: "center",
    padding: 10,
    paddingLeft: 5,
    height: 100,
    width: 120,
    flex: 1
  },
  containerImageFooter: {
    padding: 10,
    paddingLeft: 5,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 0
  },
  buttonView: {
    marginLeft: 8,
    marginTop: 5,
    flexDirection: "row"
  }
});

export default view(CustomDrawerContentComponent);
