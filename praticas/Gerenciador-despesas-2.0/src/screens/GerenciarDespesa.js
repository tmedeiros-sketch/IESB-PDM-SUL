import { useLayoutEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useExpenses } from '../store/expenses-context';
import { CATEGORIES } from '../constants/categorias';
import { getTheme } from '../constants/theme';
import { getDataFormatada } from '../util/data';

function validate(values) {
  const errors = {};
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }
  if (!(parseFloat(values.amount) > 0)) {
    errors.amount = 'O valor deve ser maior que zero.';
  }
  if (values.date > endOfToday) {
    errors.date = 'A data não pode ser futura.';
  }
  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }
  return errors;
}

export default function GerenciarDespesa({ route, navigation }) {
  const theme = getTheme(useColorScheme());
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const existing = expenses.find((expense) => expense.id === expenseId);

  const [form, setForm] = useState({
    description: existing?.description ?? '',
    amount: existing ? String(existing.amount) : '',
    date: existing?.date ?? new Date(),
    category: existing?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    // Depois da primeira tentativa de salvar, revalida a cada alteração
    if (submitted) setErrors(validate(next));
  }

  function handleAmount(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) handleChange('amount', normalized);
  }

  function handleDate(_event, selected) {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) handleChange('date', selected);
  }

  function handleSave() {
    setSubmitted(true);
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };
    if (isEditing) updateExpense(expenseId, data);
    else addExpense(data);
    navigation.goBack();
  }

  function handleDelete() {
    Alert.alert('Excluir despesa', 'Tem certeza que deseja excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  }

  const fieldStyle = (name) => [
    styles.input,
    { backgroundColor: theme.input, borderColor: errors[name] ? theme.error : theme.border },
  ];

  const ErrorText = ({ name }) =>
    errors[name] ? <Text style={[styles.error, { color: theme.error }]}>{errors[name]}</Text> : null;

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
        <TextInput
          style={[fieldStyle('description'), { color: theme.text }]}
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
          placeholder="Ex.: Almoço"
          placeholderTextColor={theme.textSecondary}
        />
        <ErrorText name="description" />

        <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
        <TextInput
          style={[fieldStyle('amount'), { color: theme.text }]}
          value={form.amount}
          onChangeText={handleAmount}
          keyboardType="decimal-pad"
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
        />
        <ErrorText name="amount" />

        <Text style={[styles.label, { color: theme.text }]}>Data</Text>
        <Pressable style={fieldStyle('date')} onPress={() => setShowPicker(true)}>
          <Text style={{ color: theme.text }}>{getDataFormatada(form.date)}</Text>
        </Pressable>
        {showPicker && <DateTimePicker value={form.date} mode="date" onChange={handleDate} />}
        <ErrorText name="date" />

        <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
        <Pressable style={fieldStyle('category')} onPress={() => setShowModal(true)}>
          <Text style={{ color: form.category ? theme.text : theme.textSecondary }}>
            {form.category || 'Selecione uma categoria'}
          </Text>
        </Pressable>
        <ErrorText name="category" />

        <Pressable style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSave}>
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            {isEditing ? 'Salvar alterações' : 'Adicionar despesa'}
          </Text>
        </Pressable>

        {isEditing && (
          <Pressable style={[styles.button, styles.deleteButton, { borderColor: theme.error }]} onPress={handleDelete}>
            <Text style={[styles.buttonText, { color: theme.error }]}>Excluir despesa</Text>
          </Pressable>
        )}
      </ScrollView>

      <Modal transparent animationType="slide" visible={showModal} onRequestClose={() => setShowModal(false)}>
        <Pressable style={[styles.overlay, { backgroundColor: theme.overlay }]} onPress={() => setShowModal(false)}>
          <View style={[styles.sheet, { backgroundColor: theme.card }]}>
            <Text style={[styles.sheetTitle, { color: theme.text }]}>Escolha a categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[styles.option, { borderColor: theme.border }]}
                onPress={() => {
                  handleChange('category', category);
                  setShowModal(false);
                }}
              >
                <Text style={{ color: theme.text, fontWeight: category === form.category ? 'bold' : 'normal' }}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { padding: 16, paddingBottom: 48 },
  label: { marginTop: 14, marginBottom: 4, fontWeight: '600' },
  input: { borderWidth: 1, borderRadius: 6, padding: 10 },
  error: { marginTop: 4, fontSize: 12 },
  button: { marginTop: 24, padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  deleteButton: { marginTop: 12, backgroundColor: 'transparent', borderWidth: 1 },
  overlay: { flex: 1, justifyContent: 'flex-end' },
  sheet: { padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  sheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  option: { paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth },
});
