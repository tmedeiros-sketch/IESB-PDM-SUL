import React,{useState} from 'react';
import { View,Text,TextInput,Pressable,Alert } from 'react-native';
import { router } from 'expo-router';
import { styles as s } from '../components/ui';
export default function NewTask(){const [title,setTitle]=useState('');return <View style={s.screen}><Text style={s.heading}>Nova tarefa</Text><TextInput style={s.input} placeholder="Descreva sua tarefa" value={title} onChangeText={setTitle}/><Pressable style={s.button} onPress={()=>Alert.alert('Exemplo de modal','O requisito é abrir e fechar a tela modal.')}><Text style={s.buttonText}>Visualizar exemplo</Text></Pressable><Pressable style={s.button} onPress={()=>router.back()}><Text style={s.buttonText}>Fechar</Text></Pressable></View>;}
