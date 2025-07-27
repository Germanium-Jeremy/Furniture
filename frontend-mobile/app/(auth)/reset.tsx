import InputsComponent from "@/components/Inputs";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
     const mainStyles = useStyles()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic2.png")} style={mainStyles.mainPic} />
               
               <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={mainStyles.furniture}>Furniture</Text>

                    <View style={[styles.container]}>
                         <InputsComponent changing={() => null} content="" placeholder="New Password" protected />
                         <InputsComponent changing={() => null} content="" placeholder="Confirm Password" protected />
                    </View>


                    <SecondButton isLoading={false} message={"Reset"} toDo={() => null} />
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
          marginTop: 40
     }
})