<script lang="ts">
    export let data;
    let { post } = data; 
    import { isDarkMode } from "$lib/store";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import backDark from "$lib/img/back-dark.svg";
    import backLight from "$lib/img/back-light.svg";
    
    let mounted = false;
    onMount(() => { mounted = true });
</script>

<div class="w-full h-full flex flex-col">
    <div id="top" class="pt-32 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-md mx-auto p-5">
            <a href="/posts" class="text-sm opacity-50 hover:opacity-100 flex w-fit text-black dark:text-white">
                <img src={$isDarkMode ? backDark : backLight} class="mr-1" alt=""/>Back to Blog
            </a>
            <h1 class="text-4xl font-bold mt-8 text-black dark:text-white">
                {post.title}
            </h1>
            <p class="py-4 text-gray-500">
                {post.description}
            </p>
        </div>
    </div>
    {#if mounted}
        <div id="content" class="py-12" transition:fly={{ y: 100, delay: 1000 }}>
            <div class="max-w-screen-md mx-auto p-5 markdown">
                {@html post.body}
            </div>
            <div class="max-w-screen-md mx-auto p-5 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-700">
                <a href="#top" class="text-sm opacity-50 hover:opacity-100 flex w-fit text-black dark:text-white">
                    <img src={$isDarkMode ? backDark : backLight} class="mr-1 rotate-90" alt=""/>Back to Top
                </a>
                <a href="/posts" class="text-sm opacity-50 hover:opacity-100 flex w-fit text-black dark:text-white">
                    <img src={$isDarkMode ? backDark : backLight} class="mr-1" alt=""/>Back to Blog
                </a>
            </div>
        </div>
    {/if}
</div>