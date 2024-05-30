'use client'
import type { ColumnSetting, L2 } from '@/types'
import type { Selection } from '@nextui-org/react'
import { type SortDescriptor } from '@nextui-org/react'
import React from 'react'
import FilterTable from './FilterTable'

const INITIAL_VISIBLE_COLUMNS = ['name', 'stage', 'tvl_price_usd', 'price_usd']
export default function L2s({
  items,
  columns,
}: {
  items: L2[]
  columns: ColumnSetting[]
}) {
  const [filterValue, setFilterValue] = React.useState('')
  const [stageFilter, setStageFilter] = React.useState<Selection>('all')
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'tvl_price_usd',
    direction: 'descending',
  })

  const stageOptions = React.useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc.includes(item.stage)) {
        acc.push(item.stage)
      }
      return acc
    }, [] as string[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredItems = React.useMemo(() => {
    let filteredItems = [...items]
    if (filterValue) {
      filteredItems = filteredItems.filter(user =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }

    if (
      stageFilter !== 'all' &&
      Array.from(stageFilter).length !== stageOptions.length
    ) {
      filteredItems = filteredItems.filter(item =>
        Array.from(stageFilter).includes(item.stage),
      )
    }
    return filteredItems
  }, [items, filterValue, stageFilter, stageOptions.length])

  // TODO pagination
  // const pagedItems = React.useMemo(() => {
  //   const start = (page - 1) * rowsPerPage
  //   const end = start + rowsPerPage
  //   return filteredItems.slice(start, end)
  // }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: L2, b: L2) => {
      const first = a[sortDescriptor.column as keyof L2] as number
      const second = b[sortDescriptor.column as keyof L2] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0
      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, filteredItems])

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
    } else {
      setFilterValue('')
    }
  }, [])

  return (
    <FilterTable
      columns={columns}
      sortedItems={sortedItems}
      sortDescriptor={sortDescriptor}
      setSortDescriptor={sort => setSortDescriptor(sort)}
      filterValue={filterValue}
      setFilterValue={setFilterValue}
      stageOptions={stageOptions}
      stageFilter={stageFilter}
      setStageFilter={setStageFilter}
      onSearchChange={onSearchChange}
      initialVisibleColumns={INITIAL_VISIBLE_COLUMNS}
    />
  )
}
