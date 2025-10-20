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

<div>
  <h2>rooms</h2>
  <div bind:this={roomsContainer} class="chat-room">
      {#each rooms as r}
          <RoomPill name={r.roomName} id={r.id} img={r.roomImage}/>
      {/each}
  </div>
</div>

<style>

</style>

