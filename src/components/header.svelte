<script lang="ts">
    import { name, brand } from "../../.data/site";
    import { fly } from "svelte/transition";
    import { isDrawerOpen, isScrolled } from "$lib/store";
    import { onMount } from "svelte";
    import { isDarkMode } from "$lib/store";
    import drawerOpenDark from "$lib/img/drawer-open-dark.svg";
    import drawerOpenLight from "$lib/img/drawer-open-light.svg";
    import drawerCloseDark from "$lib/img/drawer-close-dark.svg";
    import drawerCloseLight from "$lib/img/drawer-close-light.svg";

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
    <header id="header" class="{!$isDrawerOpen  && $isScrolled ? 'scrolled-state' : ''}
        fixed z-30 top-0 left-0 w-full h-14"
        transition:fly={{ duration: 500, y: "-60px",}}
    >
        <div class="absolute top-1/2 -translate-y-1/2 left-0 ml-5">
            <a href="/" class="headerBrandLink flex hover:scale-105">
                <img 
                    width={15} 
                    height={20} 
                    alt=""
                    src={$isDarkMode ? brand.dark : brand.light} 
                />
                <h5 class="headerBrandText ml-2 font-bold text-black dark:text-white">
                    {name}
                </h5>
            </a>
        </div>

        <nav class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            {#if !$isDrawerOpen}
                <div class="hidden md:flex gap-3">
                    {#each [
                        {text: "Home", url: "/"},
                        {text: "About", url: "/about"},
                        {text: "Projects", url: "/projects"},
                        {text: "Blog", url: "/posts"},
                        {text: "Contact", url: "/contact"}
                    ] as route}
                        <a 
                            href={route.url} 
                            class="py-1 px-2 rounded 
                            text-black dark:text-white
                            opacity-100 hover:opacity-50"
                        >
                            {route.text}
                        </a>
                    {/each}
                </div>
            {/if}
        </nav>

        <div class="absolute top-1/2 -translate-y-1/2 right-0 mr-5 flex">
            <a 
                download
                href="/resume.pdf"  
                class="headerResumeButton 
                flex items-center rounded h-8 px-2 py-1 text-sm 
                bg-black text-white opacity-100 hover:opacity-70
                dark:bg-white dark:text-black"
            >
                Resume
            </a>
            <div class="{$isDrawerOpen ? 'flex' : 'flex md:hidden'}">
                <button 
                    on:click={toggleDrawer} 
                    class="headerDrawerButton rounded ml-2 p-2 border 
                    border-zinc-300 dark:border-zinc-700
                    hover:bg-zinc-200 dark:hover:bg-zinc-800"
                >
                    <img 
                        height={16} 
                        width={16} 
                        alt=""
                        src={$isDrawerOpen ? 
                        $isDarkMode ? drawerCloseDark : drawerCloseLight : 
                        $isDarkMode ? drawerOpenDark : drawerOpenLight
                        }
                    />
                </button>
            </div>
        </div>

    </header>
{/if}

<style>
    #header {
        background-color: transparent;
        border: 1px solid transparent;
        transition: 300ms ease all;
    }
    #header.scrolled-state {
        border: 1px solid rgba(0, 0, 0, 0.10);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.10);
    }
</style>