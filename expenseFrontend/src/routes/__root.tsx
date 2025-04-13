import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: Root,
})

function Nav() {
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