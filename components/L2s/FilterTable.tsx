'use client'
import type { ColumnSetting, L2 } from '@/types'
import { formatToUserLocale, toMillionWithCommas } from '@/utils/clientUtils'
import type { Selection } from '@nextui-org/react'
import {
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  type ChipProps,
  type SortDescriptor,
} from '@nextui-org/react'
import clsx from 'clsx'
import React, { type Key } from 'react'
import { ExplorerIcon, GithubIcon, TwitterIcon } from '../icons'
import BottomContent from './BottomContent'
import TopContent from './TopContent'

const stageColorMap: Record<string, ChipProps['color']> = {
  Mainnet: 'success',
  'Pre-Testnet': 'warning',
  Testnet: 'primary',
}

type FilterTableProps = {
  columns: ColumnSetting[]
  sortedItems: any[]
  sortDescriptor: SortDescriptor | undefined
  setSortDescriptor: (descriptor: SortDescriptor) => any
  filterValue: string
  setFilterValue: (value: string) => void
  stageOptions: string[]
  stageFilter: 'all' | Iterable<Key>
  setStageFilter: (keys: Selection) => void
  onSearchChange: (value: string) => void
  initialVisibleColumns: string[]
  topContent?: JSX.Element
  bottomContent?: JSX.Element
}
const L2Table = ({
  columns,
  sortedItems,
  filterValue,
  setFilterValue,
  stageOptions,
  stageFilter,
  setStageFilter,
  onSearchChange,
  initialVisibleColumns,
  sortDescriptor,
  setSortDescriptor,
}: FilterTableProps) => {
  const classNames = React.useMemo(
    () => ({
      wrapper: ['l2s', 'pt-0 pr-1 pl-0', 'shadow-none'],
      thead: ['[&>tr]:first:shadow-none [&>tr>th]:first:py-5'],
      // tr: ['[&>th]:first:rounded-none', '[&>th]:last:rounded-none'],
      th: ['text-default-800', 'text-base font-medium'],
      td: [
        'text-base py-3 border-b border-default-200',
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  )
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(initialVisibleColumns),
  )
  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns
    return columns.filter(column =>
      Array.from(visibleColumns).includes(column.uid),
    )
  }, [columns, visibleColumns])

  const topContent = React.useMemo(
    () => (
      <TopContent
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        stageOptions={stageOptions}
        stageFilter={stageFilter}
        setStageFilter={setStageFilter}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onSearchChange={onSearchChange}
        columns={columns}
      />
    ),
    [
      filterValue,
      setFilterValue,
      stageOptions,
      stageFilter,
      setStageFilter,
      visibleColumns,
      onSearchChange,
      columns,
    ],
  )

  const bottomContent = React.useMemo(() => {
    const updatedAt = formatToUserLocale(
      sortedItems
        .map(l2 => l2.mtime)
        .sort()
        .reverse()[0],
    )
    return <BottomContent updatedAt={updatedAt} />
    // to avoid re-calculating the updatedAt every time sortedItems changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderCell = React.useCallback((item: L2, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof L2]
    switch (columnKey) {
      case 'name':
        return (
          <div className="horizontal">
            {item.icon_url && (
              <Avatar
                size="lg"
                src={item.icon_url}
                aria-label={'Icon of ' + item.name}
              />
            )}
            <div className="vertical items-start gap-0.5 pl-2.5">
              <div className="text-lg">{item.name}</div>
              <div className="horizontal gap-1 text-tiny text-default-500 ">
                {item.twitter_url && (
                  <a
                    href={item.twitter_url}
                    aria-label="Twitter URL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon size={24} />
                  </a>
                )}
                {item.github_url && (
                  <a
                    href={item.github_url}
                    aria-label="Github URL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GithubIcon size={24} />
                  </a>
                )}
                {item.explorer_url && (
                  <a
                    href={item.explorer_url}
                    aria-label="Explorer URL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExplorerIcon size={24} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )
      case 'native_token_name':
        return (
          <div className="flex justify-center overflow-hidden">
            {item.native_token_name}
          </div>
        )
      case 'stage':
        return (
          <Chip
            className="capitalize border-none"
            color={stageColorMap[item.stage]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case 'price_usd':
        return (
          <div className="flex justify-end font-mono">
            {Number(cellValue).toFixed(2)}
          </div>
        )
      case 'tvl_price_usd':
        return (
          <div className="flex justify-end font-bold font-mono">
            {cellValue ? toMillionWithCommas(cellValue) : '-'}
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table
      isHeaderSticky
      selectionMode="single"
      aria-label="Bitcoin Layer 2 Table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={classNames}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {column => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            className={clsx(
              'text-' + column.align,
              column.width && 'max-w-' + column.width,
            )}
          >
            <div className="inline-block">{column.name}</div>
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {item => (
          <TableRow key={item.id} className="text-default-800">
            {columnKey => (
              <TableCell
                className={clsx(
                  'text-nowrap',
                  columnKey === 'native_token_name' && 'max-w-24',
                )}
              >
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default L2Table
