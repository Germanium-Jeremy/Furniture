import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStyles from "./RepeatedCss";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BackHeaderInterface {
     page: string
}

export default function BackHeader({ page }: BackHeaderInterface) {
     const mainStyles = useStyles()
     const navigate = useRouter()

     return (
          <SafeAreaView style={[styles.container]}>
               <Ionicons name="arrow-back" size={25} color={'#000'} onPress={() => navigate.back()} />
               <Text style={[mainStyles.furniture, styles.furniture]}>Furniture { page }</Text>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          paddingVertical: 5,
          paddingHorizontal: 20,
     },
     furniture: {
          marginTop: 0,
          fontSize: 30,
     },
     between: {
          gap: 20,
          flexDirection: 'row',
     },
})