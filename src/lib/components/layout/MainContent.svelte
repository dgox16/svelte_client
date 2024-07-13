<script>
    import { usuarioStore } from "$lib/stores/usuario";
</script>

{#if $usuarioStore == null}
    <div class="mt-[4.5rem] py-6 min-h-[calc(100vh-15.5rem)]">
        <slot></slot>
    </div>
{:else}
    <div class="ml-72 flex-1 mt-[4.5rem] py-6 min-h-[calc(100vh-15.5rem)]">
        <slot></slot>
    </div>
{/if}
