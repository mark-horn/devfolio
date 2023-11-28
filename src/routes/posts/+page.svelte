<svelte:head>
    <title>{name} | Blog</title>
    <meta name="description" content="{name}'s Blog Posts">
</svelte:head>

<script lang="ts">
    import { name } from "../../../.data/site";
    import { heading, subheading } from "../../../.data/posts";
    export let data;
    let { posts, tags } = data; 
    
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import { isDarkMode } from "$lib/store";
    import checkedDark from "$lib/img/checked-dark.svg";
    import checkedLight from "$lib/img/checked-light.svg";
    import uncheckedDark from "$lib/img/unchecked-dark.svg";
    import uncheckedLight from "$lib/img/unchecked-light.svg";

    let mounted = false;
    onMount(() => { mounted = true });

    let filters: Set<string> = new Set<string>();

    function onFilterClicked(tag: string) {
        if  (filters.has(tag)) {
            filters.delete(tag) 
        } else {
            filters.add(tag);
        }
        filters = new Set<string>([...filters]);
        posts = data.posts.filter((post) => {
            return [...filters].every((tag) => post.tags.includes(tag));
        });
    }
</script>

<div class="w-full h-full flex flex-col">
    <div id="top" class="pt-36 pb-12 bg-zinc-100 border-b border-zinc-300">
        <div class="max-w-screen-lg mx-auto p-5">
            <h1 class="text-4xl font-bold text-black dark:text-white">
                {heading}
            </h1>
            <p class="py-4 text-zinc-400">
                {subheading}
            </p>
        </div>
    </div>

    {#if mounted}
        <div id="content" class="py-12" transition:fly={{ y: 100, delay: 1000 }}>
            <div class="max-w-screen-lg mx-auto p-5">
                <div class="grid grid-cols-3 gap-12">
                    <div class="col-span-3 md:col-span-1 relative">
                        <aside class="sticky top-20">
                            <h1 class="filterText font-bold text-black dark:text-white">
                                Filter
                            </h1>
                            <ul class="flex flex-row flex-wrap gap-2 mt-2 md:flex-col w-full">
                                {#each tags as tag}
                                    <li class="rounded
                                    bg-zinc-100 hover:bg-zinc-200
                                    dark:bg-zinc-800 dark:hover:bg-zinc-700"
                                    >
                                        <button    
                                            on:click={()=>onFilterClicked(tag)} 
                                            class="w-full flex items-center p-2"
                                        >
                                            <img 
                                                height={16} 
                                                width={16} 
                                                alt="" 
                                                class="mr-2"
                                                src={
                                                    filters.has(tag) ? 
                                                    $isDarkMode ? checkedDark : checkedLight : 
                                                    $isDarkMode ? uncheckedDark : uncheckedLight
                                                }
                                            />
                                            <span class={
                                                filters.has(tag) ? 
                                                $isDarkMode ? 'text-white' : 'text-black' : 
                                                'text-zinc-400'
                                                }
                                            >
                                                {tag}
                                            </span>
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        </aside>   
                    </div>
                    <div class="col-span-3 md:col-span-2">
                        <h1 class="text-xs uppercase text-zinc-500 mb-4">
                            SHOWING {posts.length} of {data.posts.length} posts
                        </h1>
                        <ul class="flex flex-col gap-4 mt-2">
                            {#each posts as post}
                                <li class="
                                border rounded-lg bg-transparent 
                                border-gray-300 hover:bg-gray-100
                                dark:border-zinc-700 dark:hover:bg-zinc-800">
                                    <a href={`/posts/${post.slug}`} class="flex flex-col p-5">
                                        <p class="text-xs uppercase text-zinc-500">
                                            {post.date}
                                        </p>
                                        <h5 class="postTitle text-lg font-bold mt-4 text-black dark:text-white">
                                            {post.title}
                                        </h5>
                                        <p class="postDescription text-zinc-500">
                                            {post.description}
                                        </p>
                                        <ul class="flex flex-wrap mt-4 gap-1">
                                            {#each post.tags as tag}
                                                <li class="text-xs rounded-full py-1 px-2
                                                bg-zinc-200 text-zinc-500
                                                dark:bg-zinc-700 dark:text-zinc-400">
                                                    {tag}
                                                </li>
                                            {/each}
                                        </ul>
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>