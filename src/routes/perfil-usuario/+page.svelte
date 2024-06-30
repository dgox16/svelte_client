<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import type { PageData } from "./$types.js";
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import { toast, Toaster } from "svelte-sonner";
    import { onMount } from "svelte";
    export let data: PageData;

    onMount(() => {
        const toastMessage = sessionStorage.getItem("toastMessage");
        if (toastMessage) {
            toast(toastMessage);
            sessionStorage.removeItem("toastMessage"); // Elimina el mensaje para evitar que se muestre nuevamente
        }
    });
</script>

<Navbar />

<main class="flex justify-center items-center min-h-screen">
    <Card.Root class="px-5">
        <Card.Header>
            <Card.Title class="text-3xl">{data.datos.usuario}</Card.Title>
            <Card.Description
                >{data.datos.email}</Card.Description
            >
        </Card.Header>
        <Card.Content>{data.estado}</Card.Content>
    </Card.Root>

    <Toaster />
</main>
