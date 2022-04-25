import { getWebSocketProvider, setupWagmiClient } from '../../../test'
import { connect } from '../accounts/connect'
import { disconnect } from '../accounts/disconnect'
import { GetWebSocketProviderResult } from './getWebSocketProvider'
import { watchWebSocketProvider } from './watchWebSocketProvider'

describe('watchWebSocketProvider', () => {
  it('callback receives data', async () => {
    const client = setupWagmiClient({ webSocketProvider: getWebSocketProvider })
    await client.webSocketProvider?.destroy()

    const providers: GetWebSocketProviderResult[] = []
    const unwatch = watchWebSocketProvider({}, (provider) =>
      providers.push(provider),
    )

    await connect({ connector: client.connectors[0] })
    await client.webSocketProvider?.destroy()
    await disconnect()
    await client.webSocketProvider?.destroy()
    await connect({ connector: client.connectors[0] })
    await client.webSocketProvider?.destroy()
    unwatch()

    expect(providers).toMatchInlineSnapshot(`
      [
        "<WebSocketProvider network={1} />",
        "<WebSocketProvider network={31337} />",
        "<WebSocketProvider network={1} />",
      ]
    `)
  })
})
