'use client'
import { capitalize } from '@/utils/clientUtils'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Kbd,
  type Selection,
} from '@nextui-org/react'
import type { Key } from 'react'
import { ChevronDownIcon, SearchIcon } from '../icons'

type TopContentProps = {
  filterValue: string
  setFilterValue: (value: string) => void
  stageOptions: string[]
  stageFilter: 'all' | Iterable<Key>
  setStageFilter: (keys: Selection) => void
  visibleColumns: 'all' | Iterable<Key> | undefined
  setVisibleColumns: (keys: Selection) => void
  onSearchChange: (value: string) => void
  columns: { name: string; uid: string }[]
}
const TopContent = ({
  filterValue,
  setFilterValue,
  stageOptions,
  stageFilter,
  setStageFilter,
  visibleColumns,
  setVisibleColumns,
  onSearchChange,
  columns,
}: TopContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        {/* search box */}
        <Input
          aria-label="Search"
          classNames={{
            // base: 'w-full sm:max-w-[44%]',
            inputWrapper:
              'bg-default-100 relative tap-highlight-transparent shadow-sm px-3 gap-3 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-10 min-h-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none :ring-offset-background bg-default-100 border-none',
            input: 'text-base',
          }}
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <Kbd className="inline-block" keys={['command']}>
              K
            </Kbd>
          }
          labelPlacement="outside"
          placeholder="Search by name..."
          size="sm"
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue('')}
          onValueChange={onSearchChange}
        />

        <div className="flex gap-3">
          {/* stages filter */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-base" />}
                size="md"
                variant="flat"
              >
                Stage
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={stageFilter}
              selectionMode="multiple"
              onSelectionChange={setStageFilter}
            >
              {stageOptions.map(stage => (
                <DropdownItem key={stage} className="capitalize">
                  {capitalize(stage)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* columns filter */}
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-base" />}
                size="md"
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map(column => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {/* <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {length} items
        </span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div> */}
    </div>
  )
}

export default TopContent
