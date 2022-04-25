import type { Resolver } from '@ethersproject/providers'

import { getProvider } from '../providers'

export type FetchEnsResolverArgs = {
  /** Chain id to use for provider */
  chainId?: number
  /** ENS name to resolve */
  name: string
}

export type FetchEnsResolverResult = Resolver | null

export async function fetchEnsResolver({
  chainId,
  name,
}: FetchEnsResolverArgs): Promise<FetchEnsResolverResult> {
  const provider = getProvider({ chainId })
  const resolver = await provider.getResolver(name)
  return resolver
}
