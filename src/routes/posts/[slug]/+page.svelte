<script lang="ts">
    export let data;
    let { post } = data; 
    import "../../../css/markdown.css";
    import back from "$lib/img/back.svg";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    let mounted = false;
    onMount(() => { mounted = true });
</script>

<div class="w-full h-full flex flex-col">
    <div id="top" class="pt-32 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-md mx-auto p-5">
            <a href="/posts" class="text-sm opacity-50 hover:opacity-100 transition duration-300 ease-in-out flex w-fit">
                <img src={back} class="mr-1" alt=""/>Back to Blog
            </a>
            <h1 class="text-4xl font-bold mt-8">
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
        </div>
    {/if}
</div>