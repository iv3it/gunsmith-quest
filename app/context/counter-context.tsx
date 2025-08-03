import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CounterMap = { [itemName: string]: number };

interface CounterContextType {
  amounts: CounterMap;
  increase: (key: string) => void;
  decrease: (key: string) => void;
}

const STORAGE_KEY = 'item_amounts';

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [amounts, setAmounts] = useState<CounterMap>({});

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setAmounts(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load counters:', e);
      }
    };
    load();
  }, []);

  const save = async (updated: CounterMap) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save counters:', e);
    }
  };

  const increase = (key: string) => {
    setAmounts(prev => {
      const updated = { ...prev, [key]: (prev[key] || 0) + 1 };
      save(updated);
      return updated;
    });
  };

  const decrease = (key: string) => {
    setAmounts(prev => {
      const updated = { ...prev, [key]: Math.max(0, (prev[key] || 0) - 1) };
      save(updated);
      return updated;
    });
  };

  return (
    <CounterContext.Provider value={{ amounts, increase, decrease }}>
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
