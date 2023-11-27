import { writable } from "svelte/store";
import { browser } from "$app/environment";

const isDrawerOpen = writable(false);
const isScrolled = writable(false);

let tempIsDarkMode = false;
let tempTheme = 'system;'

if (browser) {
    tempTheme = localStorage.theme || 'system';
    tempIsDarkMode = (localStorage.theme === 'dark' || (localStorage.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches));
}

const currentTheme = writable(tempTheme);
const isDarkMode = writable(tempIsDarkMode);

export { isDrawerOpen, isScrolled, isDarkMode, currentTheme }