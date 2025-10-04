import { WebSocketServer } from "ws"
import UBotClient from "../util/UBotClient";

const wss = new WebSocketServer({
  port: 12345
})

export default function load (b: UBotClient) {
  
}
