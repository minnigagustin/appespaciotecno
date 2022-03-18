import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Modal, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import QRCode from 'react-native-qrcode-svg';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [qrmodal, setQr] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert('Escaneado!', 'El link es: ' + data);
  };

  if (hasPermission === null) {
    return <Text>Acepta el permiso</Text>;
  }
  if (hasPermission === false) {
    return <Text>No tengo acceso a la camara</Text>;
  }

  return (
    <View style={styles.container}>
      
       <Modal
        animationType="slide"
        transparent={true}
        visible={qrmodal}
        onRequestClose={() => {
          Alert.alert("Qr Cerrado");
          setQr(!qrmodal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <QRCode
      value="https://www.bahia.gob.ar/"
      size={260}
    />
    <Text style={{fontSize: 20}}>https://www.bahia.gob.ar/</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setQr(!qrmodal)}
            >
              <Text style={styles.textStyle}>Salir!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Presiona para escanear nuevamente"} onPress={() => setScanned(false)} />
      )}
      <View style={{position: 'absolute', bottom: 20, left: 0, right: 0}}>
      <Button title={"Ver QR"} onPress={() => setQr(true)} />
      </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  absoluteFillObject: {
        left: 0,
        height: 800,
        right: 0,
        top: 0,
        bottom: 0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
