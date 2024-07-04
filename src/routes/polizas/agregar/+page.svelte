<script lang="ts">
    import type { PageData } from "./$types.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import FormularioAgregarPoliza from "$lib/formularios/polizas/FormularioAgregarPoliza.svelte";

    export let data: PageData;
</script>

<h1 class="text-3xl font-semibold">Crear una nueva poliza</h1>
<p class="text-lg text-muted-foreground mb-5">Llena los datos solicitados.</p>

<Card.Root>
    <Card.Content class="py-4">
        <FormularioAgregarPoliza datos={data} />
    </Card.Content>
</Card.Root>
