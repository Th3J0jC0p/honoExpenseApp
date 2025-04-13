import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input" 
import { Label } from "@/components/ui/label" 
import { Button } from "@/components/ui/button"

import { useForm } from '@tanstack/react-form'

import { api } from "@/lib/api"

export const Route = createFileRoute('/create-expense')({
  component: createExpense,
})


function createExpense() {
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: {
      name: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const result = await api.expenses.$post({ json: value });

      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      navigate({ to: '/expenses-list' })
    },
  })


  return (
    <div className="flex flex-col items-center justify-center h-70">
      <form 
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }} 
      > 
        <form.Field
          name="name"
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>
                <Label htmlFor={field.name} className='p-5'>Add expense Title: </Label>
                <Input 
                  type="text" 
                  id={field.name} 
                  name={field.name} 
                  onBlur={field.handleBlur} 
                  onChange={(e) => field.handleChange(e.target.value)} 
                  value={field.state.value} 
                />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )
          }}
        />
        <form.Field
          name="amount"
          children={(field) => {
            // Avoid hasty abstractions. Render props are great!
            return (
              <>  
                <Label htmlFor={field.name} className='p-5'>Add expense Amount: </Label>
                <Input type="number" id={field.name} name={field.name} onBlur={field.handleBlur} onChange={(e) => field.handleChange(Number(e.target.value))} value={field.state.value} />
                {field.state.meta.isTouched && field.state.meta.errors.length ? (
                  <em>{field.state.meta.errors.join(', ')}</em>
                ) : null}
              </>
            )
          }}
        />
        <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit"  disabled={!canSubmit} className="mt-4">{isSubmitting ? '...' : 'Create'}</Button>
        )}
        />
      </form>
    </div>
  )
}
