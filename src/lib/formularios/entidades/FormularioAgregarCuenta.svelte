<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import { ExclamationTriangle } from "svelte-radix";
    import { Input } from "$lib/components/ui/input";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import SuperDebug, {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { createEventDispatcher } from "svelte";
    import { toast } from "svelte-sonner";
    import {
        AgregarCuentaEsquema,
        type AgregarCuentaFormType,
    } from "$lib/esquemas/entidades/cuentaEsquemas";
    import {
        clasificacionCuenta,
        finalidadCuenta,
        grupoCuenta,
        naturalezaCuenta,
    } from "$lib/modelos/entidades/cuentas";
    import { Checkbox } from "$lib/components/ui/checkbox";

    const dispatch = createEventDispatcher();
    export let formDCuenta: SuperValidated<Infer<AgregarCuentaFormType>>;
    export let abrirFormularioCuenta;

    const form = superForm(formDCuenta, {
        validators: zodClient(AgregarCuentaEsquema),
        dataType: "json",
        onResult({ result }) {
            if (result.type === "success") {
                dispatch("agregar-cuenta", result.data?.nuevaCuenta);
                abrirFormularioCuenta = false;
                toast("La cuenta fue agregada correctamente.");
            }
        },
    });
    const { form: formDatos, enhance, message } = form;

    $: clasificacionSeleccionada = {
        label: clasificacionCuenta[$formDatos.clasificacion],
        value: $formDatos.clasificacion,
    };
    $: grupoSeleccionado = {
        label: grupoCuenta[$formDatos.grupo],
        value: $formDatos.grupo,
    };
    $: finalidadSeleccionada = {
        label: finalidadCuenta[$formDatos.finalidad],
        value: $formDatos.finalidad,
    };
    $: naturalezaSeleccionada = {
        label: naturalezaCuenta[$formDatos.naturaleza],
        value: $formDatos.naturaleza,
    };
</script>

<form method="POST" use:enhance action="?/agregarCuenta">
    <div class="grid grid-cols-2 gap-x-4 gap-y-1">
        <Form.Field {form} name="cuenta">
            <Form.Control let:attrs>
                <Form.Label>Cuenta</Form.Label>
                <Input {...attrs} bind:value={$formDatos.cuenta} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="cuenta_siti">
            <Form.Control let:attrs>
                <Form.Label>Cuenta SITI</Form.Label>
                <Input {...attrs} bind:value={$formDatos.cuenta_siti} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="nombre">
            <Form.Control let:attrs>
                <Form.Label>Nombre</Form.Label>
                <Input {...attrs} bind:value={$formDatos.nombre} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="clasificacion">
            <Form.Control let:attrs>
                <Form.Label>Clasificacion</Form.Label>
                <Select.Root
                    selected={clasificacionSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.clasificacion = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona la clasificacion de la cuenta"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(clasificacionCuenta) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="grupo">
            <Form.Control let:attrs>
                <Form.Label>Grupo</Form.Label>
                <Select.Root
                    selected={grupoSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.grupo = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona el grupo de la cuenta"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(grupoCuenta) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="finalidad">
            <Form.Control let:attrs>
                <Form.Label>Finalidad</Form.Label>
                <Select.Root
                    selected={finalidadSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.finalidad = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona la finalidad de la cuenta"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(finalidadCuenta) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="naturaleza">
            <Form.Control let:attrs>
                <Form.Label>Naturaleza</Form.Label>
                <Select.Root
                    selected={naturalezaSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.naturaleza = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona la naturaleza de la cuenta"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(naturalezaCuenta) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="padre">
            <Form.Control let:attrs>
                <Form.Label>Padre</Form.Label>
                <Input {...attrs} bind:value={$formDatos.padre} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="nivel">
            <Form.Control let:attrs>
                <Form.Label>Nivel</Form.Label>
                <Input {...attrs} type="number" bind:value={$formDatos.nivel} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="nombre_balance">
            <Form.Control let:attrs>
                <Form.Label>Nombre balance</Form.Label>
                <Input {...attrs} bind:value={$formDatos.nombre_balance} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="nombre_siti">
            <Form.Control let:attrs>
                <Form.Label>Nombre SITI</Form.Label>
                <Input {...attrs} bind:value={$formDatos.nombre_siti} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="cuenta_padre_siti">
            <Form.Control let:attrs>
                <Form.Label>Cuenta padre SITI</Form.Label>
                <Input {...attrs} bind:value={$formDatos.cuenta_padre_siti} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="cuenta_agrupar">
            <Form.Control let:attrs>
                <Form.Label>Cuenta a agrupar</Form.Label>
                <Input {...attrs} bind:value={$formDatos.cuenta_agrupar} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="orden_siti">
            <Form.Control let:attrs>
                <Form.Label>Orden SITI</Form.Label>
                <Input
                    {...attrs}
                    type="number"
                    bind:value={$formDatos.orden_siti}
                />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="en_catalogo_minimo">
            <Form.Control let:attrs>
                <div class="flex flex-row my-auto mt-5">
                    <Checkbox
                        {...attrs}
                        bind:checked={$formDatos.en_catalogo_minimo}
                    />
                    <div class="space-y-1 leading-none ml-2">
                        <Form.Label>En catalogo minimo</Form.Label>
                    </div>
                    <input
                        name="en_catalogo_minimo"
                        value={$formDatos.en_catalogo_minimo}
                        hidden
                    />
                </div>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="prorrateo">
            <Form.Control let:attrs>
                <div class="flex flex-row my-auto mt-5">
                    <Checkbox {...attrs} bind:checked={$formDatos.prorrateo} />
                    <div class="space-y-1 leading-none ml-2">
                        <Form.Label>Prorrateo</Form.Label>
                    </div>
                    <input
                        name="prorrateo"
                        value={$formDatos.prorrateo}
                        hidden
                    />
                </div>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
    </div>

    {#if $message}
        <Alert.Root variant="destructive" class="mb-1">
            <ExclamationTriangle class="h-4 w-4" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{$message}</Alert.Description>
        </Alert.Root>
    {/if}

    <Form.Button class="w-full font-semibold mt-2">AGREGAR</Form.Button>
</form>
