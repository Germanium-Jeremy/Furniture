import Header from "@/components/Header";
import useStyles from "@/components/RepeatedCss";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Categories } from "../data/categories";
import FurnitureInterface, { Furnitures } from "../../interfaces/furnitureSample";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function FurnitureHome() {
     const mainStyles = useStyles()
     const navigate = useRouter()
     const [categoryInView, setCategoryInView] = useState(Categories[0])

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
               <Header role="user" />

               <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.categories]}>
                    {Categories.map((category) => (
                         <Text style={[styles.category, { borderColor: category.active ? '#FF9D00' : '#000', color: category.active ? '#FF9D00' : '#000' }]}
                              key={category.name} onPress={() => { setCategoryInView(category); category.active = true }}
                         >
                              {category.name}
                         </Text>
                    ))}
                    <Text style={[styles.category, { borderColor: false ? '#FF9D00' : '#000', color: false ? '#FF9D00' : '#000' }]}>Special Order</Text>
               </ScrollView>

               <FlatList data={Furnitures} renderItem={renderItem} keyExtractor={(item) => item.name} showsVerticalScrollIndicator={false} />
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     categories: {
          marginTop: 40,
          marginBottom: 20,
          maxHeight: 30,
          minHeight: 30,
     },
     category: {
          borderWidth: 1,
          borderRadius: 50,
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderColor: '#000',
          marginHorizontal: 5,
     },
})