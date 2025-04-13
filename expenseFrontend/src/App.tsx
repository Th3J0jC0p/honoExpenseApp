import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        <h1 className='font-sans text-2xl'>Vite + React + tailwind</h1>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button onClick={() => setCount((count) => count + 1)}><FontAwesomeIcon icon={faPlus} /></Button>
          <p>
            {count}
          </p>
          <Button onClick={() => setCount((count) => count -   1)}><FontAwesomeIcon icon={faMinus} /></Button>
        </div>
      </main>
    </>
  ) 
}

export default App
