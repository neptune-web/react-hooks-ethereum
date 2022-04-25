import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'

export const Balance = () => {
  return (
    <div>
      <div>
        <AccountBalance />
      </div>
      <div>
        <FindBalance />
      </div>
    </div>
  )
}

const AccountBalance = () => {
  const { data: account } = useAccount()
  const { data, refetch } = useBalance({
    addressOrName: account?.address,
    watch: true,
  })

  return (
    <div>
      {data?.formatted}
      <button onClick={() => refetch()}>fetch</button>
    </div>
  )
}

const FindBalance = () => {
  const [address, setAddress] = useState('')
  const { data, isLoading, refetch } = useBalance({ addressOrName: address })

  const [value, setValue] = useState('')

  return (
    <div>
      Find balance:{' '}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        value={value}
      />
      <button
        onClick={() => (value === address ? refetch() : setAddress(value))}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      <div>{data?.formatted}</div>
    </div>
  )
}
