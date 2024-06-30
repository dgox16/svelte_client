<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { toast, Toaster } from "svelte-sonner";
    import { onMount } from "svelte";

    import { usuarioStore } from "$lib/stores/usuario";

    onMount(() => {
        const toastMessage = sessionStorage.getItem("toastMessage");
        if (toastMessage) {
            toast(toastMessage);
            sessionStorage.removeItem("toastMessage"); // Elimina el mensaje para evitar que se muestre nuevamente
        }
    });
</script>

<main class="flex justify-center items-center min-h-screen">
    <Card.Root class="px-5">
        <Card.Header>
            <Card.Title class="text-3xl">{$usuarioStore?.usuario}</Card.Title>
            <Card.Description>{$usuarioStore?.email}</Card.Description>
        </Card.Header>
        <Card.Content>{$usuarioStore?.createdAt}</Card.Content>
    </Card.Root>

    <Toaster />
</main>
