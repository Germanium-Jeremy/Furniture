import BackHeader from "@/components/BackHeader";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Dimensions, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InvoiceScreen() {
     const mainStyles = useStyles()
     const { width, height } = Dimensions.get("window")
     const navigate = useRouter()
     
     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <BackHeader page="invoice" />

               <View style={{ flex: 0.9, justifyContent: 'space-evenly', paddingVertical: 70 }}>
                    <Text style={{ textAlign: 'center', color: '#333' }}>Here is your invoice. You can scan the QR code.</Text>

                    <Image source={require("@/assets/images/mainPic.png")} alt="Invoice" placeholder={require("@/assets/images/favicon.png")} style={{ width: width * 0.6, height: height * 0.4, alignSelf: 'center' }} />

                    <View style={{ gap: 10 }}>
                         <MainButton isLoading={false} message={"Download Invoice"} toDo={() => null} />
                         <Pressable onPress={() => navigate.replace("/(furniture)")}>
                              <Text style={{ fontSize: 16, color: '#FF9D00', textAlign: 'center' }}>Continue</Text>
                         </Pressable>
                    </View>
               </View>
          </SafeAreaView>
     )
}

