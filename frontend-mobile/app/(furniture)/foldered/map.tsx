import BackHeader from "@/components/BackHeader";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapScreen() {
     const mainStyles = useStyles()
     const navigate = useRouter()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <BackHeader page="payment" />

               <Image source={require("@/assets/images/mainPic.png")} alt="Map" placeholder={require("@/assets/images/favicon.png")} style={[styles.map]} />
               

               <View style={[styles.interactions]}>
                    <View style={[styles.amountDisplay]}>
                         <Text style={{ fontSize: 14, color: '#333' }}>Transport amount: </Text>
                         <Text style={{ fontSize: 14, fontWeight: 600 }}>3,200 Rwf</Text>
                    </View>
                    <MainButton isLoading={false} message={'Select location'} toDo={() => navigate.push("/(furniture)/foldered/options")} />
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     amountDisplay: {
          borderRadius: 10,
          borderWidth: 2,
          borderBlockColor: '#000',
          backgroundColor: 'transparent',
          paddingHorizontal: 5,
          paddingVertical: 7,
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     interactions: {
          paddingVertical: 20,
          paddingHorizontal: 20,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          gap: 15,
     },
     map: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
     },
})