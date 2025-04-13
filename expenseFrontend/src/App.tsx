import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    const fetchTotalSpent = async () => {
      try {
        const response = await fetch('/api/expenses/total');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalSpent(data.total);
      } catch (error) {
        console.error('Error fetching total spent:', error);
      }
    };

    fetchTotalSpent();
  }
  , [totalSpent]);

  return (
    <Card className="w-[350px] m-auto mt-50">
      <CardHeader className="text-center">
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>Total amount you have spent already</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {totalSpent.toFixed(2)} $
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  ) 
}

export default App
