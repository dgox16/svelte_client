<script lang="ts">
    import { usuarioStore } from "$lib/stores/usuario";
</script>

<h1 class="text-3xl font-semibold">Datos del usuario</h1>
<h2>{$usuarioStore?.usuario}</h2>
