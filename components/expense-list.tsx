"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2 } from "lucide-react"
import type { Expense } from "@/app/page"

interface ExpenseListProps {
  expenses: Expense[]
  onDeleteExpense: (id: string) => void
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground text-lg font-light">
          {"No expenses yet. Add your first expense to get started."}
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-medium mb-4 text-foreground">Recent Expenses</h2>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-medium text-foreground">{expense.description}</h3>
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent-foreground rounded-full">
                  {expense.category}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{expense.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold text-foreground">${expense.amount.toFixed(2)}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteExpense(expense.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
