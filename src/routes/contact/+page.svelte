<svelte:head>
    <title>{name} | Contact</title>
    <meta name="description" content={`How to contact ${name}`}>
</svelte:head>

<script lang="ts">
    import { name } from "../../../.data/site";
    import { heading, subheading, social, emails } from "../../../.data/contact";
    
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    
    import emailIcon from "$lib/img/email.svg";
    
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
                const result = await response.json();
                form = initializeForm();
                resetTextArea()
                isSuccessful = true;
            } else {
                const errors = await response.json();
                console.log('errors',errors);
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
            <h1 class="text-4xl font-bold">
                {heading}
            </h1>
            <p class="py-4">
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
                            Your email was sent successfully.
                        </div>
                    {/if}
                    {#if isServerError}
                        <div class="bg-red-200 text-red-700 border-red-400 border rounded p-5 mb-4">
                            An error occured: {serverMessage}
                        </div>
                    {/if}
                    <div class="flex flex-col gap-1">
                        <label for="name">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            autocomplete="name"
                            placeholder="John Doe" 
                            maxlength="100" 
                            disabled={isSubmitting} 
                            bind:value={form.name.value} 
                            on:input={onInput}
                            class=" w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1"
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
                        <label for="email">Email</label>
                        <input 
                            id="email" 
                            type="text"
                            autocomplete="email"
                            placeholder="johndoe@acme.com"
                            maxlength="100" 
                            disabled={isSubmitting} 
                            bind:value={form.email.value} 
                            on:input={onInput}
                            class="w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1" 
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
                        <label for="subject">Subject</label>
                        <input 
                            id="subject" 
                            type="text" 
                            autocomplete="off"
                            placeholder="Enter a subject"
                            maxlength="100" 
                            disabled={isSubmitting} 
                            bind:value={form.subject.value} 
                            on:input={onInput}
                            class="w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1"
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
                        <label for="message">Message</label>
                        <textarea 
                            id="message"
                            autocomplete="off"
                            placeholder="Enter a message"
                            disabled={isSubmitting} 
                            bind:value={form.message.value} 
                            on:input={onTextAreaInput}
                            class="w-full border rounded border-gray-300 outline-none focus:border-gray-600 ring-0 ring-gray-300 focus:ring-4 p-1 resize-none" 
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
                                <a href={item.url} target="_blank">
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
    {/key}
</div>
