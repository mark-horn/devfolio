<svelte:head>
    <title>{name} | Projects</title>
    <meta name="description" content="{name}'s Projects">
</svelte:head>

<script lang="ts">
    import { name } from "../../../.data/site";
    import { heading, subheading } from "../../../.data/projects";
    export let data;
    let { projects, tags } = data;

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
        projects = data.projects.filter((project) => {
            return [...filters].every((tag) => project.tags.includes(tag));
        });
    }
</script>

<div class="w-full h-full flex flex-col">
    <div id="top" class="pt-36 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-lg mx-auto p-5">
            <h1 id="heading" class="text-4xl font-bold text-black dark:text-white">
                {heading}
            </h1>
            <p id="subheading" class="py-4 text-zinc-400">
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
                            <h1 class="font-bold text-black dark:text-white">
                                Filter
                            </h1>
                            <ul class="flex flex-row flex-wrap gap-2 mt-2 md:flex-col w-full">
                                {#each tags as tag}
                                    <li class="rounded
                                    bg-zinc-100 hover:bg-zinc-200
                                    dark:bg-zinc-800 dark:hover:bg-zinc-700">
                                        <button    
                                            on:click={()=>onFilterClicked(tag)} 
                                            class="w-full flex items-center p-2">
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
                        <h1 class="text-xs uppercase mb-4 text-zinc-500">
                            SHOWING {projects.length} of {data.projects.length} projects
                        </h1>
                        <ul class="flex flex-col gap-4 mt-2">
                            <div class="grid grid-cols-1 gap-5">
                                {#each projects as project}
                                    <li class="
                                    border rounded-lg bg-transparent 
                                    border-gray-300 hover:bg-gray-100
                                    dark:border-zinc-700 dark:hover:bg-zinc-800">
                                        <a href={`/projects/${project.slug}`} class="flex flex-col p-5 h-full">
                                            {#if project.image}
                                                <img src={project.image} alt="" class="rounded pb-4 "/>
                                            {/if}
                                            <h5 class="text-lg font-bold text-black dark:text-white">
                                                {project.title}
                                            </h5>
                                            <p class="text-sm mb-4 text-zinc-500">
                                                {project.description}
                                            </p>
                                            <ul class="flex flex-wrap gap-1 mt-auto">
                                                {#each project.tags as tag}
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
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>