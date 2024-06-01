import { type SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export type L2 = {
  /**
   * 链上手续费(原生代币计价)
   */
  fee_token: number | null
  /**
   * 链上手续费(USD计价)
   */
  fee_usd: number | null
  github_url: string | null
  icon_url: string | null
  explorer_url: string | null
  /**
   * ID
   */
  id: number
  labels: string | null
  /**
   * 市值(USD计价)
   */
  market_value: number | null
  name: string
  native_token_name: string | null
  /**
   * 原生代币价格(USD计价)
   */
  price_usd: number
  stage: string
  /**
   * TVL中的BTC量
   */
  tvl_btc_amount: number | null
  /**
   * TVL中的BTC总价(USD计价)
   */
  tvl_btc_price_usd: number | null
  /**
   * TVL中的ETH量
   */
  tvl_eth_amount: number | null
  /**
   * TVL中的ETH总价(BTC计价)
   */
  tvl_eth_price_btc: number | null
  /**
   * TVL中的ETH总价(USD计价)
   */
  tvl_eth_price_usd: number | null
  /**
   * TVL中的非BTC&ETH代币的总价(BTC计价)
   */
  tvl_other_price_btc: number | null
  /**
   * TVL中的非BTC&ETH代币的总价(USD计价)
   */
  tvl_other_price_usd: number | null
  /**
   * TVL总量(BTC计价)
   */
  tvl_price_btc: number | null
  /**
   * TVL总量(USD计价)
   */
  tvl_price_usd: number | null
  twitter_url: string | null
  mtime: string
}

export type ChainData = L2 & {
  creator: string | null
  ctime: string
  is_deleted: boolean
  modifier: string | null
}

export type ColumnSetting = {
  name: string
  uid: string
  sortable: boolean
  align?: 'start' | 'center' | 'end'
  width?:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 16
    | 20
    | 24
    | 32
    | 40
    | 48
    | 56
    | 60
    | 64
    | 72
    | 80
    | 96
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
}
