/**
 * This is a modified version of mdsvex-relative-images by Matt Jennings
 * https://www.npmjs.com/package/mdsvex-relative-images
 * Also credit to pngwn from mdsvex
 */


// @ts-nocheck
import { visit } from "unist-util-visit";
import toCamel from "just-camel-case";

const RE_SCRIPT_START = /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/;
const RE_SRC = /src\s*=\s*"(.+?)"/;

export default function relativeImages() {
    return function transformer(tree) {
        const urls = new Map();
        const url_count = new Map();

        function transformUrl(url) {
            url = decodeURIComponent(url)

            const isExternalURL = /^(https?|ftp):\/\//i.test(url);

            if (!isExternalURL) {
                if (!url.startsWith("./")) {
                    url = "./" + url
                }

                let camel = `_${toCamel(url)}`;
                const count = url_count.get(camel);
                const dupe = urls.get(url);

                if (count && !dupe) {
                    url_count.set(camel, count + 1);
                    camel = `${camel}_${count}`;
                } else if (!dupe) {
                    url_count.set(camel, 1);
                }

                urls.set(url, {
                    path: url,
                    id: camel,
                });

                return `{${camel}}`;
            }

            return url;
        }

        visit(tree, ["image", "definition"], (node) => {
            node.url = transformUrl(node.url);
        });

        visit(tree, "html", (node) => {
            const isSupportedElement = node.value && node.value.match(/img|video/);

            if (isSupportedElement) {
                const [, url] = node.value.match(RE_SRC) ?? [];
                if (url) {
                    const transformed = transformUrl(url);
                    node.value = node.value.replace(`"${url}"`, transformed);
                }
            }
        });

        let scripts = "";
        urls.forEach((x) => (scripts += `import ${x.id} from "${x.path}";\n`));

        let is_script = false;

        visit(tree, "html", (node) => {
            if (RE_SCRIPT_START.test(node.value)) {
                is_script = true;
                node.value = node.value.replace(RE_SCRIPT_START, (script) => {
                    return `${script}\n${scripts}`;
                });
            }
        });

        if (!is_script) {
            tree.children.push({
                type: "html",
                value: `<script>\n${scripts}</script>`,
            });
        }
    };
}