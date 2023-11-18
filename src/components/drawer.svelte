<script lang="ts">
    import { isDrawerOpen } from "$lib/store";
    import { fly } from "svelte/transition";
    import { goto } from "$app/navigation";

    function onClick(url: string) {
        isDrawerOpen.update(value => false);
        setTimeout(() => {
            goto(url);
        }, 1000);
    }
</script>

{#if $isDrawerOpen}
    <div id="drawer" class="fixed z-20 top-0 left-0 right-0 bottom-0 bg-gray-100"
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
                <button on:click={()=>onClick('/')} class="text-4xl flex">
                    Home
                </button>
                <button on:click={()=>onClick('/about')} class="text-4xl flex">
                    About
                </button>
                <button on:click={()=>onClick('/projects')} class="text-4xl flex">
                    Projects
                </button>
                <button on:click={()=>onClick('/posts')} class="text-4xl flex">
                    Blog
                </button>
                <button on:click={()=>onClick('/contact')} class="text-4xl flex">
                    Contact
                </button>
            </div>
        </nav>
    </div>
{/if}

