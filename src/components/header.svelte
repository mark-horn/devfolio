<script lang="ts">
    import { name, brand } from "../../.data/site";
    import drawerOpen from "$lib/img/drawerOpen.svg";
    import drawerClose from "$lib/img/drawerClose.svg";
    import { fly } from "svelte/transition";
    import { isDrawerOpen, isScrolled } from "$lib/store";
    import { onMount } from "svelte";

    let mounted = false;
    onMount(() => { 
        setTimeout(() => {
            isScrolled.update(value => false);
            mounted = true;
        }, 1250);
    });

    function toggleDrawer() {
        isDrawerOpen.update(value => !value);
    };
</script>

{#if mounted}
    <header id="header" class="fixed z-30 top-0 left-0 w-full h-14 {
        !$isDrawerOpen  && $isScrolled ? 'scrolled-state' : ''}"
        transition:fly={{ duration: 500, y: "-60px",}}
    >

        <div class="absolute top-1/2 -translate-y-1/2 left-0 ml-5">
            <a href="/" class="flex hover:scale-105 transition duration-300 ease-in-out">
                <img src={brand} width={15} height={20} alt=""/>
                <span class="ml-2 font-bold">
                    {name}
                </span>
            </a>
        </div>

        <nav class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            {#if !$isDrawerOpen}
            <div class="hidden md:flex gap-3">
                <a href="/" class="hover:bg-gray-200 transition duration-300 ease-in-out py-1 px-2 rounded">
                    Home
                </a>
                <a href="/about" class="hover:bg-gray-200 transition duration-300 ease-in-out py-1 px-2 rounded">
                    About
                </a>
                <a href="/projects" class="hover:bg-gray-200 transition duration-300 ease-in-out py-1 px-2 rounded">
                    Projects
                </a>
                <a href="/posts" class="hover:bg-gray-200 transition duration-300 ease-in-out py-1 px-2 rounded">
                    Blog
                </a>
                <a href="/contact" class="hover:bg-gray-200 transition duration-300 ease-in-out py-1 px-2 rounded">
                    Contact
                </a>
            </div>
            {/if}
        </nav>

        <div class="absolute top-1/2 -translate-y-1/2 right-0 mr-5">
            <div class="{$isDrawerOpen ? 'hidden' : 'hidden md:flex'}">
                <a href="/resume.pdf" download class="bg-black text-white rounded px-2 py-1 text-sm hover:bg-slate-600 transition duration-300 ease-in-out">
                    Resume
                </a>
            </div>
            
            <div class="{$isDrawerOpen ? 'flex' : 'flex md:hidden'}">
                <button on:click={toggleDrawer} class="rounded p-2 border border-gray-300 hover:bg-gray-200">
                    <img src={$isDrawerOpen ? drawerClose : drawerOpen} height={16} width={16} alt=""/>
                </button>
            </div>
        </div>

    </header>
{/if}

<style>
    #header {
        background-color: transparent;
        border: 1px solid transparent;
        transition: 500ms ease all;
    }
    #header.scrolled-state {
        border: 1px solid rgba(0, 0, 0, 0.10);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.10);
    }
</style>