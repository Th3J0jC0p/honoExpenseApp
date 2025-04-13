import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
  component: App,
})

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"

import {
  useQuery
} from '@tanstack/react-query'

async function getTotal() {
  const result = await api.expenses["total"].$get();
  if (!result.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await result.json();
  return data;
}

function App() {
  // Queries
  const { isPending, error, data } = useQuery({ queryKey: ['total'], queryFn: getTotal })

  if (error) return 'An error has occured ' + error.message

  return (
    <Card className="w-[350px] m-auto mt-50">
      <CardHeader className="text-center">
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you have spent already</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {isPending ? "..." : data.total.toFixed(2) + " $"} 
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  ) 
}

export default App
