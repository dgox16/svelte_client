<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import type { PageData } from "./$types.js";
    import FormularioInicioSesion from "$lib/formularios/auth/FormularioInicioSesion.svelte";
    import Button from "$lib/components/ui/button/button.svelte";

    export let data: PageData;
</script>

<main class="flex justify-center items-center min-h-[calc(100vh-15.5rem)]">
    <Card.Root>
        <Card.Header>
            <Card.Title class="text-3xl">Inicia sesión</Card.Title>
            <Card.Description
                >Coloque sus datos para acceder a la pagina.</Card.Description
            >
        </Card.Header>
        <Card.Content>
            <FormularioInicioSesion datos={data.form} />
        </Card.Content>
        <Card.Footer class="flex justify-center">
            <Button
                href="/auth/registro-usuario"
                class="w-full uppercase italic text-xs"
                variant="link"
                size="sm"
            >
                O crea una nueva cuenta
            </Button>
        </Card.Footer>
    </Card.Root>
</main>
