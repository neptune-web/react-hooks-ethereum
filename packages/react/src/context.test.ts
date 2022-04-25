import * as React from 'react'

import { renderHook } from '../test'
import { useClient } from './context'

describe('useClient', () => {
  describe('mounts', () => {
    it('default', () => {
      const { result } = renderHook(() => useClient())
      expect(result.current).toMatchInlineSnapshot(`
        Client {
          "config": {
            "autoConnect": false,
            "connectors": [
              "<MockConnector>",
            ],
            "provider": [Function],
            "storage": {
              "getItem": [Function],
              "removeItem": [Function],
              "setItem": [Function],
            },
            "webSocketProvider": undefined,
          },
          "queryClient": QueryClient {
            "defaultOptions": {
              "queries": {
                "cacheTime": Infinity,
                "retry": false,
              },
            },
            "logger": {
              "error": [Function],
              "log": [Function],
              "warn": [Function],
            },
            "mutationCache": MutationCache {
              "config": {},
              "listeners": [],
              "mutationId": 0,
              "mutations": [],
              "subscribe": [Function],
            },
            "mutationDefaults": [],
            "queryCache": QueryCache {
              "config": {},
              "listeners": [],
              "queries": [],
              "queriesMap": {},
              "subscribe": [Function],
            },
            "queryDefaults": [],
            "unsubscribeFocus": [Function],
            "unsubscribeOnline": [Function],
          },
          "storage": {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
          },
          "store": {
            "destroy": [Function],
            "getState": [Function],
            "persist": {
              "clearStorage": [Function],
              "hasHydrated": [Function],
              "onFinishHydration": [Function],
              "onHydrate": [Function],
              "rehydrate": [Function],
              "setOptions": [Function],
            },
            "setState": [Function],
            "subscribe": [Function],
          },
        }
      `)
    })

    it('throws when not inside Provider', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      jest.spyOn(console, 'error').mockImplementation(() => {})

      try {
        const wrapper = ({ children }: { children?: React.ReactNode }) =>
          React.createElement('div', { children })
        renderHook(() => useClient(), { wrapper })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[Error: Must be used within WagmiProvider]`,
        )
      }
    })
  })
})
