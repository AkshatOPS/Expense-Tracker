import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.json()
  const expense = await prisma.expense.create({
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
    },
  })
  return new Response(JSON.stringify(expense), { status: 201 })
}

export async function GET() {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: "desc" },
  })
  return new Response(JSON.stringify(expenses))
}
