<svelte:head>
    <title>{name} | Home</title>
    <meta name="description" content="The portfolio website of {name}">
</svelte:head>

<script lang="ts">
    import { onMount } from "svelte";
    import { name } from "../../.data/site";
    import {avatar, hello, position, statement } from "../../.data/home";
    import { fly, slide, blur, scale, fade } from "svelte/transition";
    import { quadInOut } from "svelte/easing";
    import Theme from "../components/theme.svelte";

    let mounted = false;
    onMount(() => { 
        setTimeout(() => {
            mounted = true;
        }, 750)
    });
</script>

<div id="home" class="w-full h-full flex flex-col items-center justify-center">
    <div class="fixed z-10 right-0 bottom-0 mr-5 mb-5">
        <Theme/>
    </div>
    <div id="gradient"></div>
    <div class="max-w-screen-sm mx-auto p-10 flex flex-col items-center justify-center text-center">      
        {#if mounted}
            <section in:scale={{duration:250, delay: 300, easing: quadInOut}}>
                <img class="h-32 w-32" alt="" src=
                    {avatar} 
                />
            </section>
            <section in:fly={{duration:500, delay: 600, y: 50, easing: quadInOut}}>
                <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mt-10 
                text-zinc-500 dark:text-zinc-400">
                    {hello}
                 </h1>
            </section>

            <section in:fly={{duration:500, delay:900, y: 50, easing: quadInOut}}>
                <h1 class="text-2xl md:text-3xl lg:text-4xl mt-0 font-bold uppercase text-black dark:text-white">
                    {#each position as char, i}
                        <span in:slide|global={{ delay: 1000 + i * 25, duration: 300 }}>{char}</span>
                    {/each}
                </h1>
            </section>

            <section in:fly={{duration:500, delay:1200, y: 50, easing: quadInOut}}>
                <h1 class="text-base mt-2 md:text-lg
                text-zinc-500">
                    {#each statement as char, i}
                        <span in:slide|global={{ delay: 1200 + i * 15, duration: 300 }}>{char}</span>
                    {/each}
                </h1>
            </section>
            <section>
                <div class="flex flex-wrap gap-4 mt-8 justify-center">
                    <div in:fly={{duration:300, delay:2000, x: -100, easing: quadInOut}}>
                        <a href="/about" 
                            class="flex items-center p-2 text-sm lg:text-base whitespace-nowrap rounded border
                            bg-transparent hover:bg-zinc-200 border-zinc-500
                            dark:hover:bg-zinc-800 dark:text-white"
                        >
                            <div>
                                Learn More
                            </div>
                        </a>
                    </div>
                    <div in:fly={{duration:300, delay:2000, x: 100, easing: quadInOut}}>
                        <a href="/contact" 
                            class="flex items-center p-2 text-sm lg:text-base whitespace-nowrap rounded border
                            bg-transparent hover:bg-zinc-200 border-zinc-500
                            dark:hover:bg-zinc-800 dark:text-white"
                        >
                            <div>
                                Contact Me
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        {/if}
    </div>
</div>
