<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import Input from "$lib/components/ui/input/input.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import type {
        Infer,
        SuperForm,
        SuperValidated,
    } from "sveltekit-superforms";
    import type { AgregarPolizaFormType } from "$lib/esquemas/polizas/polizasEsquemas";
    import { buttonVariants } from "$lib/components/ui/button";
    import { Plus } from "svelte-radix";
    import FormularioAgregarBanco from "$lib/formularios/entidades/FormularioAgregarBanco.svelte";
    import type { AgregarBancoFormType } from "$lib/esquemas/entidades/bancoEsquemas";

    export let form: SuperForm<Infer<AgregarPolizaFormType>>;
    export let formDBanco: SuperValidated<Infer<AgregarBancoFormType>>;
    export let bancos: Array<{
        id_banco: number;
        nombre: string;
    }>;

    const { form: formDatos } = form;

    $: bancoSeleccionado = $formDatos.poliza_egreso?.banco
        ? {
              label: bancos.find(
                  (banco) => banco.id_banco === $formDatos.poliza_egreso?.banco,
              )?.nombre,
              value: $formDatos.poliza_egreso?.banco,
          }
        : undefined;

    const agregarBanco = (nuevoBanco) => {
        bancos = [...bancos, nuevoBanco];
    };
    let abrirFormularioBanco = false;
</script>

<Card.Root>
    <Card.Header>
        <Card.Title class="text-2xl">Datos de poliza de egreso</Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="grid grid-cols-3 gap-x-10 gap-y-5">
            <Form.Field {form} name="poliza_egreso.beneficiario">
                <Form.Control let:attrs>
                    <Form.Label>Beneficiario</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formDatos.poliza_egreso.beneficiario}
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="poliza_egreso.banco">
                <Form.Control let:attrs>
                    <Form.Label>Banco</Form.Label>

                    <div class="flex flex-row">
                        <Select.Root
                            selected={bancoSeleccionado}
                            onSelectedChange={(v) => {
                                v &&
                                    ($formDatos.poliza_egreso.banco = Number(
                                        v.value,
                                    ));
                            }}
                        >
                            <Select.Trigger {...attrs}>
                                <Select.Value placeholder="Banco" />
                            </Select.Trigger>
                            <Select.Content>
                                {#each bancos as banco}
                                    <Select.Item
                                        value={banco.id_banco}
                                        label={banco.nombre}
                                    >
                                        {banco.nombre}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                        <div class="ml-3">
                            <Dialog.Root bind:open={abrirFormularioBanco}>
                                <Dialog.Trigger
                                    class={buttonVariants({
                                        variant: "default",
                                        size: "icon",
                                    })}><Plus class="size-5" /></Dialog.Trigger
                                >
                                <Dialog.Content class="sm:max-w-[425px]">
                                    <Dialog.Header>
                                        <Dialog.Title
                                            >Agregar nuevo banco</Dialog.Title
                                        >
                                        <Dialog.Description>
                                            Completa los campos siguientes.
                                        </Dialog.Description>
                                    </Dialog.Header>
                                    <FormularioAgregarBanco
                                        {formDBanco}
                                        bind:abrirFormularioBanco
                                        on:agregar-banco={(event) =>
                                            agregarBanco(event.detail)}
                                    />
                                </Dialog.Content>
                            </Dialog.Root>
                        </div>
                    </div>
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="poliza_egreso.cheque">
                <Form.Control let:attrs>
                    <Form.Label>Cheque</Form.Label>
                    <Input
                        {...attrs}
                        bind:value={$formDatos.poliza_egreso.cheque}
                    />
                </Form.Control>
                <Form.FieldErrors />
            </Form.Field>
        </div>
    </Card.Content>
</Card.Root>
