import BackHeader from "@/components/BackHeader";
import MainButton from "@/components/MainButton";
import useStyles from "@/components/RepeatedCss";
import FurnitureInterface, { Furnitures } from "@/interfaces/furnitureSample";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
     const mainStyles = useStyles()
     const navigate = useRouter()

     const renderItem = ({ item }: { item: FurnitureInterface }) => {
          return (
               <View style={[mainStyles.furnitureItem]}>
                    <View style={{ width: '50%', height: '100%' }}>
                         <Image source={item.image} style={{ width: '100%', height: '100%' }} contentFit="contain" alt={item.name} placeholder={require("@/assets/images/favicon.png")} />
                    </View>
                    <View style={[mainStyles.furnitureContent]}>
                         <View>
                              <Text style={{ fontSize: 18, fontWeight: 600 }}>{ item.name }</Text>
                              <Text style={{ fontSize: 12, fontWeight: 400, color: '#222' }}>{ item.category }</Text>
                         </View>

                         <View style={[mainStyles.furnitureContentTop]}>
                              <Ionicons name="remove" size={25} color={'#000'} />
                              <Text style={{ fontSize: 16, fontWeight: 600 }}>4</Text>
                              <Ionicons name="add" size={25} color={'#000'} />
                         </View>

                         <Text style={{ fontSize: 18, fontWeight: 600 }}>{ item.price } Rwf</Text>
                    </View>
               </View>
          )
     }

     return (
          <SafeAreaView style={[mainStyles.authScreens]}>
               <BackHeader page={"Cart"} />

               <FlatList data={Furnitures} renderItem={renderItem} keyExtractor={(item) => item.name} showsVerticalScrollIndicator={false} style={{ marginTop: 30, flex: 1 }} />
               
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
                    <Text style={{ color: '#333' }}>Sub total:</Text>
                    <Text style={{ fontSize: 16, fontWeight: 600 }}>20,000 Rwf</Text>
               </View>

               <Text style={{ color: '#333', fontSize: 14, textAlign: 'center', marginVertical: 20 }}>
                    Consider that this amount doesn’t include delivery price.
                    You want the furniture to be delivered, you will pay delivery amount.
               </Text>

               <MainButton isLoading={false} message={"Check out"} toDo={() => navigate.push("/(furniture)/foldered/location")} />
          </SafeAreaView>
     )
}