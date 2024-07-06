<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import Input from "$lib/components/ui/input/input.svelte";
    import * as Card from "$lib/components/ui/card/index.js";

    export let form;
    export let formDatos;
    export let bancos;
    export let bancoSeleccionado;
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
