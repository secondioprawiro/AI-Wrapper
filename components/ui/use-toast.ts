// Simplified version of shadcn/ui toast
import * as React from "react"

export type ToastProps = {
    title?: string
    description?: string
    variant?: "default" | "destructive"
    duration?: number
}

type Action =
    | { type: "ADD_TOAST"; toast: ToastProps }
    | { type: "DISMISS_TOAST" }

let listeners: Array<(state: any) => void> = []
let memoryState = { toasts: [] as ToastProps[] }

function dispatch(action: Action) {
    memoryState = reducer(memoryState, action)
    listeners.forEach((listener) => listener(memoryState))
}

function reducer(state: any, action: Action) {
    switch (action.type) {
        case "ADD_TOAST":
            return { ...state, toasts: [action.toast, ...state.toasts].slice(0, 1) } // Limit to 1 for simplicity
        case "DISMISS_TOAST":
            return { ...state, toasts: [] }
        default:
            return state
    }
}

export function useToast() {
    const [state, setState] = React.useState(memoryState)

    React.useEffect(() => {
        listeners.push(setState)
        return () => {
            const index = listeners.indexOf(setState)
            if (index > -1) {
                listeners.splice(index, 1)
            }
        }
    }, [state])

    return {
        toast: (props: ToastProps) => {
            dispatch({ type: "ADD_TOAST", toast: props })
            if (props.duration !== Infinity) {
                setTimeout(() => {
                    dispatch({ type: "DISMISS_TOAST" })
                }, props.duration || 3000)
            }
        },
        dismiss: () => dispatch({ type: "DISMISS_TOAST" }),
        toasts: state.toasts
    }
}
