
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../services/api"
import { SafeAreaView } from "react-native-safe-area-context"

const EditProfileScreen = () => {
  const navigation = useNavigation()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem("token")
      const res = await api.get("profile/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setFirstName(res.data.first_name || "")
      setLastName(res.data.last_name || "")
      setAvatar(res.data.avatar || null)
    }
    fetchProfile()
  }, [])

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token")
    const formData = new FormData()
    formData.append("first_name", firstName)
    formData.append("last_name", lastName)
    if (avatar && avatar.startsWith("file://")) {
      formData.append("avatar", {
        uri: avatar,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any)
    }

    await api.put("profile/update/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })

    navigation.goBack()
  }

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300, height: 300 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      )
      setAvatar(manipResult.uri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.title}>Edit Profile</Text>

        <TouchableOpacity style={styles.avatarWrapper} onPress={pickAvatar}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>Add Avatar</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="First Name"
          placeholderTextColor="#64748b"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#64748b"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: "#166534",
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbf7d0",
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    padding: 12,
    color: "#166534",
    fontSize: 16,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#bbf7d0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#166534",
    fontWeight: "500",
  },
})

export default EditProfileScreen
