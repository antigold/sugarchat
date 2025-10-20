<script lang="ts">
  export let owner: string
  export let text: string
  export let time: string
  export let pfp: string

  const date = new Date(time);
  const timeformatted = date.toLocaleTimeString('en-US', {hour12: false});
</script>

<div class="chat-message">
  <strong class="name">{owner}</strong>
  <span class="time">{timeformatted}</span>
  <div class="line">
    <img class="pfp" src="{pfp}" alt="{owner}'s profile picture"/>
    <div class="bubble">
      <div class="text">{text}</div>
    </div>
  </div>
</div>

<style>
.chat-message {
  /* margin: 0px 0px; */
  /* padding:0; */
  color: #fff;
}

.name{
  padding: 0px;
  margin: 0px;
}

.line{
  display:flex;
}

.pfp {
  background-color: #333;
  height: 1cm;
  width: 1cm;
  border-radius: 100%;
}

.bubble {
  background: rgb(54, 54, 54);
  padding: 5px;
  margin-left: 15px;
  border-radius: 12px 12px 12px 0px;
  width:auto;
  height:fit-content;
  max-width: 100vw;
  overflow-wrap: anywhere;
}

.text {
  color: #fff;
  margin: 0;
  padding-top: 3px;
}

.time {
  font-size: 0.7em;
  color: #cdcdcd;
  padding-left: 3px;
  display:inline;
}
</style>
