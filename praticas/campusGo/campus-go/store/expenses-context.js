import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Context = createContext(null);
const KEY = '@campusgo-expenses';
export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => { AsyncStorage.getItem(KEY).then(value => { if (value) { const data = JSON.parse(value); if (Array.isArray(data)) setExpenses(data); } }).catch(console.warn).finally(() => setReady(true)); }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(KEY, JSON.stringify(expenses)).catch(console.warn); }, [expenses, ready]);
  const addExpense = (title, amount) => setExpenses(old => [{ id: String(Date.now()), title, amount: Number(amount) }, ...old]);
  const removeExpense = id => setExpenses(old => old.filter(item => item.id !== id));
  return <Context.Provider value={{ expenses, addExpense, removeExpense, ready }}>{children}</Context.Provider>;
}
export function useExpenses() { const value = useContext(Context); if (!value) throw new Error('ExpensesContextProvider ausente'); return value; }
