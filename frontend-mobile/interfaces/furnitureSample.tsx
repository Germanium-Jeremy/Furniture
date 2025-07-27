import { Image, ImageSourcePropType } from "react-native"

export default interface FurnitureInterface {
     name: string
     description: string
     price: number
     category: 'sofa' | 'chair'| 'table'| 'bed'| 'wardrobe'| 'desk'| 'shelf'| 'cabinet'| 'dining'| 'office'| 'outdoor'| 'other'
     material: 'wood'| 'metal'| 'glass'| 'plastic'| 'fabric'| 'leather'| 'marble'| 'rattan'| 'bamboo'| 'other'
     dimensions: { length: number, width: number, height: number, unit: 'cm' | 'm' | 'in' | 'ft' },
     color: string
     stock: number
     image: ImageSourcePropType
     status: string
     isCustomizable: boolean
}

export const Furnitures: FurnitureInterface[] = [
     { name: "Sofa 1", description: "This is a description of the sofa 1", price: 25000, category: 'sofa', material: 'wood', dimensions: { length: 20, width: 10, height: 5, unit: 'ft' }, color: 'brown', stock: 10, image: require("@/assets/images/mainPic.png"), status: "available", isCustomizable: false },
     { name: "Sofa 2", description: "This is a description of the sofa 2", price: 15000, category: 'sofa', material: 'leather', dimensions: { length: 25, width: 15, height: 10, unit: 'ft' }, color: 'black', stock: 2, image: require("@/assets/images/mainPic2.png"), status: "available", isCustomizable: false },
     { name: "Sofa 3", description: "This is a description of the sofa 3", price: 20000, category: 'sofa', material: 'fabric', dimensions: { length: 15, width: 8, height: 6, unit: 'ft' }, color: 'chocolate', stock: 5, image: require("@/assets/images/favicon.png"), status: "available", isCustomizable: false },
     { name: "Chair 1", description: "This is a description of the chair 1", price: 15000, category: 'chair', material: 'wood', dimensions: { length: 20, width: 10, height: 5, unit: 'ft' }, color: 'white', stock: 4, image: require("@/assets/images/icon.png"), status: "available", isCustomizable: false },
     { name: "Table 1", description: "This is a description of the table 1", price: 35000, category: 'table', material: 'wood', dimensions: { length: 20, width: 10, height: 3, unit: 'ft' }, color: 'brown', stock: 10, image: require("@/assets/images/mainPic.png"), status: "available", isCustomizable: false },
     { name: "Bed 1", description: "This is a description of the bed 1", price: 25000, category: 'bed', material: 'wood', dimensions: { length: 2, width: 0.8, height: 0.5, unit: 'm' }, color: 'brown', stock: 3, image: require("@/assets/images/mainPic2.png"), status: "available", isCustomizable: false },
     { name: "Chair 2", description: "This is a description of the chair 1", price: 10000, category: 'chair', material: 'plastic', dimensions: { length: 10, width: 10, height: 20, unit: 'ft' }, color: 'brown', stock: 5, image: require("@/assets/images/favicon.png"), status: "available", isCustomizable: false },
     { name: "Table 2", description: "This is a description of the table 2", price: 30000, category: 'table', material: 'wood', dimensions: { length: 15, width: 10, height: 3, unit: 'ft' }, color: 'black', stock: 20, image: require("@/assets/images/icon.png"), status: "available", isCustomizable: false },
     { name: "Bed 2", description: "This is a description of the bed 2", price: 15000, category: 'bed', material: 'wood', dimensions: { length: 2, width: 0.7, height: 0.5, unit: 'm' }, color: 'chocolate', stock: 13, image: require("@/assets/images/mainPic.png"), status: "available", isCustomizable: false },
     { name: "Table 3", description: "This is a description of the table 3", price: 30000, category: 'table', material: 'plastic', dimensions: { length: 10, width: 10, height: 3, unit: 'ft' }, color: 'white', stock: 4, image: require("@/assets/images/mainPic2.png"), status: "available", isCustomizable: false },
     { name: "Bed 3", description: "This is a description of the bed 3", price: 45000, category: 'bed', material: 'wood', dimensions: { length: 2, width: 1, height: 0.7, unit: 'm' }, color: 'dark red', stock: 5, image: require("@/assets/images/favicon.png"), status: "available", isCustomizable: false },
     { name: "Wardrobe 1", description: "This is a description of the wardrobe 1", price: 35000, category: 'wardrobe', material: 'wood', dimensions: { length: 1, width: 0.5, height: 2, unit: 'm' }, color: 'brown', stock: 20, image: require("@/assets/images/icon.png"), status: "available", isCustomizable: false },
     { name: "Desk 1", description: "This is a description of the desk 1", price: 35000, category: 'desk', material: 'wood', dimensions: { length: 160, width: 60, height: 150, unit: 'cm' }, color: 'brown', stock: 40, image: require("@/assets/images/mainPic.png"), status: "available", isCustomizable: false },
     { name: "Wardrobe 2", description: "This is a description of the wardrobe 2", price: 45000, category: 'wardrobe', material: 'wood', dimensions: { length: 1, width: 0.7, height: 2, unit: 'm' }, color: 'chocolate', stock: 13, image: require("@/assets/images/mainPic2.png"), status: "available", isCustomizable: false },
     { name: "Shelf 1", description: "This is a description of the shelf 1", price: 20000, category: 'shelf', material: 'wood', dimensions: { length: 120, width: 50, height: 100, unit: 'cm' }, color: 'chocolate', stock: 12, image: require("@/assets/images/favicon.png"), status: "available", isCustomizable: false },
     { name: "Shelf 2", description: "This is a description of the shelf 2", price: 30000, category: 'shelf', material: 'wood', dimensions: { length: 140, width: 60, height: 140, unit: 'cm' }, color: 'brown', stock: 12, image: require("@/assets/images/icon.png"), status: "available", isCustomizable: false },
     { name: "Desk 2", description: "This is a description of the desk 1", price: 25000, category: 'desk', material: 'wood', dimensions: { length: 150, width: 60, height: 140, unit: 'cm' }, color: 'chocolate', stock: 30, image: require("@/assets/images/mainPic.png"), status: "available", isCustomizable: false },
]