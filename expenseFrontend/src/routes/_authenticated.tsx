import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from '@/lib/api'

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>Please <a href='/api/login'>login</a> or <a href="/api/register">register</a> to access this page.</p>
    </div>
  )
}
import { Outlet } from '@tanstack/react-router'

const Component = () => {
  const { user } = Route.useRouteContext()
  if(!user) {
    return <Login />
  }
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({context}) => {  
    const queryClient = context.queryClient
    try {
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (e) {
      return { user: null }
    }
  },
  component: Component,
})

