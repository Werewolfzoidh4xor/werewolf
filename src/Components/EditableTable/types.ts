import React from "react";
import {SxProps, TableCellProps} from "@mui/material";

export type InputCellEvent = 'InputCellChange' | 'InputCellFocus'
export type PredefinedCellEvent = InputCellEvent

export type Column<TRow, TCellEvent> = {
    label: string
    field: keyof TRow
    renderCell: (props: CellChildrenProps<TRow, TCellEvent>) => React.ReactElement
    sx?: SxProps
    padding?: TableCellProps["padding"]
    renderHeaderCell: (props: HeaderCellChildrenProps<TRow, TCellEvent>) => React.ReactElement
}

export type HeaderCellChildrenProps<TRow, TCellEvent> = {
    column: Column<TRow, TCellEvent>
    handleHeaderCellUpdate: (column: Column<TRow, TCellEvent>) => void
}

export type HeaderCellProps<TRow, TCellEvent> = HeaderCellChildrenProps<TRow, TCellEvent>

export type HeaderRowProps<TRow, TCellEvent> = {
    columns: Column<TRow, TCellEvent>[]
} & Omit<HeaderCellProps<TRow, TCellEvent>, 'column'>

export type CellChildrenProps<TRow, TCellEvent> = {
    row: TRow
    column: Column<TRow, TCellEvent>
    index: number
    handleCellUpdate: (
        value: string | number,
        column: Column<TRow, TCellEvent>,
        index: number,
        event: TCellEvent | PredefinedCellEvent
    ) => void
}

export type CellProps<TRow, TCellEvent> = {
    handleClickCell: (column: Column<TRow, TCellEvent>) => void
} & CellChildrenProps<TRow, TCellEvent>

export type RowProps<TRow, TCellEvent> = {
    columns: Column<TRow, TCellEvent>[]
    handleClickRow: (index: number, setSelected: React.Dispatch<React.SetStateAction<boolean>>) => void
} & Omit<CellProps<TRow, TCellEvent>, 'column'>

export type EditableTableProps<TRow, TCellEvent> = {
    rows: TRow[]
} & Omit<RowProps<TRow, TCellEvent>, 'row' | 'index'> & HeaderRowProps<TRow, TCellEvent>
