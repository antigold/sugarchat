import { token } from "../stores/auth";
import { get } from "svelte/store";

export async function loadRooms() {
    const t = get(token);
    const res = await fetch(`http://127.0.0.1:1300/rooms/`, {
        headers: {
        Authorization: `Bearer ${t}`,
        },
    });
    if (!res.ok) {
        console.error('failed to fetch rooms', await res.text());
        return null;
    }
    
    return await res.json();
}

export async function joinRoom(room:string){
    const t = get(token);
    const res = await fetch(`http://127.0.0.1:1300/rooms/${room}/join`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${t}`,
        },
    });
    
    console.log(await res.json());
    return loadRooms();
}