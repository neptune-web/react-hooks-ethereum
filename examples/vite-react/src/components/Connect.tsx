import { useConnect } from 'wagmi'

export const Connect = () => {
  const [
    {
      data: { connector, connectors },
      error,
      loading,
    },
    connect,
  ] = useConnect()

  return (
    <>
      <div>
        {connectors.map((x) => (
          <button key={x.name} onClick={() => connect(x)}>
            {x.name}
            {loading && x.name === connector?.name && '…'}
          </button>
        ))}
      </div>
      <div>{error && (error?.message ?? 'Failed to connect')}</div>
    </>
  )
}
