import { Colors } from "@/constants/Colors";
import ButtonInterface from "@/interfaces/ButtonInterface";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export default function SecondButton(props: ButtonInterface) {

     if (props.isLoading) return <ActivityIndicator />

     return (
          <Pressable style={[{ backgroundColor: Colors.dark.secondBtnBg, borderColor: Colors.dark.textBtn }, styles.btn]} onPress={props.toDo}>
               <Text style={[styles.text, { color: Colors.dark.textBtn }]}>{ props.message }</Text>
          </Pressable>
     )
}


const styles = StyleSheet.create({
     btn: {
          borderRadius: 50,
          paddingVertical: 5,
          paddingHorizontal: 20,
          borderWidth: 1,
     },
     text: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 300,
     }
})