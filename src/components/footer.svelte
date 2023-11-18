<script lang="ts">
    import { name, brand } from "../../.data/site";
    import { social } from "../../.data/contact";
</script>

<footer class="w-full py-7 bg-white border-t border-gray-300 relative">
    <div class="absolute top-1/2 -translate-y-1/2 left-0 ml-5">
        <a href="/" class="flex hover:scale-105 transition duration-300 ease-in-out">
            <img src={brand} width={15} height={20} alt=""/>
            <span class="ml-2 font-bold">
                {name}
            </span>
        </a>
    </div>

    <div class="absolute top-1/2 -translate-y-1/2 right-0 mr-5">
        <ul class="flex flex-wrap gap-2">
            {#each social as item}
                <li class="flex justify-center items-center h-6 w-6 p-1 opacity-100 hover:opacity-60 transition duration-300 bg-black rounded">
                    <a href={item.url}>
                        <img src={item.img} width={20} height={20} alt=""/>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</footer>

