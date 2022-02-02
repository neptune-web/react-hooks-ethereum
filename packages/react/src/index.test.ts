import * as Exports from './'

it('should expose correct exports', () => {
  expect(Object.keys(Exports)).toMatchInlineSnapshot(`
    [
      "Provider",
      "useContext",
      "useAccount",
      "useBalance",
      "useBlockNumber",
      "useConnect",
      "useContract",
      "useContractEvent",
      "useContractRead",
      "useContractWrite",
      "useEnsAvatar",
      "useEnsLookup",
      "useEnsResolver",
      "useFeeData",
      "useNetwork",
      "useProvider",
      "useSigner",
      "useSignMessage",
      "useToken",
      "useTransaction",
      "useWaitForTransaction",
      "useWebSocketProvider",
      "Connector",
      "InjectedConnector",
      "chain",
      "allChains",
      "defaultChains",
      "defaultL2Chains",
      "developmentChains",
      "erc1155ABI",
      "erc20ABI",
      "erc721ABI",
      "normalizeChainId",
      "Context",
    ]
  `)
})
