<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import Input from "$lib/components/ui/input/input.svelte";

    export let form;
    export let formDatos;
    export let tiposPoliza;
    export let tipoSeleccionado;
    export let sucursales;
    export let sucursalSeleccionada;
    export let aplicacionesPoliza;
    export let aplicacionSeleccionada;
    export let fuentesPoliza;
    export let fuenteSeleccionada;
    export let mostrarPolizaEgreso;
</script>

<div class="grid grid-cols-3 gap-x-10 gap-y-5">
    <Form.Field {form} name="tipo">
        <Form.Control let:attrs>
            <Form.Label>Tipo de poliza</Form.Label>
            <Select.Root
                selected={tipoSeleccionado}
                onSelectedChange={(v) => {
                    v && ($formDatos.tipo = v.value);
                    if (v?.value === "Egreso") {
                        mostrarPolizaEgreso = true;
                        $formDatos.poliza_egreso.beneficiario = "";
                        $formDatos.poliza_egreso.banco = 1;
                        $formDatos.poliza_egreso.cheque = "";
                    } else {
                        mostrarPolizaEgreso = false;
                        $formDatos.poliza_egreso.beneficiario = "test";
                        $formDatos.poliza_egreso.banco = 1;
                        $formDatos.poliza_egreso.cheque = "test";
                    }
                }}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Selecciona el tipo de poliza" />
                </Select.Trigger>
                <Select.Content>
                    {#each Object.entries(tiposPoliza) as [value, label]}
                        <Select.Item {value} {label} />
                    {/each}
                </Select.Content>
            </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="numero">
        <Form.Control let:attrs>
            <Form.Label>Numero de poliza</Form.Label>
            <Input
                type="number"
                step="1"
                min="0"
                {...attrs}
                bind:value={$formDatos.numero}
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="sucursal">
        <Form.Control let:attrs>
            <Form.Label>Sucursal</Form.Label>
            <Select.Root
                selected={sucursalSeleccionada}
                onSelectedChange={(v) => {
                    v && ($formDatos.sucursal = Number(v.value));
                }}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value placeholder="Selecciona la sucursal" />
                </Select.Trigger>
                <Select.Content>
                    {#each sucursales as sucursal}
                        <Select.Item
                            value={sucursal.id_sucursal}
                            label={sucursal.nombre}
                            >{sucursal.nombre}</Select.Item
                        >
                    {/each}
                </Select.Content>
            </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="concepto">
        <Form.Control let:attrs>
            <Form.Label>Concepto</Form.Label>
            <Input {...attrs} bind:value={$formDatos.concepto} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="aplicacion">
        <Form.Control let:attrs>
            <Form.Label>Aplicación</Form.Label>
            <Select.Root
                selected={aplicacionSeleccionada}
                onSelectedChange={(v) => {
                    v && ($formDatos.aplicacion = v.value);
                }}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value
                        placeholder="Selecciona la aplicacion de la poliza"
                    />
                </Select.Trigger>
                <Select.Content>
                    {#each Object.entries(aplicacionesPoliza) as [value, label]}
                        <Select.Item {value} {label} />
                    {/each}
                </Select.Content>
            </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="fuente">
        <Form.Control let:attrs>
            <Form.Label>Fuente</Form.Label>
            <Select.Root
                selected={fuenteSeleccionada}
                onSelectedChange={(v) => {
                    v && ($formDatos.fuente = v.value);
                }}
            >
                <Select.Trigger {...attrs}>
                    <Select.Value
                        placeholder="Selecciona la fuente de la poliza"
                    />
                </Select.Trigger>
                <Select.Content>
                    {#each Object.entries(fuentesPoliza) as [value, label]}
                        <Select.Item {value} {label} />
                    {/each}
                </Select.Content>
            </Select.Root>
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
</div>
