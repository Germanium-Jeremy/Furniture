import BackHeader from "@/components/BackHeader";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpecialOrderPageScreen() {
     const mainStyles = useStyles()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <BackHeader page="Order" />

               <View style={{ flex: 0.9, justifyContent: 'space-evenly', paddingVertical: 70 }}>
                    <Text style={{ textAlign: 'center' }}>You can contact us on
                         <Link href={"/(others)/special"} style={{ color: '#FF9D00'}}> +250790000000 </Link>or
                         <Link href={"/(others)/special"} style={{ color: '#FF9D00'}}> furniture@email.com </Link>
                         for more information.
                    </Text>

                    <View style={{ gap: 20 }}>
                         <TextInput multiline style={[styles.multiline]} placeholder="Describe your furniture" placeholderTextColor={'#333'}
                              numberOfLines={6}
                         />

                         <Pressable style={[styles.multiline]}>
                              <Text style={{ color: '#333', paddingVertical: 5 }}>Select image as reference if applicable</Text>
                         </Pressable>
                    </View>

                    <MainButton isLoading={false} message={"Submit Order"} toDo={() => null} />
               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     multiline: {
          borderRadius: 5,
          borderWidth: 2,
          borderColor: '#000',
          paddingHorizontal: 10,
          paddingVertical: 5,
     }
})