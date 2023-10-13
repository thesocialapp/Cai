import io  from "socket.io-client";

export const socket = io("ws://localhost:4400", {
    transports: ["websocket"],
    autoConnect: false,
    path: "/io"
});