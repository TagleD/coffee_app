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
  const { setUser } = useUser()

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
    setUser(null)
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
              <Feather name="coffee" size={40} color="#fff" />
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{fullName}</Text>
            <Text style={styles.profileSubtitle}>Энтузиаст Кофе</Text>
            <View style={styles.beansContainer}>
              <Feather name="coffee" size={16} color="#166534" style={styles.beansIcon} />
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
                <Text style={styles.membershipDate}>С Октября 2023 года</Text>
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
              <Feather name="clock" size={20} color="#16a34a" style={styles.menuIcon} />
              <Text style={styles.menuText}>История Покупок</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#16a34a" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="gift" size={20} color="#16a34a" style={styles.menuIcon} />
              <Text style={styles.menuText}>Награды</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#16a34a" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="calendar" size={20} color="#16a34a" style={styles.menuIcon} />
              <Text style={styles.menuText}>Подписки</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#16a34a" />
          </TouchableOpacity>
        </Card>

        <Text style={styles.sectionTitle}>Настройки</Text>
        <Card>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("EditProfile")}>
            <View style={styles.menuItemLeft}>
              <Feather name="settings" size={20} color="#16a34a" style={styles.menuIcon} />
              <Text style={styles.menuText}>Редактирование Профиля</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#16a34a" />
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
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { padding: 16 },
  profileHeader: { flexDirection: "row", marginBottom: 24 },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    overflow: "hidden",
  },
  avatarImage: { width: 80, height: 80, borderRadius: 40 },
  profileInfo: { justifyContent: "center" },
  profileName: { fontSize: 20, fontWeight: "bold", color: "#166534", marginBottom: 4 },
  profileSubtitle: { fontSize: 14, color: "#4d7c0f", marginBottom: 8 },
  beansContainer: { flexDirection: "row", alignItems: "center" },
  beansIcon: { marginRight: 4 },
  beansCount: { color: "#166534", fontWeight: "bold", marginRight: 4 },
  beansLabel: { color: "#4d7c0f", fontSize: 12 },
  membershipCard: { padding: 16 },
  membershipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  membershipTitle: { fontSize: 16, fontWeight: "600", color: "#166534" },
  membershipDate: { fontSize: 12, color: "#4d7c0f" },
  membershipProgress: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  membershipLevel: { fontSize: 12, color: "#4d7c0f" },
  membershipNext: { fontSize: 12, color: "#4d7c0f" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#166534",
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
  menuItemLeft: { flexDirection: "row", alignItems: "center" },
  menuIcon: { marginRight: 12 },
  menuText: { fontSize: 16, color: "#166534" },
  divider: { height: 1, backgroundColor: "#e5e7eb" },
  signOutButton: {
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  signOutText: { color: "#16a34a", fontSize: 16, fontWeight: "500" },
})

export default ProfileScreen
