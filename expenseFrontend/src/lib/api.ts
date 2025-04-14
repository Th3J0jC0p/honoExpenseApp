
import { type ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from 'hono/client'

const client = hc<ApiRoutes>('/')

export const api = client.api

async function getAccount() {
  const result = await api.me.$get();
  if (!result.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await result.json();
  return data;
}

export const userQueryOptions = queryOptions({ queryKey: ['get-profile'], queryFn: getAccount, staleTime: Infinity })