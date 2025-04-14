import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

interface RouterContext {
  queryClient: QueryClient
}

import { userQueryOptions } from "@/lib/api"

import {
  useQuery
} from '@tanstack/react-query'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
})

function Nav() {
  const { isPending, error, data } = useQuery(userQueryOptions)
  return (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{' '}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/expenses-list" className="[&.active]:font-bold">
        Show Expenses
      </Link>
      <Link to="/create-expense" className="[&.active]:font-bold">
        Add new Expense
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
      <a target={data?.user ? "_blank" : "_self"} href={data?.user ? "/api/logout" : "api/login"} className="[&.active]:font-bold">
        {data?.user ? 'Logout' : 'Login'}
      </a>
    </div>
  )
}

function Root() {
  return (
    <>
      <Nav />
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}