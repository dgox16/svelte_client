<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import type { PageData } from "./$types.js";
    import Navbar from "$lib/components/layout/Navbar.svelte";
    import FormularioInicioSesion from "$lib/components/formularios/FormularioInicioSesion.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import Button from "$lib/components/ui/button/button.svelte";

    export let data: PageData;
</script>

<Navbar />

<main class="flex justify-center items-center min-h-screen">
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
                href="/registro-usuario"
                class="w-full uppercase italic text-xs"
                variant="link"
                size="sm"
            >
                O crea una nueva cuenta
            </Button>
        </Card.Footer>
    </Card.Root>
    <Toaster />
</main>
