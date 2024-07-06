<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import Input from "$lib/components/ui/input/input.svelte";
    import * as Card from "$lib/components/ui/card/index.js";

    export let form;
    export let formDatos;
</script>

<Card.Root>
    <Card.Header>
        <Card.Title class="text-2xl">Detalles de polizas</Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="grid grid-cols-3 gap-x-10 gap-y-5">
            <Form.Fieldset {form} name="detalles_polizas">
                {#each $formDatos.detalles_polizas as _, i}
                    <Form.ElementField
                        {form}
                        name="detalles_polizas[{i}].concepto"
                    >
                        <Form.Control let:attrs>
                            <Form.Label>Concepto</Form.Label>
                            <Input
                                {...attrs}
                                bind:value={$formDatos.detalles_polizas[i]
                                    .cuenta}
                            />
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.ElementField>
                {/each}
            </Form.Fieldset>
        </div>
    </Card.Content>
</Card.Root>

<Card.Root>
    <Card.Header>
        <Card.Title class="text-2xl">Detalles de polizas</Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="grid grid-cols-3 gap-x-10 gap-y-5">
            <Form.Fieldset {form} name="detalles_polizas">
                {#each $formDatos.detalles_polizas as _, i}
                    <Form.ElementField
                        {form}
                        name="detalles_polizas[{i}].concepto"
                    >
                        <Form.Control let:attrs>
                            <Form.Label>Concepto</Form.Label>
                            <Input
                                {...attrs}
                                bind:value={$formDatos.detalles_polizas[i]
                                    .cuenta}
                            />
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.ElementField>
                {/each}
            </Form.Fieldset>
        </div>
    </Card.Content>
</Card.Root>
