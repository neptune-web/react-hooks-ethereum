import { act, actConnect, renderHook } from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'
import { UseDisconnectConfig, useDisconnect } from './useDisconnect'

function useDisconnectWithConnect(config: UseDisconnectConfig = {}) {
  return { connect: useConnect(), disconnect: useDisconnect(config) }
}

function useDisconnectWithAccountAndConnect() {
  return {
    account: useAccount(),
    connect: useConnect(),
    disconnect: useDisconnect(),
  }
}

describe('useDisconnect', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useDisconnect())
    expect(result.current).toMatchInlineSnapshot(`
      {
        "disconnect": [Function],
        "disconnectAsync": [Function],
        "error": null,
        "isError": false,
        "isIdle": true,
        "isLoading": false,
        "isSuccess": false,
        "reset": [Function],
        "status": "idle",
      }
    `)
  })

  describe('configuration', () => {
    it('onSuccess', async () => {
      const onSuccess = jest.fn()
      const utils = renderHook(() => useDisconnectWithConnect({ onSuccess }))
      const { result, waitFor } = utils

      await actConnect({ utils })

      await act(async () => result.current.disconnect.disconnect())
      await waitFor(() =>
        expect(result.current.disconnect.isSuccess).toBeTruthy(),
      )
      expect(onSuccess).toBeCalledWith(undefined)
    })
  })

  describe('return value', () => {
    it('disconnect', async () => {
      const utils = renderHook(() => useDisconnectWithConnect())
      const { result, waitFor } = utils

      await actConnect({ utils })
      expect(result.current.connect.activeConnector).toMatchInlineSnapshot(
        `"<MockConnector>"`,
      )

      await act(async () => result.current.disconnect.disconnect())
      await waitFor(() =>
        expect(result.current.disconnect.isSuccess).toBeTruthy(),
      )

      expect(result.current.connect.activeConnector).toMatchInlineSnapshot(
        `undefined`,
      )
      expect(result.current.disconnect).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "reset": [Function],
          "status": "success",
        }
      `)
    })

    it('disconnectAsync', async () => {
      const utils = renderHook(() => useDisconnectWithConnect())
      const { result, waitFor } = utils

      await actConnect({ utils })
      expect(result.current.connect.activeConnector).toMatchInlineSnapshot(
        `"<MockConnector>"`,
      )

      await act(async () => result.current.disconnect.disconnectAsync())
      await waitFor(() =>
        expect(result.current.disconnect.isSuccess).toBeTruthy(),
      )

      expect(result.current.connect.activeConnector).toMatchInlineSnapshot(
        `undefined`,
      )
      expect(result.current.disconnect).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "error": null,
          "isError": false,
          "isIdle": false,
          "isLoading": false,
          "isSuccess": true,
          "reset": [Function],
          "status": "success",
        }
      `)
    })
  })

  describe('behavior', () => {
    it('clears account cache', async () => {
      const utils = renderHook(() => useDisconnectWithAccountAndConnect())
      const { result, rerender, waitFor } = utils

      await actConnect({ utils })

      expect(result.current.account.data).toMatchInlineSnapshot(`
        {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
        }
      `)

      await act(async () => result.current.disconnect.disconnect())

      await waitFor(() =>
        expect(result.current.disconnect.isSuccess).toBeTruthy(),
      )
      rerender()
      expect(result.current.account.data).toMatchInlineSnapshot(`null`)
    })
  })
})
