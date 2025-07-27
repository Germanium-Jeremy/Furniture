import InputsComponent from "@/components/Inputs";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { UserContect } from "@/context/AuthContext";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
     const mainStyles = useStyles()
     const { userEmail, setUserEmail, gotError, loading, handleGetResetLink } = useContext(UserContect)

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic2.png")} style={mainStyles.mainPic} />
               
               <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={mainStyles.furniture}>Furniture</Text>
                    <Text style={[styles.mainText]}>Enter email and receive a reset link through the email.</Text>

                    <View style={[styles.container]}>
                         <InputsComponent changing={setUserEmail} content={userEmail} placeholder="Enter Email" protected={false} />
                    </View>

                    <Text style={{ fontSize: 16, color: '#F11', textAlign: 'center', marginBottom: 10, fontWeight: 500 }}>{ gotError.toLocaleLowerCase() }</Text>

                    <SecondButton isLoading={loading} message={"Get reset link"} toDo={handleGetResetLink} />
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