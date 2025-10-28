<script lang="ts">
    import { showPage, currentChat } from "../lib/pageStore"
    import { login } from "$lib/api";
    let username = "";
    let password = "";
    let error = "";

    async function submit() {
        const success = await login(username, password);
        if (!success) error = "invalid credentials";
        else showPage("roomList");
    }
</script>

<input placeholder="username" bind:value={username} />
<input type="password" placeholder="password" bind:value={password} />
<button on:click={submit}>login</button>
<p>{error}</p>
