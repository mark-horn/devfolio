<script lang="ts">
    import { heading, subheading } from "../../../.data/posts";
    export let data;
    let { posts, tags } = data; 
    
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    
    import checked from "$lib/img/checked.svg";
    import unchecked from "$lib/img/unchecked.svg";

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
    <div id="top" class="pt-36 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-lg mx-auto p-5">
            <h1 class="text-4xl font-bold">
                {heading}
            </h1>
            <p class="py-4">
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
                            <h1 class="font-bold">
                                Filter
                            </h1>
                            <ul class="flex flex-row flex-wrap gap-2 mt-2 md:flex-col">
                                {#each tags as tag}
                                    <button on:click={()=>onFilterClicked(tag)} class="flex items-center bg-gray-100 p-2 rounded hover:bg-gray-200 transition duration-300 ease-in-out">
                                        <img src={filters.has(tag) ? checked : unchecked} height={16} width={16} alt="" class="mr-2"/>
                                        <span class={filters.has(tag) ? 'text-black' : 'text-gray-500'}>
                                            {tag}
                                        </span>
                                    </button>
                                {/each}
                            </ul>
                        </aside>    
                    </div>
                    <div class="col-span-3 md:col-span-2">
                        <h1 class="text-xs uppercase text-gray-500 mb-4">
                            SHOWING {posts.length} of {data.posts.length} posts
                        </h1>
                        <ul class="flex flex-col gap-4 mt-2">
                            {#each posts as post}
                                <li class="white border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                                    <a href={`/posts/${post.slug}`} class="flex flex-col p-5">
                                        <div class="text-xs uppercase text-gray-500">
                                            {post.date}
                                        </div>
                                        <div class="text-lg font-bold mt-4">
                                            {post.title}
                                        </div>
                                        <div class="text-gray-500">
                                            {post.description}
                                        </div>
                                        <ul class="flex flex-wrap mt-4 gap-1">
                                            {#each post.tags as tag}
                                                <li class="text-xs text-gray-500 bg-gray-200 rounded-full py-1 px-2">
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