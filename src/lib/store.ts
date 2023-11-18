import { writable } from "svelte/store";

const isDrawerOpen = writable(false);
const isScrolled = writable(false);
export { isDrawerOpen, isScrolled }