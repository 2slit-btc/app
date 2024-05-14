import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import L2List, { L2Type } from '@/components/L2List';

type listResponse = {
	nextCursor: number;
	list: {
		id: number;
		name: string;
		type: L2Type;
		TVL: number;
		shares: number;
		icon: string;
	}[]
}
async function getData(): Promise<listResponse> {
	console.log(process.env.API_BASE_URL + '/list')

	return {
    "nextCursor": 36,
    "list": [
        {
            "id": 97,
            "name": "dubw",
            "type": "Side Chain",
            "TVL": 6,
            "shares": 65.60810920890417,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 89,
            "name": "fvy",
            "type": "Side Chain",
            "TVL": 61,
            "shares": 75.61624939997992,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 53,
            "name": "ttsq",
            "type": "Side Chain",
            "TVL": 34,
            "shares": 15.052013467421709,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 74,
            "name": "cuk",
            "type": "Other",
            "TVL": 99,
            "shares": 79.0141118268454,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 7,
            "name": "lvy",
            "type": "Other",
            "TVL": 43,
            "shares": 45.56727618134434,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 86,
            "name": "cxff",
            "type": "Side Chain",
            "TVL": 40,
            "shares": 87.12181570394169,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 97,
            "name": "tmtr",
            "type": "Other",
            "TVL": 42,
            "shares": 77.08523797284693,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 45,
            "name": "yuir",
            "type": "ZK-Rollup",
            "TVL": 16,
            "shares": 54.502965942087,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 21,
            "name": "gwgz",
            "type": "ZK-Rollup",
            "TVL": 57,
            "shares": 56.778833547794676,
            "icon": "http://dummyimage.com/50x50"
        },
        {
            "id": 7,
            "name": "dnvm",
            "type": "State Channel",
            "TVL": 20,
            "shares": 15.78439166033339,
            "icon": "http://dummyimage.com/50x50"
        }
    ]
	}

  const res = await fetch(process.env.API_BASE_URL + '/list')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
	console.log(res.json())
 
  return res.json()
}

export default async function Home() {
  const l2s = await getData()

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block w-full text-center justify-center">
				<L2List 
					columns={[
						{ name: "Name", field: "name" },
						{ name: "Type", field: "type" },
						{ name: "TVL", field: "TVL" },
						{ name: "Shares", field: "shares" },
					]}
					l2s={l2s.list}
				/>
			</div>
		</section>
	);
}
