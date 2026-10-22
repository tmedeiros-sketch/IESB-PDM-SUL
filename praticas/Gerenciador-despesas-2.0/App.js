import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ExpensesContextProvider } from './src/store/expenses-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import { getTheme } from './src/constants/theme';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function VisaoGeral({ navigation }) {
  const theme = getTheme(useColorScheme());

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ paddingHorizontal: 16 }}>
            <Ionicons name="add" size={28} color={theme.primary} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();

  return (
    <ExpensesContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="VisaoGeral" component={VisaoGeral} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} options={{ presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
