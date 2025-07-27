import BackHeader from "@/components/BackHeader";
import useStyles from "@/components/RepeatedCss";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OptionScreen() {
     const mainStyles = useStyles()
     const navigate = useRouter()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <BackHeader page="payment" />

               <View style={{ flex: 0.9, justifyContent: 'space-evenly', paddingVertical: 70 }}>
                    <Text style={{ textAlign: 'center', color: '#333' }}>Choose a payment method you want.</Text>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                         <Text style={{ fontSize: 14, color: '#333' }}>Total: </Text>
                         <Text style={{ fontSize: 14, fontWeight: 600 }}>3,200 Rwf</Text>
                    </View>

                    <View style={{ gap: 10 }}>
                         <Text style={[styles.option, { backgroundColor: '#FF0' }]} onPress={() => navigate.push("/(furniture)/foldered/invoice")}>Momo Pay</Text>
                         <Text style={[styles.option, { backgroundColor: '#F00' }]} onPress={() => navigate.push("/(furniture)/foldered/invoice")}>Airtel Money</Text>
                         <Text style={[styles.option, { backgroundColor: '#00F' }]} onPress={() => navigate.push("/(furniture)/foldered/invoice")}>Tin Number</Text>
                         <Text style={[styles.option, { backgroundColor: '#555' }]} onPress={() => navigate.push("/(furniture)/foldered/invoice")}>PayPal</Text>
                    </View>
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     option: {
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 30,
          textAlign: 'center',
          color: '#FFF',
          fontWeight: 600,
          fontSize: 20
     }
})