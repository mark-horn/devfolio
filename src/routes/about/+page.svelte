<script>
    import { heading, subheading, image, paragraphs, skills, experience, stack } 
    from "../../../.data/about";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { isDarkMode } from "$lib/store";
    import arrowDark from "$lib/img/arrow-dark.svg";
    import arrowLight from "$lib/img/arrow-light.svg";

    let mounted = false;
    onMount(() => { mounted = true });
</script>

<div class="w-full h-full flex flex-col">

    <!-- TOP -->
    <div id="top" class="pt-36 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-md mx-auto p-5">
            <h1 id="heading" class="text-4xl font-bold text-black dark:text-white">
                {heading}
            </h1>
            <p id="subheading" class="py-4 text-zinc-400">
                {subheading}
            </p>
        </div>
    </div>

    <!-- BOTTOM -->
    {#if mounted}
        <div id="content" class="py-12" transition:fly={{ y: 100, delay: 1000 }}>
            <div class="max-w-screen-md mx-auto p-5 ">
                <img class="w-full rounded-lg" src={image} alt=""/>

                <!-- INTRODUCTION SECTION -->
                <section>
                    <h2 class="text-2xl font-bold mt-10 text-black dark:text-white">
                        Introduction
                    </h2>
                    {#each paragraphs as paragraph}
                        <p class="my-5 text-zinc-700 dark:text-zinc-400">
                            {paragraph}
                        </p>
                    {/each}
                </section>

                <!-- SKILLS SECTION -->
                <section>
                    <h2 class="text-black dark:text-white py-5 text-2xl font-bold">
                        Skills
                    </h2>
                    <ul class="flex flex-wrap gap-2">
                        {#each skills as skill}
                            <li class="px-2 py-1 rounded 
                            bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-400">
                                {skill}
                            </li>
                        {/each}
                    </ul>
                </section>

                <!-- EXPERIENCE SECTION -->
                <section>
                    <h2 class="text-black dark:text-white mt-10 mb-5 text-2xl font-bold">
                        Experience
                    </h2>
                    <ul class="flex flex-col gap-4">
                        {#each experience as experience}
                            <li class="flex flex-col border rounded p-5
                            border-zinc-200 dark:border-zinc-700
                            
                            ">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                        <h5 class="font-bold text-lg text-black dark:text-white">
                                            {experience.company}
                                        </h5>
                                        <div class="text-zinc-500">
                                            {experience.position}
                                        </div>
                                    </div>
                                    <div class="text-start sm:text-end text-zinc-500">
                                        <p class="">
                                            {experience.timeframe}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </section>

                <!-- ABOUT WEBSITE SECTION -->
                <h2 class="text-black dark:text-white mt-10 mb-2 text-2xl font-bold">
                    About this website
                </h2>
                <p class="mb-5 text-zinc-400">
                    This website was built with the following stack
                </p>
                <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {#each stack as item}
                        <li class="flex flex-col border rounded
                        border-zinc-200 dark:border-zinc-700
                        hover:bg-zinc-100 dark:hover:bg-zinc-800
                        ">
                            <a class="p-5 " href={item.href} target="_blank">
                                <img src={`images/about/${item.image}`} alt="" height={36} width={36}/>
                                <h5 class="font-bold my-2 text-black dark:text-white">
                                    {item.name}
                                </h5>
                                <p class="text-sm text-zinc-500">
                                    {item.desc}
                                </p>
                                <div class="flex mt-2">
                                    <span class="text-sm text-zinc-600 dark:text-zinc-400 mr-2">
                                        {item.hrefText}
                                    </span>
                                    <img  
                                        height={8} 
                                        width={8} 
                                        alt =""
                                        src={$isDarkMode ? arrowDark : arrowLight}
                                    />
                                </div>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</div>
