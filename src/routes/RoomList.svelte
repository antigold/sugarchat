<script lang="ts">
  import RoomPill from '../components/RoomPill.svelte'
  import { onMount } from 'svelte';
  
  let roomsContainer: HTMLDivElement;
  let rooms: any[] = []

  async function loadRooms() {
      const res = await fetch(`http://127.0.0.1:1300/rooms`);
      rooms = await res.json();
  }

  onMount(() => {
        loadRooms();
    });

</script>

<div class="roomswrapper">
    <header>
        <h2>Rooms</h2>
        <img src="https://cdn.discordapp.com/attachments/1393351226745295005/1429590690223882370/XbCEPfx.gif?ex=68f6b195&is=68f56015&hm=2a1318bbaf2ea6a02177e8c2d8aa4de32009120a6938f75adb38a24d72fa3de7&" alt="You"/>
    </header>
    <div bind:this={roomsContainer} class="roomcontainer">
        {#each rooms as r}
            <RoomPill name={r.roomName} id={r.id} img={r.roomImage}/>
        {/each}
    </div>
</div>

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

    header img{
        border-radius: 100%;
        margin-left:auto;
        margin-right:0;
        padding:5px;
        /* background-color: red; */
        aspect-ratio: 1/1;
    }

</style>

