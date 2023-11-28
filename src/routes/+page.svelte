<svelte:head>
    <title>{name} | Home</title>
    <meta name="description" content="The portfolio website of {name}">
</svelte:head>

<script lang="ts">
    import { onMount } from "svelte";
    import { name } from "../../.data/site";
    import { fly, slide, scale } from "svelte/transition";
    import { isDarkMode } from "$lib/store";
    import { quadInOut } from "svelte/easing";
    import Theme from "../components/theme.svelte";

    import {
        avatar,
        fullname,
        hello,
        position,
        statement,
        buttonLeft,
        buttonRight,
        showRepository
    } from "../../.data/home";

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
                        <a 
                            href={buttonLeft.url}
                            class="flex items-center bg-black dark:bg-white rounded p-2 gap-2 hover:scale-110">
                            <span class="text-white dark:text-black">{buttonLeft.text}</span>
                        </a>
                    </div>

                    <div in:fly={{duration:300, delay:2000, x: 100, easing: quadInOut}}>
                        <a 
                            href={buttonRight.url}
                            class="flex items-center bg-black dark:bg-white rounded p-2 gap-2 hover:scale-110">
                            <span class="text-white dark:text-black">{buttonRight.text}</span>
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <div class="flex flex-wrap gap-4 mt-4 justify-center">
                    <div in:fly={{duration:300, delay:2000, y: 100, easing: quadInOut}}>
                        {#if showRepository}
                            <div class="flex flex-col justify-center p-2">
                                <a 
                                    target="_blank"
                                    href="https://github.com/markhorn-dev/devfolio" 
                                    class="flex items-center rounded p-1 text-black dark:text-white opacity-50 hover:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        class="mr-2"
                                        fill={$isDarkMode ? "white" : "black"}  
                                    >
                                        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                                    </svg>
                                    <span class="text-sm">markhorn-dev/devfolio</span>
                                </a>
                            </div>
                        {/if}
                    </div>
                </div>
            </section>
        {/if}
    </div>
</div>
