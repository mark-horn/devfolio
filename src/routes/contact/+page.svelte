<svelte:head>
    <title>{name} | Contact</title>
    <meta name="description" content="How to contact {name}">
</svelte:head>

<script lang="ts">
    import { name } from "../../../.data/site";
    import { heading, subheading, social, emails } from "../../../.data/contact";
    import { isDarkMode } from "$lib/store";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    
    import emailDark from "$lib/img/email-dark.svg";
    import emailLight from "$lib/img/email-light.svg";
    
    let mounted = false;
    onMount(() => { mounted = true });

    let form = initializeForm();
    let isSubmitting = false;
    let isSuccessful = false;
    let isServerError = false;
    let serverMessage = "";

    function onTextAreaInput() {
        const textArea = document.getElementById("message");
        if(textArea) {
            textArea.style.height = "auto";
            textArea.style.height = (textArea.scrollHeight + 2) + "px";
            onInput();
        }
    }

    function onInput() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        form.email.valid = regex.test(form.email.value);
        form.name.valid = form.name.value.length > 0
        form.subject.valid = form.subject.value.length > 0
        form.message.valid = form.message.value.length > 0
        updateForm()
    }

    function onSubmit(e: Event) {
        e.preventDefault()
        isSuccessful = false
        isServerError = false;
        form.name.error = !form.name.valid
        form.email.error = !form.email.valid
        form.subject.error = !form.subject.valid
        form.message.error = !form.message.valid
        updateForm()
        submitForm()
    }

    function initializeForm() {
        return {
            name: { value: "", valid: false, error: false },
            email: { value: "", valid: false, error: false },
            subject: { value: "", valid: false, error: false },
            message: { value: "", valid: false, error: false },
            valid: false,
            error: false
        }
    }

    function updateForm() {
        form.valid = form.name.valid && form.email.valid && form.subject.valid && form.message.valid
        form.error = form.name.error || form.email.error || form.subject.error || form.message.error
    }

    function resetTextArea() {
        const textArea = document.getElementById("message");
        if(textArea) {
            textArea.style.height = "auto";
            textArea.style.height = (textArea.scrollHeight + 2) + "px";
        }
    }

    async function submitForm() {
        if (form.valid) {
            isSubmitting = true;

            const response = await fetch('/api/email', {
                method: 'POST',
                body: JSON.stringify({
                    name: form.name.value,
                    email: form.email.value,
                    subject: form.subject.value,
                    message: form.message.value
                })
            })

            if (response.ok) {
                const results = await response.json();
                isSuccessful = true;
                isServerError = false;
                serverMessage = results;
                resetTextArea();
                form = initializeForm();
            } else {
                const errors = await response.json();
                isSuccessful = false;
                isServerError = true;
                serverMessage = errors;
            }

            isSubmitting = false;
        }
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
    {#key mounted}
    <div id="content" class="py-12"
        in:fly={{
            y: 100,
            delay: 1000,
        }}
    >
        <div class="max-w-screen-lg mx-auto p-5 ">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
                <form on:submit={onSubmit} class="flex flex-col gap-5">
                    {#if isSuccessful}
                        <div class="bg-green-200 text-green-700 border-green-400 border rounded p-5 mb-4">
                            {serverMessage}
                        </div>
                    {/if}
                    {#if isServerError}
                        <div class="bg-red-200 text-red-700 border-red-400 border rounded p-5 mb-4">
                            {serverMessage}
                        </div>
                    {/if}
                    <div class="flex flex-col gap-1">
                        <label for="name" class="text-black dark:text-white">
                            Name
                        </label>
                        <input 
                            id="name" 
                            type="text" 
                            autocomplete="name"
                            spellcheck="false"
                            placeholder="John Doe" 
                            maxlength="100" 
                            disabled={isSubmitting} 
                            bind:value={form.name.value} 
                            on:input={onInput}
                            class=" w-full p-1 border rounded outline-none ring-0 
                            text-black bg-zinc-100 border-zinc-300 focus:ring-2 focus:ring-zinc-400
                            dark:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-2 dark:focus:ring-white"
                        />
                        {#if form.name.error}
                            {#if form.name.valid}
                                <div class="text-sm text-green-600">Looks good</div>
                            {:else}
                                <div class="text-sm text-red-500">Please enter a valid name.</div>
                            {/if}
                        {/if}
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="email" class="text-black dark:text-white">
                            Email
                        </label>
                        <input 
                            id="email" 
                            type="text"
                            autocomplete="email"
                            spellcheck="false"
                            placeholder="johndoe@acme.com"
                            maxlength="100" 
                            disabled={isSubmitting} 
                            bind:value={form.email.value} 
                            on:input={onInput}
                            class=" w-full p-1 border rounded outline-none ring-0 
                          text-black bg-zinc-100 border-zinc-300 focus:ring-2 focus:ring-zinc-400
                            dark:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-2 dark:focus:ring-white"
                        />
                        {#if form.email.error}
                            {#if form.email.valid}
                                <div class="text-sm text-green-600">Looks good</div>
                            {:else}
                                <div class="text-sm text-red-500">Please enter a valid email.</div>
                            {/if}
                        {/if}
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="subject" class="text-black dark:text-white">
                            Subject
                        </label>
                        <input 
                            id="subject" 
                            type="text" 
                            autocomplete="off"
                            placeholder="Enter a subject"
                            maxlength="100" 
                            spellcheck="false"
                            disabled={isSubmitting} 
                            bind:value={form.subject.value} 
                            on:input={onInput}
                            class=" w-full p-1 border rounded outline-none ring-0 
                          text-black bg-zinc-100 border-zinc-300 focus:ring-2 focus:ring-zinc-400
                            dark:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-2 dark:focus:ring-white"
                        />
                        {#if form.subject.error}
                            {#if form.subject.valid}
                                <div class="text-sm text-green-600">Looks good</div>
                            {:else}
                                <div class="text-sm text-red-500">Please enter a valid subject.</div>
                            {/if}
                        {/if}
                    </div>
                    <div class="flex flex-col gap-1">
                        <label for="message" class="text-black dark:text-white">
                            Message
                        </label>
                        <textarea 
                            id="message"
                            autocomplete="off"
                            placeholder="Enter a message"
                            spellcheck="false"
                            disabled={isSubmitting} 
                            bind:value={form.message.value} 
                            on:input={onTextAreaInput}
                            class=" w-full p-1 border rounded outline-none ring-0 resize-none
                            text-black bg-zinc-100 border-zinc-300 focus:ring-2 focus:ring-zinc-400
                            dark:text-white dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-2 dark:focus:ring-white" 
                        />
                        {#if form.message.error}
                            {#if form.message.valid}
                                <div class="text-sm text-green-600">Looks good</div>
                            {:else}
                                <div class="text-sm text-red-500">Please enter a valid message.</div>
                            {/if}
                        {/if}
                    </div>
                    <div>
                        <button class="rounded mt-2 py-1 px-4 hover:opacity-75
                        bg-black text-white dark:bg-white dark:text-black
                        ">
                            Send
                        </button>
                    </div>
                </form>
                <div class="">
                    <h1 class="text-black dark:text-white text-2xl font-bold">
                        Other ways to contact
                    </h1>
                    <h1 class="text-1xl font-bold my-2 pt-2
                     text-zinc-600 dark:text-zinc-400 border-t border-t-zinc-200 dark:border-t-zinc-700">
                        Social Media
                    </h1>
                    <ul class="flex flex-wrap gap-2">
                        {#each social as item}
                            <li class="flex justify-center items-center h-8 w-8 p-1 mb-2 rounded
                                opacity-100 hover:opacity-60
                                {$isDarkMode ? 'bg-white' : 'bg-black'}"
                            >
                                <a href={item.url} target="_blank">
                                    <img 
                                        width={32} 
                                        height={32} 
                                        alt=""
                                        src={$isDarkMode ? item.img.dark : item.img.light} 
                                    />
                                </a>
                            </li>
                        {/each}
                    </ul>
                    <h1 class="text-1xl font-bold mt-2 py-2 
                    text-zinc-600 dark:text-zinc-400 border-t border-t-zinc-200 dark:border-t-zinc-700">
                       Direct Email
                   </h1>
                    <ul>
                        {#each emails as email}
                            <li>
                                <a href={`mailto:${email.url}`} class="flex text-blue-600 hover:underline w-fit">
                                    <img src={$isDarkMode ? emailDark: emailLight} alt="" class="mr-2"/>
                                    {email.url}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/key}
</div>
