import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CounterMap = { [itemName: string]: number };
type CompletionMap = { [part: string]: boolean };

interface CounterContextType {
  amounts: CounterMap;
  increase: (key: string) => void;
  decrease: (key: string) => void;

  completed: CompletionMap;
  toggleCompleted: (part: string) => void;
}

const STORAGE_AMOUNTS_KEY = 'item_amounts';
const STORAGE_COMPLETED_KEY = 'completed_parts';

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [amounts, setAmounts] = useState<CounterMap>({});
  const [completed, setCompleted] = useState<CompletionMap>({});

  useEffect(() => {
    const load = async () => {
      try {
        const [storedAmounts, storedCompleted] = await Promise.all([
          AsyncStorage.getItem(STORAGE_AMOUNTS_KEY),
          AsyncStorage.getItem(STORAGE_COMPLETED_KEY),
        ]);

        if (storedAmounts) setAmounts(JSON.parse(storedAmounts));
        if (storedCompleted) setCompleted(JSON.parse(storedCompleted));
      } catch (e) {
        console.error('Failed to load counters:', e);
      }
    };
    load();
  }, []);

  const saveAmounts = async (updated: CounterMap) => {
    try {
      await AsyncStorage.setItem(STORAGE_AMOUNTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save counters:', e);
    }
  };

  const saveCompleted = async (updated: CompletionMap) => {
    try {
      await AsyncStorage.setItem(STORAGE_COMPLETED_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save completed parts:', e);
    }
  };

  const increase = (key: string) => {
    setAmounts(prev => {
      const updated = { ...prev, [key]: (prev[key] || 0) + 1 };
      saveAmounts(updated);
      return updated;
    });
  };

  const decrease = (key: string) => {
    setAmounts(prev => {
      const updated = { ...prev, [key]: Math.max(0, (prev[key] || 0) - 1) };
      saveAmounts(updated);
      return updated;
    });
  };

  const toggleCompleted = (part: string) => {
    setCompleted(prev => {
      const updated = { ...prev, [part]: !prev[part] };
      saveCompleted(updated);
      return updated;
    });
  };

  return (
    <CounterContext.Provider value={{ amounts, increase, decrease, completed, toggleCompleted }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};
