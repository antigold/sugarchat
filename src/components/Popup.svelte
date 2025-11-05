<script>
  export let open = false
  export let title = ''
  export let onClose = () => {}
</script>

{#if open}
<div class="overlay">
  <div class="popup">
    <div class="popup-header">
      <h3>{title}</h3>
      <button on:click={onClose}>
        <img src="cross.svg" alt="exit">
      </button>
    </div>

    <div class="popup-body">
      <slot />
    </div>
  </div>
</div>
{/if}

<style>
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
    
    .popup-body {
        background: #222;
        color: white;
        padding: 20px;
        border-radius: 0 0 12px 12px;
        min-width: 250px;
        max-width: 90vh;
    }
    
</style>