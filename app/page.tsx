import L2s from '@/components/L2s/L2s'
import type { ChainData } from '@/types'

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

  const columns = [
    {
      name: 'Name',
      uid: 'name',
      sortable: true,
      align: 'start',
      valueAlign: 'left',
    },
    {
      name: 'Stage',
      uid: 'stage',
      sortable: true,
      align: 'start',
      valueAlign: 'center',
    },
    {
      name: 'Price(USD)',
      uid: 'price_usd',
      sortable: true,
      align: 'center',
      valueAlign: 'right',
    },
    {
      name: 'TVL(USD)',
      uid: 'tvl_price_usd',
      sortable: true,
      align: 'end',
      valueAlign: 'right',
    },
  ]

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block w-full text-center justify-center">
        <L2s items={l2s} columns={columns} />
        {/* <L2List
          columns={}
          l2s={l2s}
        /> */}
      </div>
    </section>
  )
}
