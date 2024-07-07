<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card/index.js";
    import type { Infer, SuperForm } from "sveltekit-superforms";
    import type { AgregarPolizaFormType } from "$lib/esquemas/polizas/polizasEsquemas";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { toast } from "svelte-sonner";

    export let form: SuperForm<Infer<AgregarPolizaFormType>>;
    export let cuentas: Array<{
        id_cuenta: number;
        nombre: string;
    }>;
    export let proveedores: Array<{
        id_proveedor: number;
        nombre: string;
    }>;
    export let numeroDetalles: number;
    export let llenarDetalles;

    const { form: formDatos } = form;

    $: cuentasSeleccionadas = $formDatos.detalles_poliza.map((detalle) => {
        const cuenta = detalle.cuenta;
        return cuenta
            ? {
                  label: cuentas.find((c) => c.id_cuenta === cuenta)?.nombre,
                  value: cuenta,
              }
            : undefined;
    });

    $: proveedoresSeleccionados = $formDatos.detalles_poliza.map((detalle) => {
        const proveedor = detalle.proveedor;
        return proveedor
            ? {
                  label: proveedores.find((p) => p.id_proveedor === proveedor)
                      ?.nombre,
                  value: proveedor,
              }
            : undefined;
    });

    const agregarDetalle = () => {
        if (numeroDetalles < $formDatos.detalles_poliza.length) {
            numeroDetalles += 1;
            $formDatos.numeroDetalles = numeroDetalles;
            llenarDetalles(true, numeroDetalles - 1);
        } else {
            toast.error("Limite maximo de detalles excedido.", {
                description: `Solo puede agregar ${$formDatos.detalles_poliza.length} detalles al mismo tiempo.`,
            });
        }
    };

    const eliminarDetalle = () => {
        if (numeroDetalles > 1) {
            numeroDetalles -= 1;
            $formDatos.numeroDetalles = numeroDetalles;
            llenarDetalles(false, numeroDetalles);
        } else {
            toast.error("No puedes eliminar más detalles.", {
                description:
                    "Pruebe usar el boton par no agregar detalles a esta poliza",
            });
        }
    };
</script>

<Card.Root>
    <Card.Header>
        <div class="flex justify-between">
            <div>
                <Card.Title class="text-2xl">Detalles de polizas</Card.Title>
                <Card.Description
                    >Con los botones puede elegir el numero de detalles</Card.Description
                >
            </div>
            <div class="my-auto">
                <Button size="sm" on:click={agregarDetalle}>Agregar</Button>
                <Button size="sm" on:click={eliminarDetalle}>Eliminar</Button>
            </div>
        </div>
    </Card.Header>
    <Card.Content>
        <Form.Fieldset {form} name="detalles_poliza">
            {#each $formDatos.detalles_poliza.slice(0, numeroDetalles) as _, i}
                <Card.Root>
                    <Card.Header>
                        <Card.Title class="text-xl">Detalle {i + 1}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                        <div class="grid grid-cols-3 gap-x-10 gap-y-5">
                            <Form.ElementField
                                {form}
                                name="detalles_poliza[{i}].cuenta"
                            >
                                <Form.Control let:attrs>
                                    <Form.Label>Cuenta</Form.Label>
                                    <Select.Root
                                        selected={cuentasSeleccionadas[i]}
                                        onSelectedChange={(v) => {
                                            v &&
                                                ($formDatos.detalles_poliza[
                                                    i
                                                ].cuenta = Number(v.value));
                                        }}
                                    >
                                        <Select.Trigger {...attrs}>
                                            <Select.Value
                                                placeholder="Selecciona la cuenta"
                                            />
                                        </Select.Trigger>
                                        <Select.Content>
                                            {#each cuentas as cuenta}
                                                <Select.Item
                                                    value={cuenta.id_cuenta}
                                                    label={cuenta.nombre}
                                                    >{cuenta.nombre}</Select.Item
                                                >
                                            {/each}
                                        </Select.Content>
                                    </Select.Root>
                                </Form.Control>
                                <Form.FieldErrors />
                            </Form.ElementField>
                            <Form.ElementField
                                {form}
                                name="detalles_poliza[{i}].cargo"
                            >
                                <Form.Control let:attrs>
                                    <Form.Label>Cargo</Form.Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        {...attrs}
                                        bind:value={$formDatos.detalles_poliza[
                                            i
                                        ].cargo}
                                    />
                                </Form.Control>
                                <Form.FieldErrors />
                            </Form.ElementField>
                            <Form.ElementField
                                {form}
                                name="detalles_poliza[{i}].abono"
                            >
                                <Form.Control let:attrs>
                                    <Form.Label>Abono</Form.Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        {...attrs}
                                        bind:value={$formDatos.detalles_poliza[
                                            i
                                        ].abono}
                                    />
                                </Form.Control>
                                <Form.FieldErrors />
                            </Form.ElementField>
                            <Form.ElementField
                                {form}
                                name="detalles_poliza[{i}].proveedor"
                            >
                                <Form.Control let:attrs>
                                    <Form.Label>Proveedor</Form.Label>
                                    <Select.Root
                                        selected={proveedoresSeleccionados[i]}
                                        onSelectedChange={(v) => {
                                            v &&
                                                ($formDatos.detalles_poliza[
                                                    i
                                                ].proveedor = Number(v.value));
                                        }}
                                    >
                                        <Select.Trigger {...attrs}>
                                            <Select.Value
                                                placeholder="Selecciona el proveedor"
                                            />
                                        </Select.Trigger>
                                        <Select.Content>
                                            {#each proveedores as proveedor}
                                                <Select.Item
                                                    value={proveedor.id_proveedor}
                                                    label={proveedor.nombre}
                                                    >{proveedor.nombre}</Select.Item
                                                >
                                            {/each}
                                        </Select.Content>
                                    </Select.Root>
                                </Form.Control>
                                <Form.FieldErrors />
                            </Form.ElementField>
                            <Form.ElementField
                                {form}
                                name="detalles_poliza[{i}].concepto"
                            >
                                <Form.Control let:attrs>
                                    <Form.Label>Concepto</Form.Label>
                                    <Input
                                        {...attrs}
                                        bind:value={$formDatos.detalles_poliza[
                                            i
                                        ].concepto}
                                    />
                                </Form.Control>
                                <Form.FieldErrors />
                            </Form.ElementField>
                        </div>
                    </Card.Content>
                </Card.Root>
            {/each}
        </Form.Fieldset>
    </Card.Content>
</Card.Root>
