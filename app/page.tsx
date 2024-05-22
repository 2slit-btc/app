import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import L2List, { L2 } from '@/components/L2List';

type ChainData = L2 & {
	creator: string;
	ctime: string;
	explorer_url: string;
	is_deleted: boolean;
	modifier: string;
	mtime: string;
}
type ChainDataResponse = ChainData[]

async function getData(): Promise<ChainDataResponse> {
	console.log(process.env.API_BASE_URL + '/chain_data')

	const res = await fetch(process.env.API_BASE_URL + '/chain_data')

	if (!res.ok) {
		// TODO use history data
		console.error('Failed to fetch data', res.body)

		throw new Error('Failed to fetch data')
	}

	return await res.json()
}

export default async function Home() {
	const l2s = await getData()
	console.log(l2s)

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block w-full text-center justify-center">
				<L2List
					columns={[
						{ name: "Name", field: "name", sortable: true, align: "start", valueAlign: 'left' },
						{ name: "Stage", field: "stage", sortable: false, align: "start", valueAlign: 'center' },
						{ name: "Price(USD)", field: "price_usd", sortable: true, align: "center", valueAlign: 'right' },
						{ name: "TVL(USD)", field: "tvl_price_usd", sortable: true, align: "end", valueAlign: 'right' },
					]}
					l2s={l2s}
				/>
			</div>
		</section>
	);
}
