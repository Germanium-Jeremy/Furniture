import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthOnboarding() {
     const navigate = useRouter()
     const mainStyles = useStyles()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic.png")} style={mainStyles.mainPic} />

               <View style={styles.mainTextContainer}>
                    <Text style={styles.mainText}>Finding the Perfect</Text>
                    <Text style={styles.mainText}>Furniture for Your</Text>
                    <Text style={styles.mainText}>Home </Text>
               </View>

               <View style={styles.buttons}>
                    <SecondButton isLoading={false} message={"Login"} toDo={() => navigate.replace("/(auth)/login")} />
                    <MainButton isLoading={false} message={"Get started"} toDo={() => navigate.replace("/(furniture)")} />
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     buttons: {
          flexDirection: 'column',
          gap: 10,
          position: 'absolute',
          bottom: 30,
          right: 20,
          left: 20
     },
     mainText: {
          fontSize: 30,
          color: 'white',
     },
     mainTextContainer: {
          position: 'absolute',
          bottom: 150,
     }
})