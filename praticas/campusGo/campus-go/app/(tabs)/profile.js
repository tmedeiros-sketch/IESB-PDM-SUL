import React,{useCallback,useState} from 'react';
import { View,Text,Image,Pressable,Alert } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles as s } from '../../components/ui';
import { pickImage,takePhoto } from '../../services/media';
const KEY='@profile-photo';
export default function Profile(){const [uri,setUri]=useState(null);useFocusEffect(useCallback(()=>{AsyncStorage.getItem(KEY).then(setUri).catch(console.warn);},[]));const save=async(fn)=>{try{const image=await fn();if(image){await AsyncStorage.setItem(KEY,image);setUri(image);}}catch(e){Alert.alert('Erro na imagem',e.message);}};return <View style={s.screen}><Text style={s.heading}>Meu perfil</Text><Text style={s.sub}>Personalize sua experiência no CampusGo.</Text><View style={[s.card,{alignItems:'center'}]}><Pressable onPress={()=>save(pickImage)} style={{marginBottom:15}}>{uri?<Image source={{uri}} style={{width:140,height:140,borderRadius:70}}/>:<View style={{width:140,height:140,borderRadius:70,backgroundColor:'#dbeafe',justifyContent:'center',alignItems:'center'}}><Ionicons name="person" size={76} color="#2563eb"/></View>}</Pressable><Text style={s.title}>Toque no avatar para abrir a galeria</Text><Pressable style={[s.button,{alignSelf:'stretch'}]} onPress={()=>save(pickImage)}><Text style={s.buttonText}>Escolher da galeria</Text></Pressable><Pressable style={[s.button,{alignSelf:'stretch'}]} onPress={()=>save(takePhoto)}><Text style={s.buttonText}>Tirar foto com câmera</Text></Pressable><Text style={s.body}>Sua foto fica salva neste dispositivo.</Text></View></View>;}
