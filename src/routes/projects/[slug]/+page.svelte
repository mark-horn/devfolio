<script lang="ts">
    export let data;
    let { project } = data;
    import "../../../css/markdown.css";
    import linkIcon from "$lib/img/link.svg";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import back from "$lib/img/back.svg"; 

    let mounted = false;
    onMount(() => { mounted = true });
</script>

<div class="w-full h-full flex flex-col">
    <div id="top" class="pt-32 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-md mx-auto p-5">
            <a href="/projects" class="text-sm opacity-50 hover:opacity-100 transition duration-300 ease-in-out flex w-fit">
                <img src={back} class="mr-1" alt=""/>Back to Projects
            </a>
            <h1 class="text-4xl font-bold mt-8">
                {project.title}
            </h1>
            <p class="py-4 text-gray-500">
                {project.description}
            </p>
            {#if project.githubURL}
                <a href={project.githubURL} class="flex text-blue-600 hover:underline">
                    <img src={linkIcon} alt="" class="mr-2"/>
                    {project.githubURL}
                </a>
            {/if}

            {#if project.liveURL}
                <a href={project.liveURL} class="flex text-blue-600 hover:underline">
                    <img src={linkIcon} alt="" class="mr-2"/>
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
        </div>
    {/if}
</div>