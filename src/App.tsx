import { useState, useEffect } from 'react'
import WSS from './WSS.tsx'
import type { HashObj } from './types.ts'
import {
    getAverageValue,
    getMedianValue,
    getModeValue,
    getDeviationValue,
} from './helpers.ts'
import styles from './Apps.module.scss'
let hashMapObj: HashObj = {}

function App() {
    const [calculationTime, setCalculationTime] = useState(0)
    const [lostValues, setLostValues] = useState(0)
    const [total, setTotal] = useState(0)
    const [averageValue, setAverageValue] = useState(0)
    const [deviationValue, setDeviationValue] = useState(0)
    const [medianValue, setMedianValue] = useState(0)
    const [modeValue, setModeValue] = useState(0)
    const [show, setShow] = useState(false)
    const [messageHistory, setMessageHistory] = useState<number[]>([])

    useEffect(() => {
        messageHistory.forEach((value) => {
            hashMapObj[value] = hashMapObj[value] ? hashMapObj[value] + 1 : 1
        })
        setTotal((prev) => prev + messageHistory.length)
    }, [messageHistory])

    const addMessage = (messages: number[], lostAmount: number) => {
        setLostValues(lostValues + lostAmount)
        setMessageHistory(messages)
    }
    const handleStart = () => {
        // reset
        hashMapObj = {}
        setTotal(0)
        setCalculationTime(0)
        setAverageValue(0)
        setMedianValue(0)
        setModeValue(0)
        setDeviationValue(0)
        setLostValues(0)
        setShow(true)
    }
    const handleStop = () => {
        setShow(false)
        const startTime = new Date().getTime()
        const average = getAverageValue(hashMapObj)
        const median = getMedianValue(hashMapObj)
        const mode = getModeValue(hashMapObj)
        const deviation = getDeviationValue(hashMapObj, average)
        const endTime = new Date().getTime()
        setCalculationTime(endTime - startTime)
        setAverageValue(average || 0)
        setMedianValue(median || 0)
        setModeValue(mode || 0)
        setDeviationValue(deviation || 0)
    }
    return (
        <div className={styles.AppWrapper}>
            <h2>Part 1</h2>
            <p>Total records: {total}</p>
            <p>lost: {lostValues}</p>
            <p>average - {averageValue}</p>
            <p>median - {medianValue}</p>
            <p>mode - {modeValue}</p>
            <p>deviation - {deviationValue}</p>
            <p>Time to calc = {calculationTime} milliseconds</p>
            <div className={styles.Row}>
                <button onClick={handleStart}>start</button>
                <button onClick={handleStop}>stop</button>
            </div>
            {show && <WSS addMessage={addMessage} />}
        </div>
    )
}

export default App
