import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';
export async function pickImage(){ const result=await ImagePicker.launchImageLibraryAsync({mediaTypes:['images'],allowsEditing:true,aspect:[1,1],quality:0.8});return result.canceled?null:result.assets?.[0]?.uri; }
export async function takePhoto(){ const permission=await ImagePicker.requestCameraPermissionsAsync();if(!permission.granted){Alert.alert('Câmera sem permissão','Ative a permissão nos ajustes para tirar uma foto.',[{text:'Cancelar',style:'cancel'},{text:'Abrir ajustes',onPress:()=>Linking.openSettings()}]);return null;}const result=await ImagePicker.launchCameraAsync({allowsEditing:true,aspect:[1,1],quality:0.8});return result.canceled?null:result.assets?.[0]?.uri; }
