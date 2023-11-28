<svelte:head>
    <title>{name} | {project.title}</title>
    <meta name="description" content={project.description}>
</svelte:head>

<script lang="ts">
    export let data;
    let { project } = data;
    import { name } from "../../../../.data/site";
    import "../../../css/markdown.css";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { isDarkMode } from "$lib/store";
    import backDark from "$lib/img/back-dark.svg";
    import backLight from "$lib/img/back-light.svg";
    import linkDark from "$lib/img/link-dark.svg";
    import linkLight from "$lib/img/link-light.svg";

    let mounted = false;
    onMount(() => { mounted = true });
</script>

<div class="w-full h-full flex flex-col">
    <div id="top" class="pt-36 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-md mx-auto p-5">
            <a href="/projects" class="text-sm opacity-50 hover:opacity-100 flex w-fit text-black dark:text-white">
                <img src={$isDarkMode ? backDark : backLight} class="mr-1" alt=""/>Back to Projects
            </a>
            <h1 class="text-4xl font-bold mt-8 text-black dark:text-white">
                {project.title}
            </h1>
            <p class="py-4 text-gray-500">
                {project.description}
            </p>
            {#if project.githubURL}
                <a href={project.githubURL} class="flex text-blue-600 hover:underline">
                    <img src={$isDarkMode ? linkDark : linkLight} alt="" class="mr-2"/>
                    {project.githubURL}
                </a>
            {/if}

            {#if project.liveURL}
                <a href={project.liveURL} class="flex text-blue-600 hover:underline">
                    <img src={$isDarkMode ? linkDark : linkLight} alt="" class="mr-2"/>
                    {project.liveURL}
                </a>
            {/if}
        </div>
    </div>

    {#if mounted}
        <div id="content" class="py-12" transition:fly={{ y: 100, delay: 1000 }}>
            <div class="max-w-screen-md mx-auto p-5 markdown">
                {@html project.body}
            </div>
            <div class="max-w-screen-md mx-auto p-5 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-700">
                <a href="#top" class="text-sm opacity-50 hover:opacity-100 flex w-fit text-black dark:text-white">
                    <img src={$isDarkMode ? backDark : backLight} class="mr-1 rotate-90" alt=""/>Back to Top
                </a>
                <a href="/projects" class="text-sm opacity-50 hover:opacity-100 flex w-fit text-black dark:text-white">
                    <img src={$isDarkMode ? backDark : backLight} class="mr-1" alt=""/>Back to Projects
                </a>
            </div>
        </div>
    {/if}
</div>