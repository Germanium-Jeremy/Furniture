import Header from "@/components/Header";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import FurnitureInterface, { Furnitures } from "@/interfaces/furnitureSample";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminLandingScreen() {
     const mainStyles = useStyles()
     const navigate = useRouter()

     const renderItem = ({ item }: { item: FurnitureInterface }) => {
          return (
               <View style={[mainStyles.furnitureItem]}>
                    <Pressable style={{ width: '50%', height: '100%' }} onPress={() => navigate.push("/(furniture)/furniture")}>
                         <Image source={item.image} style={{ width: '100%', height: '100%' }} contentFit="contain" alt={item.name} placeholder={require("@/assets/images/favicon.png")} />
                    </Pressable>
                    <View style={[mainStyles.furnitureContent]}>
                         <View style={[mainStyles.furnitureContentTop]}>
                              <Ionicons name="heart" size={25} color={'#000'} />
                              <Ionicons name="cart" size={25} color={'#000'} />
                         </View>

                         <View>
                              <Text style={{ fontSize: 18, fontWeight: 600 }}>{ item.name }</Text>
                              <Text style={{ fontSize: 12, fontWeight: 400, color: '#222' }}>{ item.category }</Text>
                         </View>

                         <Text style={{ fontSize: 18, fontWeight: 600 }}>{ item.price.toString().split('').join(',') } Rwf</Text>
                    </View>
               </View>
          )
     }

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <Header role="admin" />

               <FlatList data={Furnitures} renderItem={renderItem} keyExtractor={(item) => item.name} showsVerticalScrollIndicator={false} style={{ marginTop: 30 }} />
               
               <View style={{ paddingTop: 20 }}>
                    <MainButton isLoading={false} message={"Add furniture"} toDo={() => null} />
               </View>
          </SafeAreaView>
     )
}