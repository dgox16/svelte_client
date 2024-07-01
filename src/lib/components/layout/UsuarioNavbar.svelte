<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import { toggleMode } from "mode-watcher";
    import { Exit, Moon, Person, Sun } from "svelte-radix";
</script>

<header
    class="fixed top-0 z-10 flex items-center justify-center w-full mx-auto bg-background backdrop-blur bg-opacity-80"
>
    <nav
        class="flex h-16 flex-row justify-between items-center mx-7 my-auto w-[1500px]"
    >
        <div><a href="/" class="font-bold text-xl">SICAP</a></div>
        <div class="flex flex-row">
            <Button on:click={toggleMode} variant="outline" size="icon">
                <Sun
                    class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-150"
                />
                <Moon
                    class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <Button
                class="font-bold ml-3"
                variant="outline"
                size="icon"
                href="/auth/perfil-usuario"
                ><Person class="size-5 text-blue-500" /></Button
            >

            <Button
                class="font-bold ml-3"
                variant="outline"
                size="icon"
                href="/auth/cerrar-sesion"
                ><Exit class="size-5 text-blue-500" /></Button
            >
        </div>
    </nav>
</header>
