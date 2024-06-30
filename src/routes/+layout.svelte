<script lang="ts">
    import { ModeWatcher } from "mode-watcher";
    import "../app.css";
    import type { LayoutData } from "./$types";
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import { beforeUpdate } from "svelte";
    import { usuarioStore } from "$lib/stores/usuario";
    import Loading from "$lib/components/layout/Loading.svelte";

    export let data: LayoutData;
    beforeUpdate(() => {
        usuarioStore.set(data.usuario);
    });
</script>

<ModeWatcher />
{#if !data.usuario}
    <Navbar />
    <slot />
{:else if !$usuarioStore}
    <Loading />
{:else}
    <Navbar />
    <slot />
{/if}

<style></style>
