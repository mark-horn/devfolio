<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { heading, image, paragraphs, skills, experience, stack } from "../../../.data/about";
    import arrow from "$lib/img/arrow.svg";

    let mounted = false;
    onMount(() => { mounted = true });
</script>

<div class="w-full h-full flex flex-col">

    <!-- TOP -->
    <div id="top" class="pt-36 pb-12 bg-gray-100 border-b border-gray-300">
        <div class="max-w-screen-md mx-auto p-5">
            <h1 class="text-4xl font-bold">
                About
            </h1>
            <p class="py-4">
                {heading}
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
                    <h2 class="text-2xl font-bold mt-10">
                        Introduction
                    </h2>
                    {#each paragraphs as paragraph}
                        <p class="my-5">
                            {paragraph}
                        </p>
                    {/each}
                </section>

                <!-- SKILLS SECTION -->
                <section>
                    <h2 class="py-5 text-2xl font-bold">
                        Skills
                    </h2>
                    <ul class="flex flex-wrap gap-2">
                        {#each skills as skill}
                            <li class="px-2 py-1 bg-gray-200 rounded">
                                {skill}
                            </li>
                        {/each}
                    </ul>
                </section>

                <!-- EXPERIENCE SECTION -->
                <section>
                    <h2 class="mt-10 mb-5 text-2xl font-bold">
                        Experience
                    </h2>
                    <ul class="flex flex-col gap-4">
                        {#each experience as experience}
                            <li class="flex flex-col border border-gray-200 rounded p-5">
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <div>
                                        <div class="font-bold text-lg">
                                            {experience.company}
                                        </div>
                                        <div class="text-gray-500">
                                            {experience.position}
                                        </div>
                                    </div>
                                    <div class="text-start sm:text-end ">
                                        <span class="">
                                            {experience.timeframe}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </section>

                <!-- ABOUT WEBSITE SECTION -->
                <h2 class="mt-10 mb-2 text-2xl font-bold">
                    About this website
                </h2>
                <p class="mb-5 text-gray-500">
                    This website was built with the following stack
                </p>
                <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {#each stack as item}
                        <li class="flex flex-col border border-gray-200 rounded">
                            <a class="p-5 hover:bg-gray-100 transition duration-300" href={item.href} target="_blank">
                                <img src={`images/about/${item.image}`} alt="" height={36} width={36}/>
                                <h5 class="font-bold mt-2">
                                    {item.name}
                                </h5>
                                <p class="text-sm text-gray-500">
                                    {item.desc}
                                </p>
                                <div class="flex mt-2">
                                    <span class="text-sm text-gray-500 mr-2">
                                        {item.hrefText}
                                    </span>
                                    <img src={arrow} height={8} width={8} alt =""/>
                                </div>
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
</div>
