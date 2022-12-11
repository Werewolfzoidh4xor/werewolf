import React from "react";

export type InfoCardProps<TItem> = {
    item: TItem
}

export type ListItemProps<TItem> = {
    item: TItem
    field: keyof TItem
    handleClickListItem: (item: TItem) => void
    handleMouseEnterListItem: (item: TItem) => void
    handleTouchStartListItem: (item: TItem) => void
}

export type ItemListProps<TItem> = {
    listItemMinWidth: number
    filteredItems: TItem[]
    renderListItem: (props: ListItemProps<TItem>) => React.ReactElement
} & Omit<ListItemProps<TItem>, 'item'>

export type SearchBarProps<TItem> = {
    items: TItem[]
    searchFields: (keyof TItem)[]
    handleFilterItems: (items: TItem[]) => void
    handleCommitSearch: () => void
}

export type SearchDialogBaseProps<TItem> = {
    field: keyof TItem
    defaultShown: string
    handleSelectItem: (item?: TItem) => void
    renderSearchBar: (props: SearchBarProps<TItem>) => React.ReactElement
    renderInfoCard: (props: InfoCardProps<TItem>) => React.ReactElement
    renderListItem: (props: ListItemProps<TItem>) => React.ReactElement
    open: boolean
    /**
     * ListItem will be narrowed to this value by the card occupies the remaining space
     */
    listItemMinWidth: number
} & Omit<SearchBarProps<TItem>, 'handleFilterItems' | 'handleCommitSearch'>

export type SearchDialogProps<TItem> = Omit<SearchDialogBaseProps<TItem>, 'renderListItem' | 'renderSearchBar'>
