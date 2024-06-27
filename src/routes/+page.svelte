<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    let valor = 0;

    const incrementarValor = () => {
        valor++;
    };
</script>

<Button on:click={incrementarValor}
    >Clicked {valor} {valor === 1 ? "time" : "times"}</Button
>
