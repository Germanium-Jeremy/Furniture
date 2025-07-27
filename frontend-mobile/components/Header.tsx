import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStyles from "./RepeatedCss";
import { Link, useRouter } from "expo-router";
import RoleInterface from "@/interfaces/RoleInterface";
import { useState } from "react";

export default function Header(props: RoleInterface) {
     const mainStyles = useStyles()
     const navigate = useRouter()
     const [isVisible, setIsVisible] = useState(false)
     
     return (
          <SafeAreaView style={[styles.container]}>
               <Ionicons name="menu" size={25} color={'#000'} onPress={() => setIsVisible(true)} />
               <Text style={[mainStyles.furniture, styles.furniture]}>Furniture</Text>

               {props.role !== 'admin' ? 
                    <View style={[styles.between]}>
                         <Ionicons name="search" size={25} color={'#000'} />
                         <Ionicons name="cart" size={25} color={'#000'} onPress={() => navigate.push("/(furniture)/foldered/cart")} />
                    </View> : 
                    <Ionicons name="list-circle-sharp" size={25} color={'#000'} />
               }

               {isVisible &&
                    <View style={[styles.containerMenu]}>
                         <View style={styles.options}>
                              <Link href={"/(furniture)"} style={styles.option} onPress={() => setIsVisible(false)}>Home</Link>
                              <Link href={"/(furniture)/foldered/cart"} style={styles.option} onPress={() => setIsVisible(false)}>Cart</Link>
                              <Link href={"/(others)/contact"} style={styles.option} onPress={() => setIsVisible(false)}>Contact Us</Link>
                              <Link href={"/(furniture)"} style={styles.option} onPress={() => setIsVisible(false)}>About Us</Link>
                         </View>
                         <Pressable style={{ width: '50%', backgroundColor: '#5555' }} onPress={() => setIsVisible(false)}></Pressable>
                    </View>
               }
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          position: 'fixed',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1,
          paddingVertical: 5,
          paddingHorizontal: 20,
     },
     furniture: {
          marginTop: 0,
          fontSize: 30,
     },
     between: {
          gap: 20,
          flexDirection: 'row',
     },
     containerMenu: {
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          flexDirection: 'row',
     },
     options: {
          width: '50%',
          backgroundColor: '#FFF',
          paddingVertical: 40,
          paddingHorizontal: 20,
          gap: 20,
     },
     option: {
          fontSize: 16,
          fontWeight: 500,
     }
})