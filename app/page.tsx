import L2s from '@/components/L2s/L2s'
import type { ChainData, ColumnSetting } from '@/types'

type ChainDataResponse = ChainData[]

async function fetchData(): Promise<ChainDataResponse> {
  console.log('fetch from', process.env.API_BASE_URL + '/chain_data')

  const res = await fetch(process.env.API_BASE_URL + '/chain_data', {
    next: { revalidate: 6 },
  })

  if (!res.ok) {
    // TODO use history data
    console.error('Failed to fetch data', res.body)
    return []
  }

  return await res.json()
}

export default async function Home() {
  const l2s = await fetchData()
  console.log(l2s.find(l2 => l2.name === 'BEVM')?.mtime)

  if (!l2s) return <div>Loading...</div>

  const columns: ColumnSetting[] = [
    {
      name: 'Name',
      uid: 'name',
      sortable: true,
      align: 'start',
      width: 'xl',
    },
    {
      name: 'Stage',
      uid: 'stage',
      sortable: false,
      align: 'center',
    },
    {
      name: 'Token',
      uid: 'native_token_name',
      sortable: false,
      align: 'center',
      width: 24,
    },
    {
      name: 'Price(USD)',
      uid: 'price_usd',
      sortable: false,
      align: 'end',
    },
    {
      name: 'TVL(USD)',
      uid: 'tvl_price_usd',
      sortable: true,
      align: 'end',
    },
  ]

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="inline-block w-full text-center justify-center">
        <L2s items={l2s} columns={columns} />
      </div>
    </section>
  )
}
