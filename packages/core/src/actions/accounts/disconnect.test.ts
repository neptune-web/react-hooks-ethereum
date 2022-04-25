import { getSigners, setupWagmiClient } from '../../../test'
import { Client } from '../../client'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { disconnect } from './disconnect'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
})

describe('disconnect', () => {
  let client: Client
  beforeEach(() => {
    client = setupWagmiClient()
  })

  describe('behavior', () => {
    it('can disconnect connected account', async () => {
      await connect({ connector })
      expect(client.data?.account).toMatchInlineSnapshot(
        `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
      )

      await disconnect()
      expect(client.data?.account).toMatchInlineSnapshot(`undefined`)
    })

    it('not connected', async () => {
      await disconnect()
      expect(client.data?.account).toMatchInlineSnapshot(`undefined`)
    })
  })
})
