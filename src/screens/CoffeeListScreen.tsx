"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from "react-native"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import Card from "../components/Card"
import Badge from "../components/Badge"
import PurchaseModal from "../components/PurchaseModal"
import BasketModal from "../components/BasketModal"
import { useBasket, type Coffee } from "../context/BasketContext"

const coffees: Coffee[] = [
  {
    id: 1,
    name: "Ethiopian Yirgacheffe",
    description: "Floral and citrus notes with a light body",
    price: 18.99,
    beanPoints: 190,
    image: "https://via.placeholder.com/80",
    tags: ["Light Roast", "Floral"],
  },
  {
    id: 2,
    name: "Colombian Supremo",
    description: "Sweet caramel and nutty flavors with medium acidity",
    price: 16.5,
    beanPoints: 165,
    image: "https://via.placeholder.com/80",
    tags: ["Medium Roast", "Nutty"],
  },
  {
    id: 3,
    name: "Sumatra Mandheling",
    description: "Earthy, full-bodied with low acidity and chocolate notes",
    price: 19.99,
    beanPoints: 200,
    image: "https://via.placeholder.com/80",
    tags: ["Dark Roast", "Earthy"],
  },
  {
    id: 4,
    name: "Kenyan AA",
    description: "Bright acidity with berry and citrus notes",
    price: 21.5,
    beanPoints: 215,
    image: "https://via.placeholder.com/80",
    tags: ["Medium Roast", "Fruity"],
  },
]

const CoffeeListScreen = () => {
  const [selectedCoffee, setSelectedCoffee] = useState<Coffee | null>(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false)
  const { totalItems } = useBasket()

  const openPurchaseModal = (coffee: Coffee) => {
    setSelectedCoffee(coffee)
    setIsPurchaseModalOpen(true)
  }

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
    setSelectedCoffee(null)
  }

  const openBasketModal = () => {
    setIsBasketModalOpen(true)
  }

  const closeBasketModal = () => {
    setIsBasketModalOpen(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={16} color="#60a5fa" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search coffees..." placeholderTextColor="#60a5fa" />
        </View>
        <TouchableOpacity style={styles.basketButton} onPress={openBasketModal}>
          <Feather name="shopping-bag" size={20} color="#60a5fa" />
          {totalItems > 0 && (
            <View style={styles.basketBadge}>
              <Text style={styles.basketBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color="#60a5fa" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={coffees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.coffeeItem}>
              <Image source={{ uri: item.image }} style={styles.coffeeImage} />
              <View style={styles.coffeeDetails}>
                <View style={styles.coffeeHeader}>
                  <Text style={styles.coffeeName}>{item.name}</Text>
                  <Text style={styles.coffeePrice}>${item.price}</Text>
                </View>
                <Text style={styles.coffeeDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.coffeeFooter}>
                  <View style={styles.tagsContainer}>
                    {item.tags.map((tag, index) => (
                      <Badge key={index} label={tag} />
                    ))}
                  </View>
                  <View style={styles.beansContainer}>
                    <Feather name="coffee" size={12} color="#93c5fd" style={styles.beansIcon} />
                    <Text style={styles.beansText}>{item.beanPoints}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={() => openPurchaseModal(item)}>
                  <Text style={styles.buyButtonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
        contentContainerStyle={styles.listContent}
      />

      <PurchaseModal coffee={selectedCoffee} visible={isPurchaseModalOpen} onClose={closePurchaseModal} />

      <BasketModal visible={isBasketModalOpen} onClose={closeBasketModal} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(23, 37, 84, 0.3)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
  },
  basketButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    borderRadius: 8,
  },
  basketBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "#1d4ed8",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  basketBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#1e3a8a",
    borderRadius: 8,
  },
  listContent: {
    padding: 16,
  },
  coffeeItem: {
    flexDirection: "row",
    padding: 12,
  },
  coffeeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "rgba(30, 58, 138, 0.3)",
  },
  coffeeDetails: {
    flex: 1,
    marginLeft: 12,
  },
  coffeeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  coffeeName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  coffeePrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#93c5fd",
  },
  coffeeDescription: {
    fontSize: 12,
    color: "#60a5fa",
    marginTop: 4,
    marginBottom: 8,
  },
  coffeeFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
  },
  beansContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  beansIcon: {
    marginRight: 4,
  },
  beansText: {
    color: "#93c5fd",
    fontSize: 12,
  },
  buyButton: {
    backgroundColor: "#1d4ed8",
    borderRadius: 4,
    paddingVertical: 6,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
})

export default CoffeeListScreen
