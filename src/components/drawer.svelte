<script lang="ts">
    import { isDrawerOpen } from "$lib/store";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";
    import Theme from "./theme.svelte";

    function onClick(url: string) {
        isDrawerOpen.update(value => false);
        setTimeout(() => {
            goto(url);
        }, 1000);
    }
</script>

{#if $isDrawerOpen}
    <div id="drawer" class="fixed z-20 top-0 left-0 right-0 bottom-0 
        bg-gray-100 dark:bg-zinc-900"
        in:fly={{
            y: "-100vh",
            opacity: 1,
            duration: 500
        }}
        out:fly={{
            y: "-100vh",
            opacity: 1,
            duration: 500
        }}
    >
        <nav class="flex flex-col h-full items-center justify-center">
            <div class="flex flex-col gap-10">
                {#each [
                    {text: "Home", url: "/"},
                    {text: "About", url: "/about"},
                    {text: "Projects", url: "/projects"},
                    {text: "Blog", url: "/posts"},
                    {text: "Contact", url: "/contact"}
                ] as route}
                    <button on:click={()=>onClick(route.url)} 
                        class="text-3xl flex text-black dark:text-white opacity-50 hover:opacity-100">
                        {route.text}
                    </button>
                {/each}
                <Theme/>
            </div>
        </nav>
    </div>
{/if}

