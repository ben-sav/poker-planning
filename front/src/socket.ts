import { io } from 'socket.io-client'

const URL = import.meta.env.DEV ? 'http://localhost:3000' : '/'

const socket =  io(URL)

socket.connect()
console.log('socket connected on ' + URL)

export {socket}
