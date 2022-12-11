import {SearchDialogBase} from "./SearchDialogBase";
import {ButtonListItem, SearchBar} from "./SearchDialogElements";
import * as React from "react";
import {SearchDialogProps} from "./types";

export function SearchDialog<TItem>(props: SearchDialogProps<TItem>) {
    return (
        <SearchDialogBase
            items={props.items}
            field={props.field}
            searchFields={props.searchFields}
            defaultShown={props.defaultShown}
            renderInfoCard={props.renderInfoCard}
            handleSelectItem={props.handleSelectItem}
            open={props.open}
            listItemMinWidth={props.listItemMinWidth}
            renderListItem={ButtonListItem}
            renderSearchBar={SearchBar}
        />
    )
}
