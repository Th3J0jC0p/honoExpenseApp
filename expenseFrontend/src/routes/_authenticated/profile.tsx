import { createFileRoute } from '@tanstack/react-router'

import { userQueryOptions } from "@/lib/api"

import {
  useQuery
} from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isPending, error, data } = useQuery(userQueryOptions)
  
  if (error) return 'An error has occured ' + error.message
  return <div>{isPending ? '...' : data.user.email}</div>
}
