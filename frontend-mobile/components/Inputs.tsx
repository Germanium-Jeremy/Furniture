import InputInterface from "@/interfaces/InputInterface";
import { StyleSheet, TextInput } from "react-native";
import useStyles from "./RepeatedCss";

export default function InputsComponent(props: InputInterface) {
     const mainStyles = useStyles()

     return <TextInput value={props.content} onChangeText={props.changing} placeholder={props.placeholder} style={[styles.input]} placeholderTextColor={"#DDD"} />
}

const styles = StyleSheet.create({
     input: {
          borderRadius: 5,
          borderWidth: 2,
          borderColor: 'white',
          paddingHorizontal: 15,
          paddingVertical: 7,
          color: 'white',
          fontSize: 16
     }
})