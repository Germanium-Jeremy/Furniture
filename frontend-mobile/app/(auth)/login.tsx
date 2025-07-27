import InputsComponent from "@/components/Inputs";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { UserContect } from "@/context/AuthContext";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
     const mainStyles = useStyles()
     const { userEmail, userPassword, setUserEmail, setUserPassword, loading, gotError, handleLogin } = useContext(UserContect)

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic2.png")} style={mainStyles.mainPic} />
               
               <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={mainStyles.furniture}>Furniture</Text>

                    <View style={[styles.container]}>
                         <InputsComponent changing={setUserEmail} content={userEmail} placeholder="Email" protected={false} />
                         <InputsComponent changing={setUserPassword} content={userPassword} placeholder="Password" protected />
                    </View>

                    <Link href={'/(auth)/forgot'} style={{ textAlign: 'right', fontSize: 16, color: '#FF9D00', marginBottom: 30 }}>Forgot password?</Link>

                    <Text style={{ fontSize: 16, color: '#F11', textAlign: 'center', marginBottom: 10, fontWeight: 500 }}>{ gotError.toLocaleLowerCase() }</Text>

                    <SecondButton isLoading={loading} message={"Login"} toDo={handleLogin} />

                    <Text style={{ textAlign: 'center', fontSize: 16, marginVertical: 30, color: 'white' }}>Don't have an account? <Link href={'/(auth)/register'} style={{ color: "#FF9D00" }}>Register</Link> </Text>
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          flexDirection: 'column',
          marginVertical: 50,
          gap: 10,
     }
})