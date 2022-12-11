import {ListItemProps, SearchBarProps} from "./types";
import {ListItemButton, TextField} from "@mui/material";
import React from "react";

export function ButtonListItem<TItem>(props: ListItemProps<TItem>) {
    const handleClick = () => {
        props.handleClickListItem(props.item)
    }
    const handleMouseEnter = () => {
        props.handleMouseEnterListItem(props.item)
    }
    const handleTouchStart = () => {
        props.handleTouchStartListItem(props.item)
    }
    return (
        <ListItemButton
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onTouchStart={handleTouchStart}
            sx={{pr: 1, pl: 1, 'fontSize': '14px'}}
        >
            <>{props.item[props.field]}</>
        </ListItemButton>
    )
}

export function SearchBar<TItem>(props: SearchBarProps<TItem>) {
    const [value, setValue] = React.useState('')

    // FIXME: Info card item and search value don't match
    const handleChange = (event: { target: { value: string } }) => {
        const newValue = event.target.value
        setValue(newValue)
        props.handleFilterItems(props.items.filter(
            item => props.searchFields.some(
                field => {
                    const searchValue = item[field]
                    return typeof searchValue === 'string' ?
                        searchValue.includes(newValue) ||
                        searchValue.includes(newValue.replace('nn', 'n')) ||
                        searchValue.includes(newValue.replace('sh', 'sy')) ||
                        searchValue.includes(newValue.replace('whi', 'wi')) :
                        false
                })
        ))
    }
    const handleKeyUp = (event: { key: string }) => {
        event.key === 'Enter' && props.handleCommitSearch()
    }

    return (
        <TextField
            autoFocus
            autoComplete='off'
            margin="dense"
            id="name"
            label="Search Field"
            fullWidth
            variant="filled"
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
        />
    )
}
