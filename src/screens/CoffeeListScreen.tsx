"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import Card from "../components/Card"
import Badge from "../components/Badge"
import PurchaseModal from "../components/PurchaseModal"
import BasketModal from "../components/BasketModal"
import { getFullImageUrl } from "../services/GetfullImageUri"
import { useBasket } from "../context/BasketContext"
import { useUser } from "../context/UserContext"
import api from "../services/api"

const CoffeeListScreen = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false)
  const { totalItems } = useBasket()
  const user = useUser()

  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null)
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false)

  useEffect(() => {
    fetchFilteredProducts()
  }, [])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("tags/")
        setTags(res.data)
      } catch (err) {
        console.error("Ошибка загрузки тегов:", err)
      }
    }
    fetchTags()
  }, [])

  const fetchFilteredProducts = async (search = "", tagCode = null) => {
    try {
      const params = {}
      if (search) params.search = search
      if (tagCode) params.tag = tagCode

      const res = await api.get("products/", { params })
      setFilteredProducts(res.data)
    } catch (err) {
      console.error("Ошибка фильтрации:", err)
    }
  }

  const handleSearch = (text) => {
    setSearchQuery(text)
    fetchFilteredProducts(text, selectedTag?.code ?? null)
  }

  const handleTagSelect = (tag) => {
    setSelectedTag(tag)
    setIsTagDropdownOpen(false)
    fetchFilteredProducts(searchQuery, tag?.code ?? null)
  }

  const openPurchaseModal = (product) => {
    setSelectedProduct(product)
    setIsPurchaseModalOpen(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={16} color="#166534" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Искать"
            placeholderTextColor="#4d7c0f"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        <TouchableOpacity style={styles.basketButton} onPress={() => setIsBasketModalOpen(true)}>
          <Feather name="shopping-bag" size={20} color="#166534" />
          {totalItems > 0 && (
            <View style={styles.basketBadge}>
              <Text style={styles.basketBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
        >
          <Feather name="filter" size={20} color="#166534" />
        </TouchableOpacity>

        {isTagDropdownOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => handleTagSelect(null)}
              style={[styles.dropdownItem, { backgroundColor: "#dcfce7" }]}
            >
              <Text style={[styles.dropdownText, { fontWeight: "bold" }]}>Все</Text>
            </TouchableOpacity>
            {tags.map((tag) => (
              <TouchableOpacity
                key={tag.id}
                onPress={() => handleTagSelect(tag)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{tag.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.coffeeItem}>
              <Image
                source={{ uri: item.image ? getFullImageUrl(item.image) : "https://via.placeholder.com/80" }}
                style={styles.coffeeImage}
              />
              <View style={styles.coffeeDetails}>
                <View style={styles.coffeeHeader}>
                  <Text style={styles.coffeeName}>{item.name}</Text>
                  <Text style={styles.coffeePrice}>{item.price} ₸</Text>
                </View>
                <Text style={styles.coffeeDescription} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.coffeeFooter}>
                  <View style={styles.tagsContainer}>
                    {item.tags.map((tag) => (
                      <Badge key={tag.id} label={tag.name} />
                    ))}
                  </View>
                  <View style={styles.beansContainer}>
                    <Feather name="coffee" size={12} color="#166534" style={styles.beansIcon} />
                    <Text style={styles.beansText}>{item.bean_price}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={() => openPurchaseModal(item)}>
                  <Text style={styles.buyButtonText}>Купить</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        )}
      />

      <PurchaseModal
        coffee={selectedProduct}
        visible={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        userBeans={user?.user?.beans ?? 0}
      />

      <BasketModal visible={isBasketModalOpen} onClose={() => setIsBasketModalOpen(false)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, alignItems: "center" },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcfce7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: "#166534", fontSize: 14 },
  basketButton: {
    width: 40, height: 40, justifyContent: "center", alignItems: "center",
    marginLeft: 8, borderWidth: 1, borderColor: "#dcfce7", borderRadius: 8,
  },
  basketBadge: {
    position: "absolute", top: -5, right: -5,
    backgroundColor: "#16a34a", borderRadius: 10, width: 20, height: 20,
    justifyContent: "center", alignItems: "center",
  },
  basketBadgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  filterButton: {
    width: 40, height: 40, justifyContent: "center", alignItems: "center",
    marginLeft: 8, borderWidth: 1, borderColor: "#dcfce7", borderRadius: 8,
  },
  dropdown: {
    position: "absolute", top: 64, right: 16,
    backgroundColor: "#f0fdf4", borderRadius: 8,
    borderColor: "#16a34a", borderWidth: 1, zIndex: 100,
  },
  dropdownItem: {
    padding: 12, borderBottomWidth: 1, borderBottomColor: "#dcfce7",
  },
  dropdownText: { color: "#166534" },
  listContent: { padding: 16 },
  coffeeItem: { flexDirection: "row", padding: 12 },
  coffeeImage: {
    width: 80, height: 80, borderRadius: 8,
    backgroundColor: "#f0fdf4",
  },
  coffeeDetails: { flex: 1, marginLeft: 12 },
  coffeeHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "flex-start",
  },
  coffeeName: {
    fontSize: 16, fontWeight: "500", color: "#166534",
    flex: 1, marginRight: 8,
  },
  coffeePrice: { fontSize: 16, fontWeight: "bold", color: "#166534" },
  coffeeDescription: {
    fontSize: 12, color: "#4d7c0f", marginTop: 4, marginBottom: 8,
  },
  coffeeFooter: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 8,
  },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", flex: 1 },
  beansContainer: { flexDirection: "row", alignItems: "center" },
  beansIcon: { marginRight: 4 },
  beansText: { color: "#166534", fontSize: 12 },
  buyButton: {
    backgroundColor: "#16a34a", borderRadius: 4,
    paddingVertical: 6, alignItems: "center",
  },
  buyButtonText: {
    color: "#fff", fontSize: 12, fontWeight: "500",
  },
})

export default CoffeeListScreen
