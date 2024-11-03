import React, { useState, useRef } from 'react'
import styles from './Apps.module.scss'

function AppPart2() {
    const inputElement: React.Ref<HTMLInputElement> = useRef(null)
    const [pingTimer, setPingTimer] = useState(0)
    const [urlError, setUrlError] = useState(false)

    const handlePingServer = async () => {
        setPingTimer(0)
        setUrlError(false)
        const input = inputElement.current
        if (input) {
            const { value } = input
            try {
                const startTime = new Date().getTime()
                const url = new URL(value)
                await fetch(url)
                const endTime = new Date().getTime()
                setPingTimer(endTime - startTime)
            } catch (e) {
                console.error(e)
                setUrlError(true)
            }
        }
    }
    return (
        <div className={styles.AppWrapper}>
            <h2>Part 2</h2>
            <div className={styles.Row}>
                <input
                    ref={inputElement}
                    placeholder={'https://jsonplaceholder.typicode.com/todos/1'}
                    type='text'
                />
                <button onClick={handlePingServer}>ping</button>
            </div>
            <p>Ping time: {pingTimer}</p>
            {urlError && <p>Fetch error</p>}
        </div>
    )
}

export default AppPart2
