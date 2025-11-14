import { token } from "../stores/auth";
import { get } from "svelte/store";
import { domain } from "./domain";
var API = get(domain);

async function getRoomData(roomId : string) { //MOVE ME TO ROOMAPI
    const t = token;

    const res = await fetch(`${API}/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${t}` }
    });
    return await res.json();
}

async function loadMessages(roomId : string) {
    const t = token;

    const res = await fetch(`${API}/rooms/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${t}` }
    });
    return await res.json();
    
    // scroll to bottom after loading
    // await tick();
    // chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(msgText:string,userId:string,roomId:string) {
    const t = token;
    // if(!msgText) return;
    try {
        const res = await fetch(`${API}/rooms/${roomId}/messages`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${t}`,'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: msgText,
                owner: userId,
                room: roomId
            })
        });
        
        if (!res.ok) throw new Error('Failed to send message');
        
        const data = await res.json();
        // loadMessages() // ! REMOVE THIS LATER, MAKE IT BETTER !
        return data;
    } catch (err) {
        console.error(err);
    }
    // chatContainer.scrollTop = chatContainer.scrollHeight;
}