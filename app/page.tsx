"use client";

import { useState, useEffect } from "react";
import { ExpenseForm } from "@/components/expense-form";
import { ExpenseList } from "@/components/expense-list";
import { ExpenseSummary } from "@/components/expense-summary";
import { Card } from "@/components/ui/card";

export interface Expense {
  id: string;
  title: string;       // ✅ renamed from description
  amount: number;
  category: string;
  createdAt: string;   // ✅ renamed from date
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Load expenses from backend on mount
  useEffect(() => {
    async function fetchExpenses() {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data);
    }
    fetchExpenses();
  }, []);

  // Add expense through backend
  const addExpense = async (expense: Omit<Expense, "id" | "createdAt">) => {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    });
    const newExpense = await res.json();
    setExpenses((prev) => [newExpense, ...prev]);
  };

  // (Optional) implement delete if you add DELETE endpoint
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-light text-foreground mb-2 text-balance">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground text-lg font-light">
            Keep track of your spending with ease
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="p-6">
              <ExpenseForm onAddExpense={addExpense} />
            </Card>
          </div>

          <div className="md:col-span-2 space-y-6">
            <ExpenseSummary expenses={expenses} />
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}
