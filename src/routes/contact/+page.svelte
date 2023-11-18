<script>
    import emailIcon from "$lib/img/email.svg";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { heading, subheading, social, emails } from "../../../.data/contact";
    
    let mounted = false;
    onMount(() => { mounted = true });
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
    <div id="content" class="py-12"
        transition:fly={{
            y: 100,
            delay: 1000,
        }}
    >
        <div class="max-w-screen-lg mx-auto p-5 ">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                <form class="flex flex-col gap-5">
                    <div class="flex flex-col gap-1">
                        <label for="name">Name</label>
                        <input id="name" type="text" class=" w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1" placeholder="John Doe" required/> 
                        <div class="text-sm">Ok Error</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="email">Email</label>
                        <input id="email" type="text" class=" w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1" placeholder="johndoe@acme.com" required/> 
                        <div class="text-sm">Ok Error</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="subject">Subject</label>
                        <input id="subject" type="text" class=" w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1" placeholder="Enter a subject" required/>    
                        <div class="text-sm">Ok Error</div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="message">Message</label>
                        <textarea id="message" class="w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1 resize-none" placeholder="Enter a message" required/>    
                        <div class="text-sm">Ok Error</div>
                    </div>
                    <div>
                        <button class="bg-black text-white rounded py-1 px-4 hover:opacity-75">
                            Send
                        </button>
                    </div>
                </form>
                <div class="">
                    <h1 class="text-2xl font-bold">
                        Other ways to contact
                    </h1>
                    <h1 class="text-1xl font-bold mt-4 mb-2">
                        Social Media
                    </h1>
                    <ul class="flex flex-wrap gap-2">
                        {#each social as item}
                            <li class="flex justify-center items-center h-8 w-8 p-1 opacity-200 hover:opacity-60 transition duration-300 bg-black rounded">
                                <a href={item.url}>
                                    <img src={item.img} width={32} height={32} alt=""/>
                                </a>
                            </li>
                        {/each}
                    </ul>
                    <h1 class="text-1xl font-bold mt-4 mb-1">
                        Email
                    </h1>
                    <ul>
                        {#each emails as email}
                            <li>
                                <a href={`mailto:${email.url}`} class="flex text-blue-600 hover:underline">
                                    <img src={emailIcon} alt="" class="mr-2"/>
                                    {email.url}
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
