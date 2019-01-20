import React from "react";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Icon } from "native-base";

import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  AsyncStorage,
} from "react-native";

class CustomDrawerContentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaCadastros: [],
      loading: false
    };
  }

  _destruirSessao = async () => {

  };


  async componentDidMount() {

  }

  render() {
    const { loading } = this.state;
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
                source={
                  require('../assets/QR.png')
                }
              />
            </View>
            {!loading ? (
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
                </Text>
                <View>
                  <View>

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

export default CustomDrawerContentComponent;
