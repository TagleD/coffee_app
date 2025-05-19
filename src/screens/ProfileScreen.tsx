
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"
import Card from "../components/Card"
import ProgressBar from "../components/ProgressBar"
import { useNavigation } from "@react-navigation/native"
import { getFullImageUrl } from "../services/GetfullImageUri"
import { useUser } from "../context/UserContext"



const ProfileScreen = () => {
  const [profile, setProfile] = useState(null)
  const navigation = useNavigation()
  const { setUser } = useUser() // добавить

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const res = await api.get("profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setProfile(res.data)
      } catch (err) {
        console.error("Ошибка загрузки профиля", err)
      }
    }

    loadProfile()
  }, [])

  const handleSignOut = async () => {
    await AsyncStorage.clear()
    setUser(null) // 🟢 сбросим пользователя в контексте
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  }

  const fullName = `${profile?.first_name || "Имя"} ${profile?.last_name || "Фамилия"}`
  const beans = profile?.beans ?? 0
  const avatarUri = getFullImageUrl(profile?.avatar || "")


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
            ) : (
              <Feather name="coffee" size={40} color="#93c5fd" />
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{fullName}</Text>
            <Text style={styles.profileSubtitle}>Coffee Этузиаст</Text>
            <View style={styles.beansContainer}>
              <Feather name="coffee" size={16} color="#93c5fd" style={styles.beansIcon} />
              <Text style={styles.beansCount}>{beans}</Text>
              <Text style={styles.beansLabel}>beans</Text>
            </View>
          </View>
        </View>

        <Card>
          <View style={styles.membershipCard}>
            <View style={styles.membershipHeader}>
              <View>
                <Text style={styles.membershipTitle}>Золотой участник</Text>
                <Text style={styles.membershipDate}>С Октября 2023</Text>
              </View>
              <Feather name="award" size={24} color="#fbbf24" />
            </View>
            <ProgressBar value={65} />
            <View style={styles.membershipProgress}>
              <Text style={styles.membershipLevel}>Текущий: Золото</Text>
              <Text style={styles.membershipNext}>Следующий: Платинка (5,000 beans)</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Аккаунт</Text>
        <Card>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("OrderHistory")}>
            <View style={styles.menuItemLeft}>
              <Feather name="clock" size={20} color="#60a5fa" style={styles.menuIcon} />
              <Text style={styles.menuText}>История Покупок</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#60a5fa" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="gift" size={20} color="#60a5fa" style={styles.menuIcon} />
              <Text style={styles.menuText}>Награды</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#60a5fa" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="credit-card" size={20} color="#60a5fa" style={styles.menuIcon} />
              <Text style={styles.menuText}>Payment Methods</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#60a5fa" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="calendar" size={20} color="#60a5fa" style={styles.menuIcon} />
              <Text style={styles.menuText}>Подписки</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#60a5fa" />
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <Card>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <View style={styles.menuItemLeft}>
              <Feather name="settings" size={20} color="#60a5fa" style={styles.menuIcon} />
              <Text style={styles.menuText}>Редактирование Аккаунта</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#60a5fa" />
          </TouchableOpacity>
        </Card>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Выйти</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContent: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    marginBottom: 24,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1e3a8a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  profileSubtitle: {
    fontSize: 14,
    color: "#60a5fa",
    marginBottom: 8,
  },
  beansContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  beansIcon: {
    marginRight: 4,
  },
  beansCount: {
    color: "#fff",
    fontWeight: "bold",
    marginRight: 4,
  },
  beansLabel: {
    color: "#60a5fa",
    fontSize: 12,
  },
  membershipCard: {
    padding: 16,
  },
  membershipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  membershipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  membershipDate: {
    fontSize: 12,
    color: "#93c5fd",
  },
  membershipProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  membershipLevel: {
    fontSize: 12,
    color: "#93c5fd",
  },
  membershipNext: {
    fontSize: 12,
    color: "#93c5fd",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    color: "#fff",
  },
  divider: {
    height: 1,
    backgroundColor: "#1e3a8a",
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: "#1e40af",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  signOutText: {
    color: "#60a5fa",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default ProfileScreen
