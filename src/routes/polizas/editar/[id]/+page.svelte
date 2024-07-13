<script lang="ts">
    import type { PageData } from "./$types.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import { Toaster } from "$lib/components/ui/sonner";
    import FormularioEditarPoliza from "$lib/formularios/polizas/editar/FormularioEditarPoliza.svelte";

    export let data: PageData;
</script>

<MainTitle titulo="Editar la poliza" subtitulo="Ajuste los datos necesarios." />

<Card.Root>
    <Card.Content class="py-4">
        <FormularioEditarPoliza datos={data} />
    </Card.Content>
</Card.Root>

<Toaster />
