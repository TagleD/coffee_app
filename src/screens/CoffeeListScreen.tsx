"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";
import Badge from "../components/Badge";
import PurchaseModal from "../components/PurchaseModal";
import BasketModal from "../components/BasketModal";
import { getFullImageUrl } from "../services/GetfullImageUri";
import { useBasket } from "../context/BasketContext";
import { useUser } from "../context/UserContext" // добавь импорт
import api from "../services/api";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  bean_price: number;
  image: string;
  tags: { id: number; name: string; code: string }[];
};

type Tag = {
  id: number;
  name: string;
  code: string;
};

const CoffeeListScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const { totalItems } = useBasket();
  const user = useUser() // добавь это

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  useEffect(() => {
    fetchFilteredProducts()
  }, [])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await api.get("tags/"); // 👉 должен быть доступен эндпоинт
        setTags(res.data);
      } catch (err) {
        console.error("Ошибка загрузки тегов:", err);
      }
    };

    fetchTags();
  }, []);

  const openPurchaseModal = (product: Product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const fetchFilteredProducts = async (search = "", tagCode: string | null = null) => {
    try {
      const params: any = {}
      if (search) params.search = search
      if (tagCode) params.tag = tagCode  // ✅ теперь передаём CODE
  
      const res = await api.get("products/", { params })
      setFilteredProducts(res.data)
    } catch (err) {
      console.error("Ошибка фильтрации:", err)
    }
  }

  const handleSearch = (text: string) => {
    setSearchQuery(text)
    fetchFilteredProducts(text, selectedTag?.code ?? null) // ✅ передаём code
  }

  const handleTagSelect = (tag: Tag | null) => {
    setSelectedTag(tag);
    setIsTagDropdownOpen(false);
  
    const code = tag?.code ?? null;
    fetchFilteredProducts(searchQuery, code);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
    setSelectedProduct(null);
  };

  const openBasketModal = () => {
    setIsBasketModalOpen(true);
  };

  const closeBasketModal = () => {
    setIsBasketModalOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* — Search and filters — */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={16}
            color="#60a5fa"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Найти любимый напиток"
            placeholderTextColor="#60a5fa"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <TouchableOpacity style={styles.basketButton} onPress={openBasketModal}>
          <Feather name="shopping-bag" size={20} color="#60a5fa" />
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
          <Feather name="filter" size={20} color="#60a5fa" />
        </TouchableOpacity>
        {isTagDropdownOpen && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              onPress={() => handleTagSelect(null)}
              style={[styles.dropdownItem, { backgroundColor: "#1e40af" }]}
            >
              <Text style={[styles.dropdownText, { fontWeight: "bold" }]}>
                Все теги
              </Text>
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

      {/* — Product list — */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.coffeeItem}>
              <Image
                source={{ uri: getFullImageUrl(item.image) }}
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
                    <Feather
                      name="coffee"
                      size={12}
                      color="#93c5fd"
                      style={styles.beansIcon}
                    />
                    <Text style={styles.beansText}>{item.bean_price}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.buyButton}
                  onPress={() => openPurchaseModal(item)}
                >
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
        onClose={closePurchaseModal}
        userBeans={user?.user?.beans ?? 0}
      />

      <BasketModal visible={isBasketModalOpen} onClose={closeBasketModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  empty: {
    color: "#60a5fa",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  card: {
    backgroundColor: "#1e3a8a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: "#60a5fa",
    borderWidth: 1,
  },
  date: {
    color: "#60a5fa",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "500",
  },
  beans: {
    color: "#fbbf24",
    fontSize: 13,
    marginBottom: 8,
  },
  item: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 4,
  },
  total: {
    color: "#93c5fd",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 8,
    textAlign: "right",
  },
})

export default CoffeeListScreen;
