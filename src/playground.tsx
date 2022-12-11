import React from "react";

type Employee = {
    id: number;
    name: string;
    salary: number;
};

const employee: Employee = {
    id: 1,
    name: 'Alice',
    salary: 100,
};

function example(str: string) {
    // ✅ Works now
    return employee[str as keyof Employee];
}

type T1 = {
    f?: () => void
}

type T2 = {
    [key: string]: string | undefined
} & T1

// const t2: T2 = {
//     f: () => {}
// }

type P1 = {
    v1: string
}

type P2 = {
    v2: string
}

type P = {
    f: (p1: P1, p2: P2) => JSX.Element
}

const p1: P1 = {v1: 'aaa'}
const p2: P2 = {v2: 'bbb'}

interface Todo {
    title: string;
    description?: any
    completed: boolean;
}

function test(todo: Todo) {
    typeof todo.description === 'string' ? test2(todo.description) : console.log('A')
}

function test2(s: string) {

}
export function Z(p: P) {
    const [a, setA] = React.useState<string>('')
    return (
        <div>
            <p.f {...p1} {...p2}/>
            <h1>{a}</h1>
        </div>
    )
}
export function getFuncName() {
    return getFuncName.caller.caller.name
}

export function log(message?: any, ...optionalParams: any[]) {
    console.log(`[${getFuncName()}] `, message, ...optionalParams)
}

type ErrorCode<TCode> =
    | 400
    | 401
    | 402
    | 403
    | 404
    | 405
    | TCode


type EC = 1 | 2 | 3

type AU = {[key: string]: string}

const e1: ErrorCode<EC> = 405
const e2: ErrorCode<EC> = 3
console.log(e2)

const m: <T>(c: T) => T = React.memo
const c = <h1>A</h1>
const mc = m(c)
const m2: <T>(c: T) => T = React.memo
// const mc2: typeof mc =
