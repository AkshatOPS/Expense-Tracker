"use client"

import { Card } from "@/components/ui/card"
import type { Expense } from "@/app/page"

interface ExpenseSummaryProps {
  expenses: Expense[]
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  // Get current month in YYYY-MM format
  const currentMonth = new Date().toISOString().slice(0, 7)

  // Filter by createdAt instead of date
  const monthlyExpenses = expenses.filter(
    (expense) => expense.createdAt && expense.createdAt.toString().startsWith(currentMonth)
  )

  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const categoryTotals = expenses.reduce<Record<string, number>>((totals, expense) => {
    totals[expense.category] = (totals[expense.category] || 0) + expense.amount
    return totals
  }, {})

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Summary</h2>
      <p className="mb-2">This Month: ${monthlyTotal.toFixed(2)}</p>
      <ul className="space-y-1">
        {Object.entries(categoryTotals).map(([category, total]) => (
          <li key={category} className="flex justify-between text-sm">
            <span>{category}</span>
            <span>${total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
