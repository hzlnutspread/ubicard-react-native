import Modal from "react-native-modal";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { ActivityIndicator } from "react-native";
import { useUser } from "../contexts/UserContext";
import { validateUserCard } from "../utils/userUtils";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { useTabPressListener } from "../utils/useTabPressListener";

const CardPage = () => {
  const { userData } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoading, fetchData } = useTabPressListener(validateUserCard);

  useEffect(() => {
    (async function () {
      await fetchData();
    })();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0A9B97" />
      ) : (
        <>
          <Text style={styles.body_text}>
            {userData.message} for {userData.user.first_name}
          </Text>
          <TouchableOpacity style={styles.openQrCodeButton} onPress={openModal}>
            <Text style={styles.modalButtonText}>show qr code</Text>
          </TouchableOpacity>
          <Modal animationIn={"bounceIn"} isVisible={modalVisible}>
            <View style={styles.modalContainer}>
              <View style={styles.qrCodeContainer}>
                <QRCode
                  value={userData.user.user_id}
                  size={300}
                  color="#000000"
                  backgroundColor="#FFFFFF"
                  ecl="H"
                  enableLinearGradient={true}
                  getRef={(c) => (this.svg = c)}
                />
              </View>
              <TouchableOpacity
                style={styles.closeQrCodeButton}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

export default CardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: "center",
    alignItems: "center",
  },
  body_text: {
    color: "#FFFFFF",
    marginBottom: 20,
  },
  qrCodeContainer: {
    borderWidth: 2,
    borderColor: "#0A9B97",
    borderRadius: 10,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  openQrCodeButton: {
    backgroundColor: "#0A9B97",
    padding: 12,
    borderRadius: 10,
  },
  closeQrCodeButton: {
    backgroundColor: "#0A9B97",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },
});
