import type React from "react"
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { Feather } from "@expo/vector-icons"
import { useBasket } from "../context/BasketContext"
import { useNavigation } from "@react-navigation/native"

interface BasketModalProps {
  visible: boolean
  onClose: () => void
}

const BasketModal: React.FC<BasketModalProps> = ({ visible, onClose }) => {
  const { items, removeFromBasket, clearBasket, totalItems, subtotal } = useBasket()
  const navigation = useNavigation()

  const handleCheckout = () => {
    onClose()
  
    if (subtotal === 0) {
      // сразу оформить заказ без оплаты
      navigation.navigate("Payment", { skipPayment: true }) // 👈 передаём параметр
    } else {
      navigation.navigate("Payment")
    }
  }

  const total = subtotal

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Feather name="shopping-bag" size={20} color="#166534" style={styles.titleIcon} />
              <Text style={styles.title}>Ваша корзина ({totalItems})</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Feather name="x" size={20} color="#166534" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>Проверьте товары перед оформлением</Text>

          {items.length === 0 ? (
            <View style={styles.emptyBasket}>
              <Feather name="shopping-bag" size={48} color="#dcfce7" style={styles.emptyIcon} />
              <Text style={styles.emptyText}>Ваша корзина пуста</Text>
              <TouchableOpacity style={styles.continueButton} onPress={onClose}>
                <Text style={styles.continueButtonText}>Продолжить покупки</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                style={styles.itemsList}
                renderItem={({ item }) => (
                  <View style={styles.basketItem}>
                    <Image source={{ uri: item.image || "https://via.placeholder.com/60" }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <View style={styles.itemMeta}>
                        <Text style={styles.itemQuantity}>Кол-во: {item.quantity}</Text>
                        <Text style={styles.itemPrice}>{(item.price * item.quantity).toFixed(2)} тг.</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.removeButton} onPress={() => removeFromBasket(item.id)}>
                      <Feather name="trash-2" size={16} color="#166534" />
                    </TouchableOpacity>
                  </View>
                )}
              />

              <View style={styles.summary}>
                <View style={styles.separator} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Итого</Text>
                  <Text style={styles.totalValue}>{total.toFixed(2)} тг.</Text>
                </View>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                  <Text style={styles.buttonText}>Перейти к оплате</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.clearButton} onPress={clearBasket}>
                  <Text style={styles.clearButtonText}>Очистить корзину</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#166534",
  },
  subtitle: {
    fontSize: 14,
    color: "#4d7c0f",
    marginBottom: 16,
  },
  closeButton: {
    padding: 4,
  },
  emptyBasket: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyIcon: {
    marginBottom: 12,
  },
  emptyText: {
    color: "#4d7c0f",
    marginBottom: 16,
  },
  continueButton: {
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  continueButtonText: {
    color: "#166534",
  },
  itemsList: {
    maxHeight: 300,
  },
  basketItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0fdf4",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    color: "#166534",
    fontWeight: "500",
    marginBottom: 4,
  },
  itemMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemQuantity: {
    color: "#4d7c0f",
    fontSize: 12,
  },
  itemPrice: {
    color: "#166534",
    fontWeight: "bold",
  },
  removeButton: {
    padding: 8,
  },
  summary: {
    marginTop: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalLabel: {
    color: "#166534",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalValue: {
    color: "#166534",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
  },
  checkoutButton: {
    backgroundColor: "#16a34a",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  clearButton: {
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#166534",
  },
})

export default BasketModal