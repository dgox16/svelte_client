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
        AgregarProveedorEsquema,
        type AgregarProveedorFormType,
    } from "$lib/esquemas/entidades/proveedorEsquemas";
    import {
        operacionProveedor,
        tipoProveedor,
    } from "$lib/modelos/entidades/proveedores";

    const dispatch = createEventDispatcher();
    export let formDProveedor: SuperValidated<Infer<AgregarProveedorFormType>>;
    export let abrirFormularioProveedor;
    export let bancos;
    export let domicilios;
    let paisesNacimiento = [];
    let paisesResidencia = [];

    const form = superForm(formDProveedor, {
        validators: zodClient(AgregarProveedorEsquema),
        dataType: "json",
        onResult({ result }) {
            if (result.type === "success") {
                dispatch("agregar-proveedor", result.data?.nuevoProveedor);
                abrirFormularioProveedor = false;
                toast("El proveedor fue agregado correctamente.");
            }
        },
    });
    const { form: formDatos, enhance, message } = form;

    $: bancoSeleccionado = $formDatos.banco
        ? {
              label: bancos.find((banco) => banco.id_banco === $formDatos.banco)
                  ?.nombre,
              value: $formDatos.banco,
          }
        : undefined;

    $: domicilioSeleccionado = $formDatos.domicilio
        ? (() => {
              const domicilio = domicilios.find(
                  (domicilio) =>
                      domicilio.id_domicilio === $formDatos.domicilio,
              );
              return {
                  label: `${domicilio?.cp} - ${domicilio?.numero_exterior}`,
                  value: $formDatos.domicilio,
              };
          })()
        : undefined;

    $: paisResidenciaSeleccionado = $formDatos.pais_residencia
        ? {
              label: paisesResidencia.find(
                  (pais) => pais.id_pais === $formDatos.pais_residencia,
              )?.nombre,
              value: $formDatos.pais_residencia,
          }
        : undefined;

    $: paisNacimientoSeleccionado = $formDatos.pais_nacimiento
        ? {
              label: paisesNacimiento.find(
                  (pais) => pais.id_pais === $formDatos.pais_nacimiento,
              )?.nombre,
              value: $formDatos.pais_nacimiento,
          }
        : undefined;

    $: tipoSeleccionado = {
        label: tipoProveedor[$formDatos.tipo],
        value: $formDatos.tipo,
    };

    $: operacionSeleccionada = {
        label: operacionProveedor[$formDatos.operacion],
        value: $formDatos.operacion,
    };

    const buscarPaisNacimiento = async (event) => {
        const respuestaPaises = await fetch(
            `http://localhost:8000/api/pais/buscar?nombre=${event.target.value}&limite=7`,
        );
        const resultadoPaises = await respuestaPaises.json();
        paisesNacimiento = resultadoPaises.datos;
    };

    const buscarPaisResidencia = async (event) => {
        const respuestaPaises = await fetch(
            `http://localhost:8000/api/pais/buscar?nombre=${event.target.value}&limite=7`,
        );
        const resultadoPaises = await respuestaPaises.json();
        paisesResidencia = resultadoPaises.datos;
    };
</script>

<form method="POST" use:enhance action="?/agregarProveedor">
    <div class="grid grid-cols-2 gap-x-4 gap-y-1">
        <Form.Field {form} name="nombre">
            <Form.Control let:attrs>
                <Form.Label>Nombre</Form.Label>
                <Input {...attrs} bind:value={$formDatos.nombre} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="domicilio">
            <Form.Control let:attrs>
                <Form.Label>Domicilio</Form.Label>
                <Select.Root
                    selected={domicilioSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.domicilio = Number(v.value));
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona un domicilio" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each domicilios as domicilio}
                            <Select.Item
                                value={domicilio.id_domicilio}
                                label={`${domicilio.cp} - ${domicilio.numero_exterior}`}
                                >{`${domicilio.cp} - ${domicilio.numero_exterior}`}</Select.Item
                            >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="rfc">
            <Form.Control let:attrs>
                <Form.Label>RFC</Form.Label>
                <Input {...attrs} bind:value={$formDatos.rfc} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="curp">
            <Form.Control let:attrs>
                <Form.Label>Curp</Form.Label>
                <Input {...attrs} bind:value={$formDatos.curp} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="telefono">
            <Form.Control let:attrs>
                <Form.Label>Telefono</Form.Label>
                <Input {...attrs} bind:value={$formDatos.telefono} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="tipo">
            <Form.Control let:attrs>
                <Form.Label>Tipo</Form.Label>
                <Select.Root
                    selected={tipoSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.tipo = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value
                            placeholder="Selecciona el tipo de proveedor"
                        />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(tipoProveedor) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="operacion">
            <Form.Control let:attrs>
                <Form.Label>Operacion</Form.Label>
                <Select.Root
                    selected={operacionSeleccionada}
                    onSelectedChange={(v) => {
                        v && ($formDatos.operacion = v.value);
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona la operacion" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each Object.entries(operacionProveedor) as [value, label]}
                            <Select.Item {value} {label} />
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="regimen">
            <Form.Control let:attrs>
                <Form.Label>Regimen</Form.Label>
                <Input {...attrs} bind:value={$formDatos.regimen} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="banco">
            <Form.Control let:attrs>
                <Form.Label>Banco:</Form.Label>
                <Select.Root
                    selected={bancoSeleccionado}
                    onSelectedChange={(v) => {
                        v && ($formDatos.banco = Number(v.value));
                    }}
                >
                    <Select.Trigger {...attrs}>
                        <Select.Value placeholder="Selecciona un banco" />
                    </Select.Trigger>
                    <Select.Content>
                        {#each bancos as banco}
                            <Select.Item
                                value={banco.id_banco}
                                label={banco.nombre}>{banco.nombre}</Select.Item
                            >
                        {/each}
                    </Select.Content>
                </Select.Root>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="cuenta_clabe">
            <Form.Control let:attrs>
                <Form.Label>Clabe</Form.Label>
                <Input {...attrs} bind:value={$formDatos.cuenta_clabe} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="pais_nacimiento">
            <Form.Control let:attrs>
                <div>
                    <Form.Label>Pais nacimiento</Form.Label>
                    <Form.Description
                        >Busque su pais y luego seleccionelo</Form.Description
                    >
                    <Input
                        placeholder="Busque el pais"
                        on:input={buscarPaisNacimiento}
                        class="my-2"
                    />
                    <Select.Root
                        selected={paisNacimientoSeleccionado}
                        onSelectedChange={(v) => {
                            v && ($formDatos.pais_nacimiento = Number(v.value));
                        }}
                        preventScroll={false}
                    >
                        <Select.Trigger {...attrs}>
                            <Select.Value placeholder="Selecciona un pais" />
                        </Select.Trigger>
                        <Select.Content>
                            {#each paisesNacimiento as pais}
                                <Select.Item
                                    value={pais.id_pais}
                                    label={pais.nombre}
                                    >{pais.nombre}</Select.Item
                                >
                            {/each}
                        </Select.Content>
                    </Select.Root>
                </div>
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="pais_residencia">
            <Form.Control let:attrs>
                <div>
                    <Form.Label>Pais residencia</Form.Label>
                    <Form.Description
                        >Busque su pais y luego seleccionelo</Form.Description
                    >
                    <Input
                        placeholder="Busque el pais"
                        on:input={buscarPaisResidencia}
                        class="my-2"
                    />
                    <Select.Root
                        selected={paisResidenciaSeleccionado}
                        onSelectedChange={(v) => {
                            v && ($formDatos.pais_residencia = Number(v.value));
                        }}
                    >
                        <Select.Trigger {...attrs}>
                            <Select.Value placeholder="Selecciona un pais" />
                        </Select.Trigger>
                        <Select.Content>
                            {#each paisesResidencia as pais}
                                <Select.Item
                                    value={pais.id_pais}
                                    label={pais.nombre}
                                    >{pais.nombre}</Select.Item
                                >
                            {/each}
                        </Select.Content>
                    </Select.Root>
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
    <SuperDebug data={formDatos} />

    <Form.Button class="w-full font-semibold mt-2">AGREGAR</Form.Button>
</form>
