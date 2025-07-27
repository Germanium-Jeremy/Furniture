import BackHeader from "@/components/BackHeader";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import { Link, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationScreen() {
     const mainStyles = useStyles()
     const navigate = useRouter()

     return (
          <SafeAreaView style={[mainStyles.authScreens, { justifyContent: 'space-between', paddingVertical: 100 }]}>
               <BackHeader page="payment" />

               <View style={{ gap: 20, justifyContent: 'center', flex: 0.5 }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#333' }}>
                         Please consider  that this amount doesn’t include delivery price.
                         If you want the furniture to be delivered, you will pay delivery amount.
                    </Text>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#333' }}>
                         Note that delivery price depends on where you want the furniture to be delivered.
                         Or you can also come to pick the furniture.
                    </Text>
               </View>

               <View style={{ paddingTop: 30 }}>
                    <MainButton isLoading={false} message={'Select delivery location'} toDo={() => navigate.push("/(furniture)/foldered/map")} />
                    <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 10 }}>If you will pick them, you can
                         <Link href={"/(furniture)"} style={{ color: '#FF9D00' }}> skip</Link>.
                    </Text>
               </View>
               
               <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 40, paddingHorizontal: 60 }}>Check our
                    <Link href={"/(furniture)/foldered/map"} style={{ color: '#FF9D00' }}> location</Link> in case you want to pick them.
               </Text>
          </SafeAreaView>
     )
}