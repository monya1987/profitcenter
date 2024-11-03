import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

type Props = {
    addMessage: (arr: number[], lost: number) => void
}
type Item = {
    id: number
    value: number
}
let tmp: number[] = []
let lost = 0
const SOCKET_URL = 'wss://trade.termplat.com:8800/?password=1234'
const WSS = ({ addMessage }: Props) => {
    const { lastMessage } = useWebSocket(SOCKET_URL, {
        share: true,
    })
    useEffect(() => {
        if (lastMessage !== null) {
            if (tmp.length === 100 || lost === 100) {
                addMessage(tmp, lost)
                tmp = []
                lost = 0
            } else {
                try {
                    const { id, value } = JSON.parse(lastMessage.data) as Item
                    if (id && value) {
                        tmp.push(value)
                    } else {
                        throw new Error('invalid format')
                    }
                } catch (e) {
                    console.error(e)
                    lost += 1
                }
            }
        }
        // p/s react-use-websocket subscriber unsubscribes when it either unmounts
    }, [lastMessage])

    return <div>WSS Connected</div>
}

export default WSS
