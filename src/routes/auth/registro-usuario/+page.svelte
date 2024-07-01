<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import type { PageData } from "./$types.js";
    import FormularioRegistro from "$lib/formularios/auth/FormularioRegistro.svelte";
    export let data: PageData;
</script>

<main class="flex justify-center items-center min-h-screen">
    <Card.Root class="px-5">
        <Card.Header>
            <Card.Title class="text-3xl">Crea una cuenta</Card.Title>
            <Card.Description
                >Ingresa los datos solicitados debajo.</Card.Description
            >
        </Card.Header>
        <Card.Content>
            <FormularioRegistro datos={data.form} />
        </Card.Content>
    </Card.Root>
</main>
