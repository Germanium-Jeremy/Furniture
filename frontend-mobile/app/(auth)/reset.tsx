import InputsComponent from "@/components/Inputs";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { UserContect } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPasswordScreen() {
     const mainStyles = useStyles()
     const { token: tokenParam } = useLocalSearchParams<{ token: string }>();
     const [token, setToken] = useState("")
     console.log("Token: ", token)
     const { userNewPassword, setUserNewPassword, userConfirmPassword, setUserConfirmPassword, gotError, loading, handleReset } = useContext(UserContect)
     
     useEffect(() => {
          if (!tokenParam) return

          if (tokenParam.includes('furnitureshop://reset-password?token=')) {
               const url = new URL(tokenParam.replace('furnitureshop:/', 'http:/')); // Convert to valid URL
               const params = new URLSearchParams(url.search);
               const tokenFromUrl = params.get('token');
               if (tokenFromUrl) {
                   console.log("Extracted token:", tokenFromUrl);
                   setToken(tokenFromUrl);
                   return;
               }
          }
           
           // If it's just a plain token
          console.log("Using token as is:", tokenParam);
          setToken(tokenParam);
     }, [tokenParam])

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic2.png")} style={mainStyles.mainPic} />
               
               <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={mainStyles.furniture}>Furniture</Text>

                    <View style={[styles.container]}>
                         <InputsComponent changing={setUserNewPassword} content={userNewPassword} placeholder="New Password" protected />
                         <InputsComponent changing={setUserConfirmPassword} content={userConfirmPassword} placeholder="Confirm Password" protected />
                    </View>


                    <SecondButton isLoading={loading} message={"Reset"} toDo={() => handleReset(token)} />
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