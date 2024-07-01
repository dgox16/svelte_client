<script lang="ts">
    import { Exit, ListBullet, PlusCircled } from "svelte-radix";
    import Button from "../ui/button/button.svelte";
</script>

<aside
    class="col-span-3 xl:col-span-2 border border-border rounded-xl h-[calc(100vh-5.5rem)] flex flex-col justify-between"
>
    <div class="space-y-4 py-4">
        <div class="px-3 py-2">
            <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
                Poliza
            </h2>
            <div class="space-y-1">
                <Button
                    variant="ghost"
                    class="w-full justify-start"
                    href="/polizas/agregar"
                >
                    <PlusCircled class="size-4 mr-2" />
                    Agregar nueva poliza
                </Button>
                <Button variant="ghost" class="w-full justify-start">
                    <ListBullet class="size-4 mr-2" />
                    Ver polizas
                </Button>
            </div>
        </div>
    </div>
    <div class="py-4 px-3">
        <Button
            variant="default"
            class="w-full justify-start"
            size="sm"
            href="/auth/cerrar-sesion"
        >
            <Exit class="size-4 mr-2" />
            Cerrar Sesión
        </Button>
    </div>
</aside>
