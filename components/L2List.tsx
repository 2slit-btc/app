'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, ChipProps, getKeyValue } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export type L2Type = "Side Chain" | "ZK-Rollup" | "State Channel" | "Other"

export interface L2 {
  icon: string;
  id: number;
  name: string;
  /**
   * market share, including 2 decimals
   */
  shares: number;
  /**
   * in Million USD
   */
  TVL: number;
  type: L2Type;
}

export type L2Columns = {
  name: string;
  field: keyof L2;
}[]

export default function L2List({ l2s, columns }: { l2s: L2[], columns: L2Columns }) {
  const renderCell = React.useCallback((l2: L2, columnKey: React.Key) => {
    const cellValue = l2[columnKey as keyof L2];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: l2.icon }}
            name={cellValue}
          >
            {l2.name}
          </User>
        );
      case "type":
        return (
          <Chip className="capitalize" color={statusColorMap[l2.type]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "TVL":
        return (
          <div className="relative flex items-end gap-2">
            {cellValue} M
          </div>
        );
      case "shares":
        return (
          <div className="relative flex items-end gap-2">
            {Number(cellValue).toFixed(2)} %
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="2slit.btc table" removeWrapper>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.field} align={column.field === "type" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={l2s}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
