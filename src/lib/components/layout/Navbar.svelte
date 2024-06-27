<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { toggleMode } from "mode-watcher";
    import { Moon, Sun } from "svelte-radix";
</script>

<header
    class="fixed top-0 z-10 flex items-center justify-center w-full mx-auto"
>
    <nav
        class="w-[1400px] flex h-16 flex-row justify-between items-center mx-7 my-auto"
    >
        <div><span class="font-bold">SICAP</span></div>
        <div class="flex flex-row">
            <Button on:click={toggleMode} variant="outline" size="icon">
                <Sun
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
            <a href="/iniciar-sesion" class="ml-3">
                <Button class="font-bold">Iniciar Sesión</Button>
            </a>
        </div>
    </nav>
</header>
