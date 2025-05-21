import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native"
import { Feather } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context"
import Card from "../components/Card"
import ProgressBar from "../components/ProgressBar"
import { useUser } from "../context/UserContext"
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {
  const { user } = useUser()
  const navigation = useNavigation()

  if (!user) return null

  const { level, beans_total, next_level_beans, beans } = user
  const currentLevel = level ?? 0
  const nextBeans = next_level_beans ?? beans_total + 1
  const progress = Math.min(100, Math.round((beans_total / nextBeans) * 100))
  const beansToNext = nextBeans - beans_total

  return (
    <ImageBackground source={{ uri: "https://via.placeholder.com/1080x1920/ffffff/ffffff" }} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>BeanBrew</Text>
              <Text style={styles.subtitle}>Доброе утро, Любитель Кофе!</Text>
            </View>
            <View style={styles.beansContainer}>
              <Feather name="coffee" size={16} color="#fff" style={styles.beansIcon} />
              <Text style={styles.beansText}>{beans}</Text>
            </View>
          </View>

          <Card>
            <View style={styles.cardContent}>
              <View style={styles.levelHeader}>
                <Text style={styles.levelTitle}>Ваш уровень</Text>
                <Text style={styles.levelValue}>Уровень {currentLevel}</Text>
              </View>
              <ProgressBar value={progress} />
              <Text style={styles.levelInfo}>Заработай еще {beansToNext} до уровня {currentLevel + 1}</Text>
            </View>
          </Card>

          <Text style={styles.sectionTitle}>Ежедневные Игры</Text>
          <View style={styles.gamesContainer}>
            <Card style={styles.gameCard}>
              <View style={styles.gameContent}>
                <View style={styles.gameIconContainer}>
                  <Feather name="award" size={24} color="#fff" />
                </View>
                <Text style={styles.gameTitle}>Quiz</Text>
                <Text style={styles.gameReward}>До 300 beans</Text>
                <TouchableOpacity
                  style={styles.gameButton}
                  onPress={() => navigation.navigate("DailyQuiz")}
                >
                  <Text style={styles.gameButtonText}>Играть</Text>
                </TouchableOpacity>
              </View>
            </Card>

            <Card style={styles.gameCard}>
              <View style={styles.gameContent}>
                <View style={styles.gameIconContainer}>
                  <Feather name="gift" size={24} color="#fff" />
                </View>
                <Text style={styles.gameTitle}>Вращение</Text>
                <Text style={styles.gameReward}>До 1000 beans</Text>
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
              <Text style={styles.seeAllText}>Смотреть Все</Text>
            </TouchableOpacity>
          </View>

          <Card>
            <View style={styles.rewardContent}>
              <View style={styles.rewardIconContainer}>
                <Feather name="coffee" size={24} color="#fff" />
              </View>
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>Беспатный кофе</Text>
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
  background: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1 },
  scrollContent: { padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#166534" },
  subtitle: { fontSize: 14, color: "#4d7c0f" },
  beansContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16a34a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  beansIcon: { marginRight: 4 },
  beansText: { color: "#fff", fontWeight: "bold" },
  cardContent: { padding: 16 },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  levelTitle: { fontSize: 16, fontWeight: "600", color: "#166534" },
  levelValue: { color: "#4d7c0f" },
  levelInfo: { fontSize: 12, color: "#4d7c0f", marginTop: 8 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#166534",
    marginTop: 16,
    marginBottom: 12,
  },
  gamesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gameCard: { width: "48%" },
  gameContent: { padding: 16, alignItems: "center" },
  gameIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gameTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#166534",
    marginBottom: 4,
  },
  gameReward: { fontSize: 12, color: "#4d7c0f", marginBottom: 8 },
  gameButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
  },
  gameButtonText: { color: "#fff", fontWeight: "500" },
  rewardsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  seeAllText: { color: "#16a34a" },
  rewardContent: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  rewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#16a34a",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rewardInfo: { flex: 1 },
  rewardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#166534",
  },
  rewardDescription: {
    fontSize: 12,
    color: "#4d7c0f",
  },
  claimButton: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  claimButtonText: { color: "#fff", fontWeight: "500" },
})

export default HomeScreen
