import * as React from "react";
import {
    CellChildrenProps,
    HeaderCellChildrenProps,
    PredefinedCellEvent
} from "./types";
import {InputBase} from "@mui/material";
import Button from "@mui/material/Button";
import SortIcon from "@mui/icons-material/Sort";

export function AsIsHeaderCell<TRow, TCellEvent>(props: HeaderCellChildrenProps<TRow, TCellEvent>) {
    return (
        <>{props.column.label}</>
    )
}

export function SortIconHeaderCell<TRow, TCellEvent>(props: HeaderCellChildrenProps<TRow, TCellEvent>) {
    const handleClick = () => {
        props.handleHeaderCellUpdate(props.column)
    }

    return (
        <div>
            <Button
                onClick={handleClick}
                startIcon={<SortIcon/>}
            >
                {props.column.label}
            </Button>
        </div>
    )
}

export function AsIsCell<TRow, TCellEvent>(props: CellChildrenProps<TRow, TCellEvent>) {
    return (
        <>{props.row[props.column.field]}</>
    )
}

export function InputCell<TRow, TCellEvent>(props: CellChildrenProps<TRow, TCellEvent>) {
    const [value, setValue] = React.useState(String(props.row[props.column.field]))

    const handleCellUpdate = (event: PredefinedCellEvent, newValue: string) => {
        props.handleCellUpdate(
            newValue,
            props.column,
            props.index,
            event
        )
    }

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(event.target.value)
        // Needs to pass raw data because state update isn't synchronized
        handleCellUpdate('InputCellChange', event.target.value)
    }

    const handleFocus = () => {
        handleCellUpdate('InputCellFocus', value)
    }

    return (
        <InputBase
            sx={{width: '100%', '& .MuiInputBase-input': {p: 0}}}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
        />
    )
}
