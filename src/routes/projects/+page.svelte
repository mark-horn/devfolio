<script lang="ts">
    import { heading, subheading } from "../../../.data/projects";
    export let data;
    let { projects, tags } = data;

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
        projects = data.projects.filter((project) => {
            return [...filters].every((tag) => project.tags.includes(tag));
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
                            <ul class="flex flex-row flex-wrap gap-2 mt-2 md:flex-col w-full">
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
                            SHOWING {projects.length} of {data.projects.length} projects
                        </h1>
                        <ul class="flex flex-col gap-4 mt-2">
                            <div class="grid grid-cols-1 gap-5">
                                {#each projects as project}
                                    <li class="white border border-gray-200 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out">
                                        <a href={`/projects/${project.slug}`} class="flex flex-col p-5 h-full">
                                            <img src={project.image} alt=""/>
                                            <div class="text-lg font-bold">
                                                {project.title}
                                            </div>
                                            <div class="text-gray-500 text-sm mb-4">
                                                {project.description}
                                            </div>
                                            <ul class="flex flex-wrap gap-1 mt-auto">
                                                {#each project.tags as tag}
                                                    <li class="text-xs text-gray-500 bg-gray-200 rounded-full py-1 px-2">
                                                        {tag}
                                                    </li>
                                                {/each}
                                            </ul>
                                        </a>
                                    </li>
                                {/each}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>