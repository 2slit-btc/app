'use client'
import type { ColumnSetting } from '@/types'
import { formatToUserLocale } from '@/utils/clientUtils'
import type { Selection } from '@nextui-org/react'
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  type ChipProps,
  type SortDescriptor,
} from '@nextui-org/react'
import React, { type Key } from 'react'
import BottomContent from './BottomContent'
import TopContent from './TopContent'

const statusColorMap: Record<string, ChipProps['color']> = {
  Mainnet: 'success',
  paused: 'danger',
  'to be done': 'warning',
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
      wrapper: ['max-h-screen', 'pt-0 pr-1 pl-0', 'shadow-none'],
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

  const renderCell = React.useCallback(
    (item: Record<string, any>, columnKey: React.Key) => {
      const cellValue = item[columnKey]
      switch (columnKey) {
        case 'name':
          return (
            <User
              avatarProps={{ radius: 'full', size: 'sm', src: item.icon_url }}
              classNames={{ description: 'text-default-500' }}
              description={item.native_token_name}
              name={cellValue}
            >
              {item.name}
            </User>
          )
        case 'status':
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[item.stage]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          )
        case 'tvl_price_usd':
          return (
            <div className="relative flex gap-2">
              ${Number(cellValue).toFixed(2)}
            </div>
          )
        case 'price_usd':
          return (
            <div className="relative flex gap-2">
              ${Number(cellValue).toFixed(2)}
            </div>
          )
        default:
          return cellValue
      }
    },
    [],
  )

  return (
    <Table
      isHeaderSticky
      selectionMode="single"
      aria-label="Example table with custom cells, pagination and sorting"
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
            align="start"
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No users found'} items={sortedItems}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default L2Table
