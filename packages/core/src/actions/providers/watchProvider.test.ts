import { setupWagmiClient } from '../../../test'
import { connect } from '../accounts/connect'
import { disconnect } from '../accounts/disconnect'
import { GetProviderResult } from './getProvider'
import { watchProvider } from './watchProvider'

describe('watchProvider', () => {
  it('callback receives data', async () => {
    const client = setupWagmiClient()

    const providers: GetProviderResult[] = []
    const unwatch = watchProvider({}, (provider) => providers.push(provider))

    await connect({ connector: client.connectors[0] })
    await disconnect()
    await connect({ connector: client.connectors[0] })
    unwatch()

    expect(providers).toMatchInlineSnapshot(`
      [
        "<Provider network={1} />",
        "<Provider network={31337} />",
        "<Provider network={1} />",
      ]
    `)
  })
})
