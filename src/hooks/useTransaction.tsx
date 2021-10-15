import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { api } from '../services/api';
import { AxiosResponse } from 'axios';

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  value: number,
  createdAt: string
}

type transactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionApi {
  transactions: [Transaction]
}

interface TransactionCreateApi {
  transaction: Transaction
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: transactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider: React.FC<TransactionsProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {
    api.get<TransactionApi>('transactions').then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: transactionInput) {
    const response: AxiosResponse<TransactionCreateApi> = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })

    setTransactions([
      ...transactions,
      response.data.transaction
    ])

  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}