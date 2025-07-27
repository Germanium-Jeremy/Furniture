import Header from "@/components/Header";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FurnitureScreen() {
     const mainStyles = useStyles()

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Header />

               <View style={[styles.imagePlaceholder]}>
                    <Image source={require("@/assets/images/favicon.png")} contentFit="contain" alt="" placeholder={require("@/assets/images/favicon.png")} style={{ height: '100%', width: '100%' }} />
                    <Ionicons name="heart-outline" size={25} color={'#000'} style={[styles.heart]} />
               </View>

               <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginVertical: 20 }}>
                    <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: '#FF9D00' }}></View>
                    <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: '#FFBF11' }}></View>
                    <View style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: '#FFDF88' }}></View>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                         <Text style={{ fontSize: 18, fontWeight: 600 }}>Lorem Ipsum</Text>
                         <Text style={{ fontSize: 12, fontWeight: 400, color: '#222' }}>Lorem Ipsum</Text>
                    </View>
                    <Text style={{ fontSize: 18, fontWeight: 600 }}>Lorem Ipsum</Text>
               </View>
               <View style={{ marginVertical: 20, gap: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 300, color: '#222' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum quibusdam consequuntur odio, doloribus quasi quisquam fugit iusto labore et pariatur cupiditate dolores quidem vero ullam magni dolorum? Explicabo, in?</Text>
                    <Text style={{ fontSize: 15, fontWeight: 300, color: '#222' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum quibusdam consequuntur odio, doloribus quasi quisquam fugit iusto labore et pariatur cupiditate dolores quidem vero ullam magni dolorum? Explicabo, in?</Text>
               </View>
               
               <MainButton isLoading={false} message={'Add to cart'} toDo={() => null} />
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     imagePlaceholder: {
          width: '110%',
          height: 300,
          maxHeight: 300,
          minHeight: 200,
          marginLeft: -20,
          marginTop: 30,
     },
     heart: {
          position: 'absolute',
          bottom: 20,
          right: 20,
     },
})