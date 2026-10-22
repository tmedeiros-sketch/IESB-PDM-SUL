import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';
import { cardShadow, getTheme } from '../../constants/theme';

export default function DespesaItem({ id, description, amount, date, category }) {
  const navigation = useNavigation();
  const theme = getTheme(useColorScheme());

  function openEdit() {
    navigation.getParent()?.navigate('GerenciarDespesa', { expenseId: id });
  }

  return (
    <Pressable
      onPress={openEdit}
      style={({ pressed }) => [styles.card, { backgroundColor: theme.card }, cardShadow, pressed && styles.pressed]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]}>{description}</Text>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{getDataFormatada(date)}</Text>
        <View style={[styles.tag, { backgroundColor: theme.tagBackground }]}>
          <Text style={[styles.tagText, { color: theme.tagText }]}>{category}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: theme.primary }]}>R$ {amount.toFixed(2)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    margin: 6,
    borderRadius: 8,
  },
  pressed: { opacity: 0.75 },
  info: { flex: 1 },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  date: { marginBottom: 6 },
  tag: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 12 },
  tagText: { fontSize: 12, fontWeight: '600' },
  amount: { fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
});
