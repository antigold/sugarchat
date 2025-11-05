<script lang="ts">
    import RoomPill from '../components/RoomPill.svelte'
    import { onMount } from 'svelte';
    import { loadRooms, joinRoom } from '../lib/roomApi'
    
    let roomsContainer: HTMLDivElement;
    let rooms: any[] = []
    import Popup from '../components/Popup.svelte'
    let joinPopup: boolean = false
    let roomToJoin: string = "";

    async function handleJoin() {
        rooms = await joinRoom(roomToJoin);
    }
    
    onMount(async () => {
        rooms = await loadRooms();
    });

</script>

<div class="roomswrapper">
    <header>
        <h2>Rooms</h2>
        <button class="pfpbutton" on:click={() => joinPopup = true}>
            <img src="https://cdn.discordapp.com/attachments/1393351226745295005/1429590690223882370/XbCEPfx.gif?ex=68f6b195&is=68f56015&hm=2a1318bbaf2ea6a02177e8c2d8aa4de32009120a6938f75adb38a24d72fa3de7&" alt="You"/>
        </button>
    </header>

    <div bind:this={roomsContainer} class="roomcontainer">
        {#each rooms as r}
            <RoomPill name={r.roomName} id={r.id} img={r.roomImage}/>
        {/each}
    </div>
</div>

<!-- join popup -->
{#if joinPopup}
<Popup
title="join room"
open={joinPopup}
onClose={() => joinPopup = false}
>
<p>insert room id</p>
<input type="text" bind:value={roomToJoin}>

<button on:click={handleJoin}>join</button>
</Popup>
{/if}

<style>
    .roomswrapper{
        display:flex;
        flex-direction: column;
        height: 100vh;
    }

    .roomcontainer{
        padding: 0.2cm;
        display:flex;
        flex-direction: column;
        overflow: scroll;
        flex:1;
    }

    header {
        height:60px;
        background-color: rgb(30, 30, 30);
        display:flex;
        flex-direction: row;
        padding:0 20px;
    }

    /* header h2{
        padding-left: 20px;
    } */

    header button{
        border-radius: 100%;
        margin:5px;
        margin-left:auto;
        margin-right:0;
        /* background-color: red; */
        aspect-ratio: 1/1;
        border: 0;
    }


</style>

