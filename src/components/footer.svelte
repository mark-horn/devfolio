<script lang="ts">
    import { name, brand } from "../../.data/site";
    import { social } from "../../.data/contact";
    import { isDarkMode } from "$lib/store";
    import Theme from "./theme.svelte";
</script>

<footer class="w-full py-7 relative border-t border-t-zinc-300 dark:border-t-zinc-700">
    <div class="absolute top-1/2 -translate-y-1/2 left-0 ml-5 ">
        <a href="/" class="footerBrandLink flex hover:scale-105 ease-in-out">
            <img 
                class="brandImage"
                width={15} 
                height={20} 
                alt="" 
                src={$isDarkMode ? brand.dark : brand.light} 
            />
            <h5 class="ml-2 font-bold text-black dark:text-white">
                {name}
            </h5>
        </a>
    </div>
    
    <div class="absolute top-1/2 -translate-y-1/2 right-0 mr-5">
        <Theme/>
    </div>
</footer>