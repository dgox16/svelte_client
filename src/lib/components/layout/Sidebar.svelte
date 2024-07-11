<script lang="ts">
    import { ListBullet, PlusCircled } from "svelte-radix";
    import Button from "../ui/button/button.svelte";
    import { ScrollArea } from "../ui/scroll-area";
</script>

<aside
    class="fixed top-0 bottom-0 h-[calc(100vh-3.5rem)] mt-[4.5rem] flex flex-col justify-between w-60"
>
    <ScrollArea class="">
        <div class="space-y-4 py-4">
            <div class=" py-2">
                <h2 class="mb-2 text-lg font-semibold tracking-tight">
                    Polizas
                </h2>
                <div class="space-y-1">
                    <Button
                        variant="ghost"
                        class="w-full justify-start"
                        href="/polizas/agregar"
                    >
                        <PlusCircled class="size-4 mr-2" />
                        Nueva poliza
                    </Button>
                    <Button
                        variant="ghost"
                        class="w-full justify-start"
                        href="/polizas/ver-todas"
                    >
                        <ListBullet class="size-4 mr-2" />
                        Ver polizas
                    </Button>
                </div>
            </div>
            <div class=" py-2">
                <h2 class="mb-2 text-lg font-semibold tracking-tight">
                    Contrato de Captación
                </h2>
                <div class="space-y-1">
                    <Button
                        variant="ghost"
                        class="w-full justify-start"
                        href="/contrato-captacion/agregar"
                    >
                        <PlusCircled class="size-4 mr-2" />
                        Nuevo contrato de captación
                    </Button>
                </div>
            </div>
        </div>
    </ScrollArea>
</aside>
