import io  from "socket.io-client";

export const socket = io("wss://api.socialxai-api.net/", {
    transports: ["websocket"],
    autoConnect: false,
    path: "/io"
});