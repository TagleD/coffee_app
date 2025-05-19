import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import Card from "../components/Card"
import ProgressBar from "../components/ProgressBar"
import { useUser } from "../context/UserContext"
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {
  const { user } = useUser()

  if (!user) return null // Защита, если профиль ещё не подгружен

  const { level, next_level_beans, beans_total } = user

  const currentLevel = level ?? 0
  const nextBeans = next_level_beans ?? beans_total + 1 // Чтобы не было деления на 0
  const progress = Math.min(100, Math.round((beans_total / nextBeans) * 100))
  const beansToNext = nextBeans - beans_total
  const navigation = useNavigation()

  return (
    <ImageBackground source={{ uri: "https://via.placeholder.com/1080x1920/000000/000000" }} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>BeanBrew</Text>
              <Text style={styles.subtitle}>Доброе утро, Ценитель Кофе!</Text>
            </View>
            <View style={styles.beansContainer}>
              <Feather name="coffee" size={16} color="#93c5fd" style={styles.beansIcon} />
              <Text style={styles.beansText}><Text style={styles.beansText}>{user?.beans ?? 0}</Text></Text>
            </View>
          </View>

          <Card>
            <View style={styles.cardContent}>
              <View style={styles.levelHeader}>
                <Text style={styles.levelTitle}>Уровень</Text>
                <Text style={styles.levelValue}>Level {currentLevel}</Text>
              </View>
              <ProgressBar value={progress} />
              <Text style={styles.levelInfo}>Заработой еще {beansToNext} beans чтобы достичь {currentLevel + 1} уровня</Text>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Ежедневные игры</Text>
          <View style={styles.gamesContainer}>
            <Card style={styles.gameCard}>
              <View style={styles.gameContent}>
                <View style={styles.gameIconContainer}>
                  <Feather name="award" size={24} color="#93c5fd" />
                </View>
                <Text style={styles.gameTitle}>Квиз</Text>
                <Text style={styles.gameReward}>+100 beans</Text>
                <TouchableOpacity style={styles.gameButton}>
                  <Text style={styles.gameButtonText}>Играть</Text>
                </TouchableOpacity>
              </View>
            </Card>

            <Card style={styles.gameCard}>
              <View style={styles.gameContent}>
                <View style={styles.gameIconContainer}>
                  <Feather name="gift" size={24} color="#93c5fd" />
                </View>
                <Text style={styles.gameTitle}>Вращение</Text>
                <Text style={styles.gameReward}>до 1000 beans</Text>
                <TouchableOpacity
                  style={styles.gameButton}
                  onPress={() => navigation.navigate("DailySpin")}
                >
                  <Text style={styles.gameButtonText}>Крутить</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          <View style={styles.rewardsHeader}>
            <Text style={styles.sectionTitle}>Награды</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Смотреть все</Text>
            </TouchableOpacity>
          </View>

          <Card>
            <View style={styles.rewardContent}>
              <View style={styles.rewardIconContainer}>
                <Feather name="coffee" size={24} color="#93c5fd" />
              </View>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>Бесплатный кофе</Text>
                <Text style={styles.rewardDescription}>1,000 beans</Text>
              </View>
              <TouchableOpacity style={styles.claimButton}>
                <Text style={styles.claimButtonText}>Забрать</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#60a5fa",
  },
  beansContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e3a8a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  beansIcon: {
    marginRight: 4,
  },
  beansText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardContent: {
    padding: 16,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  levelValue: {
    color: "#93c5fd",
  },
  levelInfo: {
    fontSize: 12,
    color: "#93c5fd",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginTop: 16,
    marginBottom: 12,
  },
  gamesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameCard: {
    width: "48%",
  },
  gameContent: {
    padding: 16,
    alignItems: "center",
  },
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1e40af",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
    marginBottom: 4,
  },
  gameReward: {
    fontSize: 12,
    color: "#93c5fd",
    marginBottom: 8,
  },
  gameButton: {
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  gameButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  rewardsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  seeAllText: {
    color: "#60a5fa",
  },
  rewardContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1e40af",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  rewardDescription: {
    fontSize: 12,
    color: "#93c5fd",
  },
  claimButton: {
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  claimButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
})

export default HomeScreen;
