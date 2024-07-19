<script lang="ts">
    import MainTitle from "$lib/components/layout/MainTitle.svelte";
    import { usuarioStore } from "$lib/stores/usuario";
</script>

<MainTitle
    titulo="Datos del usuario"
    subtitulo={$usuarioStore?.usuario ?? "Usuario no disponible"}
/>
