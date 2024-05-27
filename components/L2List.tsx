'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, ChipProps, SortDescriptor } from "@nextui-org/react";
import { formatToUserLocale } from '@/utils/utils';

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  test_stage: "warning",
};

export type L2Type = "Side Chain" | "ZK-Rollup" | "State Channel" | "Other"

export interface L2 {
  /**
   * 链上手续费(原生代币计价)
   */
  fee_token: number;
  /**
   * 链上手续费(USD计价)
   */
  fee_usd: number;
  github_url: string;
  icon_url: string;
  /**
   * ID
   */
  id: number;
  labels: string;
  /**
   * 市值(USD计价)
   */
  market_value: number;
  name: string;
  native_token_name: string;
  /**
   * 原生代币价格(USD计价)
   */
  price_usd: number;
  stage: string;
  /**
   * TVL中的BTC量
   */
  tvl_btc_amount: number;
  /**
   * TVL中的BTC总价(USD计价)
   */
  tvl_btc_price_usd: number;
  /**
   * TVL中的ETH量
   */
  tvl_eth_amount: number;
  /**
   * TVL中的ETH总价(BTC计价)
   */
  tvl_eth_price_btc: number;
  /**
   * TVL中的ETH总价(USD计价)
   */
  tvl_eth_price_usd: number;
  /**
   * TVL中的非BTC&ETH代币的总价(BTC计价)
   */
  tvl_other_price_btc: number;
  /**
   * TVL中的非BTC&ETH代币的总价(USD计价)
   */
  tvl_other_price_usd: number;
  /**
   * TVL总量(BTC计价)
   */
  tvl_price_btc: number;
  /**
   * TVL总量(USD计价)
   */
  tvl_price_usd: number;
  twitter_url: string;
  mtime: string;
}

export type L2Columns = {
  name: string;
  field: keyof L2;
  sortable?: boolean;
  align?: "start" | "center" | "end";
  valueAlign?: "left" | "center" | "right";
}[]

export default function L2List({ l2s, columns }: { l2s: L2[], columns: L2Columns }) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "tvl_price_usd",
    direction: "descending",
  })

  const renderCell = React.useCallback((l2: L2, columnKey: React.Key) => {
    const cellValue = l2[columnKey as keyof L2];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: l2.icon_url }}
            name={cellValue}
          >
            {l2.name}
          </User>
        );
      case "stage":
        return (
          <Chip className="capitalize border-none gap-1 text-default-600" color={statusColorMap[l2.stage]} size="sm" variant="dot">
            {cellValue}
          </Chip>
        );
      case "tvl_price_usd":
        return (
          <div className="relative flex gap-2">
            ${cellValue}
          </div>
        );
      case "price_usd":
        return (
          <div className="relative flex gap-2">
            ${Number(cellValue).toFixed(2)}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  )

  const sortedItems = React.useMemo(() => {
    return [...l2s].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof L2] as number;
      const second = b[sortDescriptor.column as keyof L2] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, l2s])

  const bottomContent = React.useMemo(() => (
    <div className="flex justify-end gap-2">
      updated at {formatToUserLocale(l2s.map(l2 => l2.mtime).sort().reverse()[0])}
    </div>
  ), [l2s])

  return (
    <Table aria-label="2slit.btc table" classNames={classNames}
      onSortChange={setSortDescriptor}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      removeWrapper>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.field}
            align={column.align}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{
              renderCell(item, columnKey)
            }</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
