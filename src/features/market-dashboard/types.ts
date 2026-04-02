import type { SortKey, SortDirection } from '../../shared/types'

export type SortState = {
  key:       SortKey
  direction: SortDirection
}

export type SortConfig = {
  sortKey: SortKey
  sortDir: SortDirection
  onSort:  (key: SortKey) => void
}