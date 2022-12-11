import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import config from "../config.json";
import {Column, CellChildrenProps, PredefinedCellEvent} from "../Components/EditableTable/types";
import {
    AsIsCell,
    AsIsHeaderCell,
    InputCell, SortIconHeaderCell,
} from "../Components/EditableTable/EditableTableElements";
import {
    Autocomplete,
    AutocompleteChangeDetails,
    CardContent,
    CardMedia,
    Grid,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import {EditableTable} from "../Components/EditableTable/EditableTable";
import {InfoCardProps} from "../Components/SearchDialog/types";
import {SearchDialog} from "../Components/SearchDialog/SearchDialog";
import {MouseEventHandler, useEffect} from "react";
import SwipeableViews from "react-swipeable-views";
import Box from "@mui/material/Box";

// Parts for SearchDialog
type Character = {
    name: string
    text: string
    hiragana: string
    description: string
}

const characters: Character[] = config.characters

type Role = {
    raid: string
    fortune: string
    psychic: string
    unique: string
    count: string
    name: string
    text: string
    hiragana: string
    description: string
    team: string
    html: string
}

const roles: Role[] = config.roles

function CharacterInfoCard(props: InfoCardProps<Character>) {
    const character = config.characters.find(character => props.item !== undefined && character.name === props.item.name)
    return character === undefined ? <></> : (
        <div>
            <CardMedia
                component="img"
                image={require(`../assets/images/characters/${props.item.name}.png`)}
                alt="no chara image"
            />
            <CardContent>
                <Typography variant="h5">
                    {character.text}
                </Typography>
                {/*<Typography sx={{wordWrap: 'break-word'}} variant="body2">*/}
                {/*    {character.description}*/}
                {/*</Typography>*/}
            </CardContent>
        </div>
    )
}

// function RoleInfoCard(props: InfoCardProps<Role>) {
//     const role = config.roles.find(role => props.item !== undefined && role.name === props.item.name)
//     return role === undefined ? <></> : (
//         <div dangerouslySetInnerHTML={{__html: role.html}}/>
//     )
// }

function RoleInfoCard(props: InfoCardProps<Character>) {
    const [key, setKey] = React.useState(0)
    const role = config.roles.find(role => props.item !== undefined && role.name === props.item.name)
    const handleBack = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        setKey(key => key + 1)
    }
    return role === undefined ? <></> : (
        <>
            <Button onClick={handleBack}>戻る</Button>
            <Button>閉じる</Button>
            <iframe
                title='roleInfoCard'
                src={role.html}
                width={'100%'}
                height={'100%'}
                key={key}
            />
        </>
    )
}

// Parts for EditableTable
type CellEvent = 'RatingCellChangeCommitted' | 'SearchDialogItemSelected' | 'ConditionChanged'

enum Condition {
    Survive = '生存',
    Killed = '襲撃',
    Executed = '処刑',
    SuddenDeath = '突然死',
    TookAlong = '道連れ',
    Followed = '後追い'
}

type Row = {
    text: string
    co: string
    description: string
    rating: number
    condition: Condition
}

function RatingCell(props: CellChildrenProps<Row, CellEvent>) {
    const [value, setValue] = React.useState(props.row.rating);

    const handleChange = (event: Event, newValue: number | number[]) => {
        typeof newValue === 'number' && setValue(newValue)
    };

    const handleChangeCommitted = (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
        typeof newValue === 'number' && props.handleCellUpdate(
            newValue,
            props.column,
            props.index,
            'RatingCellChangeCommitted'
        )
    }

    return (
        <Grid sx={{pl: 1, minWidth: 150}} container spacing={1} alignItems="center">
            <Grid item sx={{width: '75%'}}>
                <Slider size='small'
                        onChange={handleChange}
                        onChangeCommitted={handleChangeCommitted}
                        value={value}
                />
            </Grid>
            <Grid item>
                {value}
            </Grid>
        </Grid>
    );
}

function CoCell(props: CellChildrenProps<Row, CellEvent>) {
    const [open, setOpen] = React.useState(false)
    const handleSelectItem = (role?: Role) => {
        role !== undefined && props.handleCellUpdate(
            role.text,
            props.column,
            props.index,
            'SearchDialogItemSelected'
        )
        setOpen(false)
    }
    const handleClick = () => {
        setOpen(open => !open)
    }
    return (
        <div>
            <Button onClick={handleClick}>
                {props.row[props.column.field]}
            </Button>
            <SearchDialog
                items={roles}
                field={'text'}
                searchFields={['name', 'hiragana', 'text']}
                defaultShown={String(props.row[props.column.field])}
                renderInfoCard={RoleInfoCard}
                handleSelectItem={handleSelectItem}
                open={open}
                listItemMinWidth={120}
            />
        </div>
    )
}

export function ConditionCell(props: CellChildrenProps<Row, CellEvent>) {
    const [value, setValue] = React.useState(props.row[props.column.field] as Condition)
    const handleChange = (
        event: React.SyntheticEvent,
        value: NonNullable<Condition>
    ) => {
        setValue(value)
        props.handleCellUpdate(
            value,
            props.column,
            props.index,
            'ConditionChanged'
        )
    }
    return (
        <Autocomplete
            options={Object.values(Condition)}
            disableClearable
            value={value}
            onChange={handleChange}
            renderInput={(params) =>
                <div ref={params.InputProps.ref}>
                    <input style={{
                        width: '80px',
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        fontSize: '0.875rem'
                    }} {...params.inputProps}/>
                </div>
            }
        />
    )
}

const columns: Column<Row, CellEvent>[] = [
    {
        label: '名前',
        field: 'text',
        sx: {minWidth: 80},
        renderCell: AsIsCell,
        renderHeaderCell: AsIsHeaderCell
    },
    {
        label: '状態',
        field: 'condition',
        sx: {minWidth: 85},
        renderCell: ConditionCell,
        renderHeaderCell: AsIsHeaderCell
    },
    {
        label: 'CO',
        field: 'co',
        sx: {minWidth: 80},
        padding: 'none',
        renderCell: CoCell,
        renderHeaderCell: AsIsHeaderCell
    },
    {
        label: '説明',
        field: 'description',
        sx: {width: '100%', minWidth: 150},
        renderCell: InputCell,
        renderHeaderCell: AsIsHeaderCell
    },
    {
        label: '白さ',
        field: 'rating',
        sx: {minWidth: 150},
        renderCell: RatingCell,
        renderHeaderCell: SortIconHeaderCell
    },
]

export type MinutesTableProps = {
    day: number,
    rows: Row[]
    handleUpdateRows(day: number, rows: Row[], commitRows: () => Row[]): void
}

export const MinutesTable = (props: MinutesTableProps) => {
    const {day, handleUpdateRows} = props
    const [open, setOpen] = React.useState(false)
    const [rows, setRows] = React.useState<Row[]>(props.rows)

    // Use refs to prevent data loss when editable table runs old copy of handlers
    const clickedFieldRef = React.useRef<keyof Row>()
    const selectedRowsRef = React.useRef<{
        index: number,
        setSelected: React.Dispatch<React.SetStateAction<boolean>>
    }[]>([])
    const editingRowRef = React.useRef<{ index?: number, row: Partial<Row> }>({index: undefined, row: {}})

    useEffect(() => {
        handleUpdateRows(day, rows, commitRows)
    }, [handleUpdateRows, day, rows])

    const deselectRows = () => {
        selectedRowsRef.current.forEach(selectedRow => selectedRow.setSelected(false))
        selectedRowsRef.current = []
    }
    const commitRows = () => {
        let newRows: Row[] = []
        setRows(prevRows => {
            newRows = prevRows.map(
                (prevRow, prevRowIndex) =>
                    prevRowIndex === editingRowRef.current.index ?
                        {...prevRow, ...editingRowRef.current.row} :
                        prevRow
            )
            return newRows
        })
        editingRowRef.current = {index: undefined, row: {}}
        return newRows
    }

    // handlers for buttons
    const handleClickAdd = () => {
        setOpen(true)
    }
    const handleClickDelete = () => {
        setRows(prevRows => prevRows.map(
            (prevRow, prevRowIndex) =>
                prevRowIndex === editingRowRef.current.index ?
                    {...prevRow, ...editingRowRef.current.row} :
                    prevRow
        ).filter(
            (prevRow, index) => !selectedRowsRef.current.some(selectedRow => selectedRow.index === index)
        ))
        deselectRows()
    }

    // handlers for search dialog
    const handleSelectItem = (item?: Character) => {
        if (item !== undefined && !rows.some(row => row.text === item.text)) {
            console.log('[handleSelectItem]', item)
            setRows(prevRows => [
                ...prevRows,
                {text: item.text, co: 'グレー', description: '', rating: 50, condition: Condition.Survive}
            ])
        }
        setOpen(false)
    }

    // handlers for editable table
    const handleClickCell = (column: Column<Row, CellEvent>) => {
        // Cell click event runs before row click event
        clickedFieldRef.current = column.field
    }
    const handleClickRow = (index: number, setSelected: React.Dispatch<React.SetStateAction<boolean>>) => {
        if (clickedFieldRef.current === 'text') {
            // Commit before changing state of the row not to lose data on row's re-render
            commitRows()
            setSelected(selected => !selected)
            let newSelectedRows = selectedRowsRef.current.filter(selectedRow => selectedRow.index !== index)
            selectedRowsRef.current = newSelectedRows.length === selectedRowsRef.current.length ?
                [...selectedRowsRef.current, {setSelected, index}] :
                newSelectedRows
        }
    }
    const handleCellUpdate = (
        value: string | number,
        column: Column<Row, CellEvent>,
        index: number,
        event: CellEvent | PredefinedCellEvent
    ) => {
        // index means current cell index, editingRowRef.current.index means the index of last added editing row
        const addRow = () => editingRowRef.current = {
            index: index,
            row: {...editingRowRef.current.row, [column.field]: value}
        }
        switch (event) {
            case "ConditionChanged":
                addRow()
                commitRows()
                break
            case "InputCellChange":
                // Don't commit before moving to another row to prevent losing focus when render row
                addRow()
                break
            case "RatingCellChangeCommitted":
                addRow()
                commitRows()
                break
            case "InputCellFocus":
                // Commit changes only when focus to another row, to avoid losing focus when the row and the cell being entered render at the same time
                editingRowRef.current.index !== undefined && editingRowRef.current.index !== index && commitRows()
                break
            case "SearchDialogItemSelected":
                addRow()
                commitRows()
                break
        }
    }
    const handleHeaderCellUpdate = (column: Column<Row, CellEvent>) => {
        // It is necessary to map because sort sorts and return the original which don't trigger the state change
        if (column.field === 'rating') {
            deselectRows()
            setRows(prevRows => prevRows.sort(
                (a: Row, b: Row) => b.rating - a.rating
            ).map(row => row))
        }
    }

    return (
        <Box>
            <Typography variant='h5'>{props.day}日目</Typography>
            <Button startIcon={<AddIcon/>} onClick={handleClickAdd}>
                キャラを追加
            </Button>
            <Button startIcon={<DeleteIcon/>} onClick={handleClickDelete}>
                選択を削除
            </Button>
            <EditableTable
                rows={rows}
                columns={columns}
                handleCellUpdate={handleCellUpdate}
                handleHeaderCellUpdate={handleHeaderCellUpdate}
                handleClickCell={handleClickCell}
                handleClickRow={handleClickRow}
            />
            <SearchDialog
                items={characters}
                field='text'
                searchFields={['name', 'hiragana', 'text']}
                defaultShown=''
                renderInfoCard={CharacterInfoCard}
                handleSelectItem={handleSelectItem}
                open={open}
                listItemMinWidth={110}
            />
        </Box>
    )
}

export default function DiaryPage() {
    const [day, setDay] = React.useState(1)
    const dayRowsRef = React.useRef<{ day: number, rows: Row[], commitRows: () => Row[] }[]>([{
        day: day,
        rows: [],
        commitRows: () => []
    }])
    const handleUpdateRows = (day: number, rows: Row[], commitRows: () => Row[]) => {
        dayRowsRef.current[day - 1] = {day: day, rows: rows, commitRows: commitRows}
    }
    const [tables, setTables] = React.useState([
        <MinutesTable
            day={dayRowsRef.current[0].day}
            rows={dayRowsRef.current[0].rows}
            handleUpdateRows={handleUpdateRows}
        />
    ])
    const handleNext = () => {
        if (day === tables.length) {
            const newRows = dayRowsRef.current[dayRowsRef.current.length - 1].commitRows()
            setTables(tables => [
                ...tables,
                <MinutesTable
                    day={dayRowsRef.current[dayRowsRef.current.length - 1].day + 1}
                    rows={newRows}
                    handleUpdateRows={handleUpdateRows}
                />
            ])
            dayRowsRef.current.push({
                day: dayRowsRef.current[dayRowsRef.current.length - 1].day + 1,
                rows: dayRowsRef.current[dayRowsRef.current.length - 1].rows,
                commitRows: () => []
            })
        }
        setDay(yesterday => yesterday + 1);
    };
    const handleBack = () => {
        setDay((today) => today - 1);
    };
    const handleStepChange = (step: number) => {
        setDay(step + 1);
    };
    return (
        <div>
            <SwipeableViews
                index={day - 1}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {tables}
            </SwipeableViews>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                <Button
                    color="inherit"
                    disabled={day === 1}
                    onClick={handleBack}
                    sx={{mr: 1}}
                >
                    Back
                </Button>
                <Box sx={{flex: '1 1 auto'}}/>
                <Button onClick={handleNext}>
                    Next
                </Button>
            </Box>
        </div>
    );
}
