<script lang="ts">
    import { onMount } from "svelte";
    import {avatar, name, hello, position, statement } from "../../.data/home";
    import { fly, slide, blur, scale, fade } from "svelte/transition";
    import { quadInOut } from "svelte/easing";

    let mounted = false;
    onMount(() => { 
        setTimeout(() => {
            mounted = true;
        }, 750)
    });
</script>

<div id="home" class="w-full h-full flex flex-col items-center justify-center">
    <div id="gradient"></div>
    <div class="max-w-screen-sm mx-auto p-10 flex flex-col items-center justify-center text-center">      
        {#if mounted}
            <section in:scale={{duration:250, delay: 300, easing: quadInOut}}>
                <img class="h-32 w-32" alt="" src=
                    {avatar} 
                />
            </section>
            <section in:fly={{duration:500, delay: 600, y: 50, easing: quadInOut}}>
                <h1 class="text-xl md:text-2xl lg:text-3xl font-bold mt-10 text-gray-700">
                    {hello}
                 </h1>
            </section>

            <section in:fly={{duration:500, delay:900, y: 50, easing: quadInOut}}>
                <h1 class="text-2xl md:text-3xl lg:text-4xl mt-0 font-bold uppercase">
                    {#each position as char, i}
                        <span in:slide|global={{ delay: 1000 + i * 25, duration: 300 }}>{char}</span>
                    {/each}
                </h1>
            </section>

            <section in:fly={{duration:500, delay:1200, y: 50, easing: quadInOut}}>
                <h1 class="text-base mt-2 text-gray-500 md:text-lg">
                    {statement}
                </h1>
            </section>
            <section>
                <div class="flex flex-wrap gap-4 mt-8 justify-center">
                    <div in:fly={{duration:300, delay:1200, x: -100, easing: quadInOut}}>
                        <a href="/about" class="p-2 text-sm lg:text-base bg-white rounded border border-gray-500 hover:bg-gray-200 transition duration-300 ease-in-out whitespace-nowrap">
                            Learn More
                        </a>
                    </div>
                    <div in:fly={{duration:300, delay:1200, x: 100, easing: quadInOut}}>
                        <a href="/contact" class="p-2 text-sm lg:text-base bg-black text-white rounded hover:bg-gray-600 transition duration-300 ease-in-out whitespace-nowrap">
                            Contact Me
                        </a>
                    </div>
                </div>
            </section>
        {/if}
    </div>
</div>