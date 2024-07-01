<script lang="ts">
    import { ModeWatcher } from "mode-watcher";
    import "../app.css";
    import type { LayoutData } from "./$types";
    import { beforeUpdate } from "svelte";
    import { usuarioStore } from "$lib/stores/usuario";
    import Loading from "$lib/components/layout/Loading.svelte";
    import UsuarioNavbar from "$lib/components/layout/UsuarioNavbar.svelte";
    import InvitadoNavbar from "$lib/components/layout/InvitadoNavbar.svelte";
    import Sidebar from "$lib/components/layout/Sidebar.svelte";

    export let data: LayoutData;
    beforeUpdate(() => {
        usuarioStore.set(data.usuario);
    });
</script>

<ModeWatcher />
{#if !data.usuario}
    <InvitadoNavbar />
    <slot />
{:else if !$usuarioStore}
    <Loading />
{:else}
    <UsuarioNavbar />
    <main class="mt-3 grid grid-cols-8">
        <Sidebar />
        <slot />
    </main>
{/if}

<style></style>
