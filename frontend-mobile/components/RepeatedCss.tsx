import { StyleSheet } from "react-native";

export default function useStyles() {
     return StyleSheet.create({
          furniture: {
               color: '#FF9D00',
               fontSize: 34,
               textAlign: 'center',
               fontWeight: 600,
               marginTop: 20,
          },
          authScreens: {
               paddingVertical: 20,
               paddingHorizontal: 20,
               flex: 1,
               backgroundColor: "#FFF"
          },
          mainPic: {
               flex: 1,
               zIndex: -1,
               position: 'absolute',
               top: 0,
               bottom: 0,
               left: 0, 
               right: 0,
               height: '100%',
          },
          furnitureItem: {
               borderRadius: 10,
               shadowOffset: { height: 2, width: 1 },
               shadowOpacity: 0.5,
               shadowRadius: 4,
               flexDirection: 'row',
               marginHorizontal: 2,
               marginBottom: 20,
               overflow: 'hidden',
          },
          furnitureContent: {
               flexDirection: 'column',
               justifyContent: 'space-between',
               gap: 10,
               paddingVertical: 10,
               paddingHorizontal: 10,
               width: '50%'
          },
          furnitureContentTop: {
               flexDirection: 'row',
               gap: 10,
               alignItems: 'center',
               justifyContent: 'flex-end',
          },
          furnitureContentMiddle: {
          },
          furnitureContentBottom: {
               flexDirection: 'row',
               gap: 10,
               alignItems: 'center',
               justifyContent: 'flex-end',
          },
     })
}