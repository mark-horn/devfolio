<script lang="ts">
    export let data;

    import "@fontsource/inter";
    import "@fontsource/inter/600.css";
    import "@fontsource/fira-mono";
    import "../css/style.css";
    import "../css/markdown.css";
    import "../css/github-code-highlight.css";

    import { browser } from "$app/environment";
    import { beforeNavigate } from "$app/navigation";
    import { isScrolled } from "$lib/store";
    import { circInOut } from "svelte/easing";

    import Header from "../components/header.svelte";
    import Footer from "../components/footer.svelte";
    import Drawer from "../components/drawer.svelte";

    let direction = 1;
    const duration = 1000;
    const easing = circInOut;

    const order = [
        "/",
        "/about",
        "/projects",
        "/projects/[slug]",
        "/posts",
        "/posts/[slug]",
        "/contact",
    ];

    beforeNavigate(({ to, from }) => {
        if (!to || !to.route.id) return;
        if (!from || !from.route.id) return;
        if (to.route.id === from.route.id) return;
        const tidx = order.indexOf(to.route.id);
        const fidx = order.indexOf(from.route.id);
        direction = tidx < fidx ? -1 : 1;
    });

    function slideIn(node: HTMLElement) {
        return {
            easing,
            duration,
            css: (t: number, u: number) => `
                transform: translateX(${u * direction * 100}%)`,
        };
    }

    function foldOut(node: HTMLElement) {
        const opacity: number = Number(getComputedStyle(node).opacity);
        return {
            easing,
            duration,
            css: (t: number, u: number) => `
                opacity: ${t * opacity};
                transform: translateX(${u * -(direction * 100)}%) rotateY(${u * -(direction * 90)}deg);
                transform-origin: ${direction < 0 ? "left center" : "right center"};`,
        };
    }

    function onPageScroll() {
        if (!browser) return;
        const page = document.getElementById("page");
        if (page) {
            isScrolled.update((value) => page.scrollTop > 0);
        }
    }
</script>

<div 
    id="app" 
    class="fixed top-0 left-0 bottom-0 right-0 bg-black"
>
    {#key data.pathname}
        <main
            id="main"
            in:slideIn
            out:foldOut
            class="fixed z-10 top-0 left-0 bottom-0 right-0"
        >
            <div
                id="page"
                on:scroll={onPageScroll}
                class="w-full h-full overflow-y-scroll bg-white flex flex-col"
            >
                <Header />
                <Drawer />
                <div class="flex-1">
                    <slot />
                </div>
                {#if data.pathname !== "/"}
                    <Footer />
                {/if}
            </div>
        </main>
    {/key}
</div>

<style>
    #app {
        perspective: 960px; /* Tailwind doesn't support perspective inline */
    }
</style>
