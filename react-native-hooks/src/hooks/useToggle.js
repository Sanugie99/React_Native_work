import { useState } from "react"

export const useToggle = (initialValue = false) => {
    const [value, setThemes] = useState(initialValue)

    const toggle = () => {
        setThemes(prev => !prev)
    }

    return{value, toggle};
}