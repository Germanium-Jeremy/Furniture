import InputsComponent from "@/components/Inputs";
import useStyles from "@/components/RepeatedCss";
import SecondButton from "@/components/SecondButton";
import { UserContect } from "@/context/AuthContext";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { ReactNode, useContext } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CustomCheckboxProps {
     isChecked: boolean;
     onToogle: () => void;
     label: ReactNode;
}

export default function RegisterScreen() {
     const mainStyles = useStyles()
     const { userEmail, userName, userPassword, setUserEmail, setUserName, setUserPassword, loading, gotError, handleRegister } = useContext(UserContect)

     const CheckBox: React.FC<CustomCheckboxProps> = ({ label, onToogle, isChecked }) => {
          return <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, gap: 15, justifyContent: 'center' }} onPress={onToogle} >
               <View style={[styles.checkbox, isChecked && { backgroundColor: 'white' }]}>
                    {isChecked && <Text style={styles.checkmark}>✔</Text>}
               </View>
               { label }
          </Pressable>
     }

     return (
           <SafeAreaView style={[mainStyles.authScreens]}>
               <Image source={require("@/assets/images/mainPic2.png")} style={mainStyles.mainPic} />
               
               <View style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={mainStyles.furniture}>Furniture</Text>

                    <View style={[styles.container]}>
                         <InputsComponent changing={setUserName} content={userName} placeholder="Full names" protected={false} />
                         <InputsComponent changing={setUserEmail} content={userEmail} placeholder="Email" protected={false} />
                         <InputsComponent changing={setUserPassword} content={userPassword} placeholder="Password" protected />
                    </View>

                    <CheckBox isChecked={false} label={
                         <Text style={{ textAlign: 'center', fontSize: 16, color: 'white' }}>Agree to our <Link href={'/(auth)/login'} style={{ color: "#FF9D00" }}>terms of services?</Link> </Text>
                    } onToogle={() => null} />
                    
                    <Text style={{ fontSize: 16, color: '#F11', textAlign: 'center', marginBottom: 10, fontWeight: 500 }}>{ gotError.toLocaleLowerCase() }</Text>

                    <SecondButton isLoading={loading} message={"Register"} toDo={handleRegister} />
                    
                    <Text style={{ textAlign: 'center', fontSize: 16, marginVertical: 30, color: 'white' }}>Have an account? <Link href={'/(auth)/login'} style={{ color: "#FF9D00" }}>Login</Link> </Text>
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
     checkbox: {
          width: 20,
          height: 20,
          borderWidth: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
     },
     checkmark: {
          color: "white",
          fontSize: 18,
     },
     label: {
          marginLeft: 8,
          fontSize: 16,
     },
})