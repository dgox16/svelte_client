<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";

    import { usuarioStore } from "$lib/stores/usuario";
</script>

<main class="flex justify-center items-center min-h-screen">
    <Card.Root class="px-5">
        <Card.Header>
            <Card.Title class="text-3xl">{$usuarioStore?.usuario}</Card.Title>
            <Card.Description>{$usuarioStore?.email}</Card.Description>
        </Card.Header>
        <Card.Content>{$usuarioStore?.createdAt}</Card.Content>
    </Card.Root>
</main>
