<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<div class="flex flex-row justify-between items-center">
    <MainTitle
        titulo="Balanza de comprobación"
        subtitulo="Analisis de cada una de las cuentas"
    />
    <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
            <Button builders={[builder]} variant="default"
                >Descargar reporte</Button
            >
        </DropdownMenu.Trigger>
        <DropdownMenu.Content class="w-40">
            <DropdownMenu.Group>
                <DropdownMenu.Item>En PDF</DropdownMenu.Item>
            </DropdownMenu.Group>
        </DropdownMenu.Content>
    </DropdownMenu.Root>
</div>
