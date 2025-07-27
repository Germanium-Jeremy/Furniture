import InputsComponent from "@/components/Inputs";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResendScreen() {
     const mainStyles = useStyles()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic2.png")} style={mainStyles.mainPic} />
               
               <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={mainStyles.furniture}>Furniture</Text>
                    <Text style={[styles.mainText]}>Reset link sent to your email. If you didn’t receive the email, we can resend it.</Text>

                    <SecondButton isLoading={false} message={"Resend"} toDo={() => null} />
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          flexDirection: 'column',
          marginVertical: 50,
          gap: 10,
     },
     mainText: {
          color: 'white',
          fontSize: 20,
          textAlign: 'center',
          marginTop: 40,
          marginBottom: 30,
     }
})