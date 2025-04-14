import { createFileRoute } from '@tanstack/react-router'

import { api } from "@/lib/api"
import {
  useQuery
} from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Skeleton } from "@/components/ui/skeleton"

async function getExpenseList() {
  const result = await api.expenses.$get();
  if (!result.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await result.json();
  return data;
}

export const Route = createFileRoute('/_authenticated/expenses-list')({
  component: Expenses,
})

function Expenses() {
  const { isPending, data } = useQuery({ queryKey: ['get-all-expenses'], queryFn: getExpenseList })

  const total = data?.expenses.reduce((acc, expense) => acc + Number(expense.amount), 0) || 0;

  return (
    <div>
      <Table className="m-auto mt-50 w-100">
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            isPending ? 
              Array.from({ length: 5 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                </TableRow>
              )) : data?.expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{expense.id}</TableCell>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>{expense.amount} $</TableCell>
              </TableRow>
          ))}
        </TableBody>  
        <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">{isPending ? "" : total+" $"}</TableCell>
        </TableRow>
      </TableFooter>
      </Table>
    </div>
  )
}