import TableContainer from "@mui/material/TableContainer"
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material"
import React from "react"
import {CellProps, EditableTableProps, HeaderCellProps, HeaderRowProps, RowProps} from "./types"

const Row = <TRow, TCellEvent>(props: RowProps<TRow, TCellEvent>) => {
    const [selected, setSelected] = React.useState(false)
    const handleClick = () => {
        props.handleClickRow(props.index, setSelected)
    }
    return (
        <TableRow
            sx={{overflow: 'hidden'}}
            selected={selected}
            onClick={handleClick}
        >
            {props.columns.map((column, index) => (
                <MCell
                    row={props.row}
                    index={props.index}
                    column={column}
                    handleCellUpdate={props.handleCellUpdate}
                    handleClickCell={props.handleClickCell}
                    key={+new Date().getTime() + index}
                />
            ))}
        </TableRow>
    )
}

const MRow = React.memo(Row, (prevProps, nextProps) => {
    // This also makes all children to update only when the row was changed except their own state change
    return prevProps.row === nextProps.row
}) as typeof Row

const Cell = <TRow, TCellEvent>(props: CellProps<TRow, TCellEvent>) => {
    const handleClick = () => {
        props.handleClickCell(props.column)
    }

    return (
        <TableCell
            padding={props.column.padding}
            onClick={handleClick}
        >
            <props.column.renderCell
                column={props.column}
                row={props.row}
                index={props.index}
                handleCellUpdate={props.handleCellUpdate}
            />
        </TableCell>
    )
}

const MCell = React.memo(Cell, (prevProps, nextProps) => {
    return false
}) as typeof Cell

const HeaderRow = <TRow, TCellEvent>(props: HeaderRowProps<TRow, TCellEvent>) => {
    return (
        <TableRow>
            {props.columns.map((column, index) => (
                <MHeaderCell
                    column={column}
                    key={column.label + index}
                    handleHeaderCellUpdate={props.handleHeaderCellUpdate}
                />
            ))}
        </TableRow>
    )
}

export const MHeaderRow = React.memo(HeaderRow, () => {
    // This also prevent children from rendering except their own state change
    return true
}) as typeof HeaderRow

const HeaderCell = <TRow, TCellEvent>(props: HeaderCellProps<TRow, TCellEvent>) => {
    return (
        <TableCell sx={props.column.sx}>
            <props.column.renderHeaderCell
                column={props.column}
                handleHeaderCellUpdate={props.handleHeaderCellUpdate}
            />
        </TableCell>
    )
}

const MHeaderCell = React.memo(HeaderCell, () => {
    return false
}) as typeof HeaderCell

export function EditableTable<
    TRow, TCellEvent
>(
    props: EditableTableProps<TRow, TCellEvent>
) {
    return (
        <TableContainer>
            <Table sx={{borderCollapse: 'unset'}}>
                <TableHead>
                    <MHeaderRow
                        columns={props.columns}
                        handleHeaderCellUpdate={props.handleHeaderCellUpdate}
                    />
                </TableHead>
                <TableBody>
                    {
                        props.rows.map((row, index) => (
                            <MRow
                                key={index}
                                row={row}
                                index={index}
                                columns={props.columns}
                                handleClickRow={props.handleClickRow}
                                handleClickCell={props.handleClickCell}
                                handleCellUpdate={props.handleCellUpdate}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
