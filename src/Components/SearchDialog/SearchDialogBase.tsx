import React from "react";
import {ItemListProps, SearchDialogBaseProps} from "./types";
import {Box, Card, Dialog, DialogContent, DialogTitle, List, useMediaQuery, useTheme} from "@mui/material";

function ItemList<TItem>(props: ItemListProps<TItem>) {
    return (
        <List sx={{
            minWidth: props.listItemMinWidth,
            height: "100%",
            overflow: 'auto',
            pb: 0,
            pt: 0
        }}>
            {props.filteredItems.map((filteredItem, index) =>
                <props.renderListItem
                    item={filteredItem}
                    key={+new Date().getTime() + index}
                    field={props.field}
                    handleClickListItem={props.handleClickListItem}
                    handleMouseEnterListItem={props.handleMouseEnterListItem}
                    handleTouchStartListItem={props.handleTouchStartListItem}
                />
            )}
        </List>
    )
}

const MItemList = React.memo(ItemList, (prevProps, nextProps) => {
    return prevProps.filteredItems === nextProps.filteredItems
}) as unknown as typeof ItemList

export function SearchDialogBase<
    TItem
>(
    props: SearchDialogBaseProps<TItem>
) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const defaultItem = props.items.filter(item => props.searchFields.some(field => {
        const searchValue = item[field]
        return typeof searchValue === 'string' ? searchValue.includes(props.defaultShown) : false
    }))[0]

    const [filteredItems, setFilteredItems] = React.useState(props.items)
    const [currentItem, setCurrentItem] = React.useState(defaultItem !== undefined ? defaultItem : props.items[0])
    let selected = false

    const selectItem = (item?: TItem) => {
        setFilteredItems(props.items)
        setCurrentItem(defaultItem !== undefined ? defaultItem : props.items[0])
        props.handleSelectItem(item)
        selected = true
    }
    const handleFilterItem = (items: TItem[]) => {
        setFilteredItems(items)
        setCurrentItem(items[0])
    }
    const handleClickListItem = (item: TItem) => {
        selectItem(item)
    }
    const handleMouseEnterListItem = (item: TItem) => {
        !selected && setCurrentItem(item)
    }
    const handleTouchStartListItem = (item: TItem) => {
        !selected && setCurrentItem(item)
    }
    const handleClickInfoCard = () => {
        selectItem()
    }
    const handleCloseDialog = () => {
        selectItem()
    }

    const handleCommitSearch = () => {
        selectItem(currentItem)
    }

    return (
        <Dialog
            PaperProps={{sx: {width: "100%"}}}
            fullScreen={fullScreen}
            open={props.open}
            maxWidth='md'
            onClose={handleCloseDialog}
        >
            <DialogTitle>
                <props.renderSearchBar
                    items={props.items}
                    handleCommitSearch={handleCommitSearch}
                    handleFilterItems={handleFilterItem}
                    searchFields={props.searchFields}
                />
            </DialogTitle>
            <DialogContent sx={{display: 'flex'}}>
                <Box>
                    <MItemList
                        listItemMinWidth={props.listItemMinWidth}
                        filteredItems={filteredItems}
                        renderListItem={props.renderListItem}
                        field={props.field}
                        handleClickListItem={handleClickListItem}
                        handleMouseEnterListItem={handleMouseEnterListItem}
                        handleTouchStartListItem={handleTouchStartListItem}
                    />
                </Box>
                <Card
                    variant='outlined'
                    sx={{width: '100%', overflow: 'auto'}}
                    onClick={handleClickInfoCard}
                >
                    <props.renderInfoCard item={currentItem}/>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
