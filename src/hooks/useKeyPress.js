import { useState, useEffect } from 'react'

const useKeyPress = (targetKeyCode) => {
    const [keyPressed, setkeyPressed] = useState(false)
    const keyDownHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setkeyPressed(true)
        }
    }
    const keyUpHandler = ({ keyCode }) => {
        if (keyCode === targetKeyCode) {
            setkeyPressed(false)
        }
    }
    useEffect(() => {
        document.addEventListener('keydown', keyDownHandler)
        document.addEventListener('keyup', keyUpHandler)
        return () => {
            document.removeEventListener('keydown', keyDownHandler)
            document.removeEventListener('keyup', keyUpHandler)
        }
    }, [])
    return keyPressed
}
export default useKeyPress