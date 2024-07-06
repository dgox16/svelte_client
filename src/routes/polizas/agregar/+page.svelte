<script lang="ts">
    import type { PageData } from "./$types.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import FormularioAgregarPoliza from "$lib/formularios/polizas/agregar/FormularioAgregarPoliza.svelte";
    import MainTitle from "$lib/components/layout/MainTitle.svelte";

    export let data: PageData;
</script>

<MainTitle
    titulo="Crear una nueva poliza"
    subtitulo="Llena los datos solicitados."
/>

<Card.Root>
    <Card.Content class="py-4">
        <FormularioAgregarPoliza datos={data} />
    </Card.Content>
</Card.Root>
