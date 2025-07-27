import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStyles from "./RepeatedCss";
import { useRouter } from "expo-router";

export default function Header() {
     const mainStyles = useStyles()
     const navigate  = useRouter()

     return (
          <SafeAreaView style={[styles.container]}>
               <Ionicons name="menu" size={25} color={'#000'} />
               <Text style={[mainStyles.furniture, styles.furniture]}>Furniture</Text>

               <View style={[styles.between]}>
                    <Ionicons name="search" size={25} color={'#000'} />
                    <Ionicons name="cart" size={25} color={'#000'} onPress={() => navigate.push("/(furniture)/foldered/cart")} />
               </View>
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