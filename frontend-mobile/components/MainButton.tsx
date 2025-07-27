import { Colors } from "@/constants/Colors";
import ButtonInterface from "@/interfaces/ButtonInterface";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export default function MainButton(props: ButtonInterface) {

     if (props.isLoading) return <ActivityIndicator />

     return (
          <Pressable style={[{ backgroundColor: Colors.dark.mainBtnBg }, styles.btn]} onPress={props.toDo}>
               <Text style={[styles.text, { color: Colors.dark.textBtn }]}>{ props.message }</Text>
          </Pressable>
     )
}

const styles = StyleSheet.create({
     btn: {
          borderRadius: 50,
          paddingVertical: 7,
          paddingHorizontal: 20,
     },
     text: {
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 300,
     }
})