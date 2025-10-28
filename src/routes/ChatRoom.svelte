<script lang="ts">
    import { showPage, currentChat } from "../lib/pageStore"
    import ChatMessage from '../components/ChatMessage.svelte'
    import { onMount, tick } from 'svelte';
    
    let roomSettings: boolean = false;

    let messages: any[] = []
    let roomData: any = {};
    let chatContainer: HTMLDivElement;
    let msgText: string;
    
    const userId: string = "67096aa8-632c-4c9a-b1c9-671388d85975";
    $: roomId = $currentChat;

    async function getRoomData() {
        const res = await fetch(`http://127.0.0.1:1300/rooms/${roomId}`);
        roomData = await res.json();
    }

    async function loadMessages() {
        const res = await fetch(`http://127.0.0.1:1300/rooms/${roomId}/messages`);
        messages = await res.json();

        // scroll to bottom after loading
        await tick();
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function sendMessage() {
        if(!msgText) return;
        try {
            const res = await fetch(`http://127.0.0.1:1300/rooms/${roomId}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: msgText,
                    owner: userId,
                    room: roomId
                })
            });
            
            if (!res.ok) throw new Error('Failed to send message');
            
            msgText = '';
            const data = await res.json();
            console.log('message sent', data);
            loadMessages() // ! REMOVE THIS LATER, MAKE IT BETTER !
            return data;
        } catch (err) {
            console.error(err);
        }
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function handleKey(e: KeyboardEvent) {
        if (e.key === 'Enter') sendMessage();
    }

    onMount(() => {
        getRoomData();
        loadMessages();
    });
</script>

<div class="chat-layout">
    <header>
        <button class="back" on:click={() => showPage('roomList')}><img src="/back.svg" alt="back"></button>
        <button class="room-button" on:click={() => roomSettings = true}>
            <img class="room-image" src={roomData.roomImage} alt="room">
        </button>
        <h2>{roomData.roomName}</h2>
    </header>

    <div bind:this={chatContainer} class="chat-room">
        {#each messages as m}
            <ChatMessage owner={m.owner.displayName} text={m.text} time={m.sentAt} pfp={m.owner.profilePicture} />
        {/each}
    </div>
    <footer>
        <input on:keydown={handleKey} class="text-input" placeholder="Send message..." type="text" bind:value={msgText}/>
        <button on:click={() => sendMessage()}>
            send
        </button>
    </footer>
</div>

<!-- settings popup -->
{#if roomSettings}
  <div class="overlay">
    <div class="popup-header">
        <h3>Room settings</h3>
        <button on:click={() => roomSettings = false}>
            <img src="cross.svg" alt="exit"></button>
        </div>
    <div class="popup">
      <p>settings</p>
    </div>
  </div>
{/if}



<style>
    .room-button {
        all:unset;
    }
    
    .room-image {
        width: 50px;
        height :50px;
        margin-top:auto; margin-bottom:auto;
        border-radius: 100%;
    }

    .room-button:hover .room-image {
        filter:brightness(1.1);
    }
    
    .back {
        all: unset;
        transition: all 0.4s;
        height:60px;
        width:60px;
        aspect-ratio: 1/1;
        background-color: rgb(53, 53, 53);
    }

    .back:hover {
        background-color: rgb(105, 105, 105);
        width: 70px;
        transition:all 0.1s;
    }

    .back img {
        height:60px;
        width:60px;
    }

    /* profile etc */
    header{
        display:flex;
        height:60px;
        background-color: rgb(30, 30, 30);
        gap: 10px;
    }

    footer{
        background-color: rgb(30, 30, 30);
        display:flex;
        height:50px;
        padding:5px;
        gap: 5px;
    }

    footer button {
        all:unset;
        background-color: black;
        border-radius: 100%;
        height:100%;
        aspect-ratio: 1 / 1;
        text-align: center;
    }

    /* text input */
    .text-input{
        all:unset;
        width:100%;
        background-color: black;
        padding:20px;
    }

    .chat-room {
        flex:1;
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0px 10px;
        padding-bottom: 10px;
    }

    .chat-layout {
        display: flex;
        flex-direction: column;
        height: 100vh; /* full screen */
    }

    .overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        display:flex;
        flex-direction: column;
    }
 

    .popup-header {
        min-width: 250px;
        max-width: 90vh;
        padding: 0px 20px;
        background-color: #111;
        border-radius: 12px 12px 0 0;
        height:2.5em;
        display:flex;
        justify-content: space-between;
    }

    .popup-header h3 {
        padding: 0;
        margin: auto 0;
    }

    .popup-header button {
        all: unset;
        padding: 0;
        margin: 0;
    }

    .popup-header button img {
        aspect-ratio: 1/1;
        width: 2.5em;
        filter:invert(1);
    }

    .popup {
        background: #222;
        color: white;
        padding: 20px;
        border-radius: 0 0 12px 12px;
        min-width: 250px;
        max-width: 90vh;
    }

</style>
