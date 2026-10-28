import { View,Text,Pressable } from 'react-native';
import { router,useLocalSearchParams } from 'expo-router';
import { styles as s } from '../../components/ui';
export default function TaskDetail(){const {id}=useLocalSearchParams();return <View style={s.screen}><Text style={s.heading}>Tarefa número {id}</Text><Text style={s.sub}>Detalhe da tarefa selecionada pela rota.</Text><Pressable style={s.button} onPress={()=>router.back()}><Text style={s.buttonText}>Voltar</Text></Pressable></View>;}
