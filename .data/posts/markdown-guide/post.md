---
title: A quick guide to markdown format
date: 11/13/2023
description: Learn or revisit the basics of markdown.
tags: [ Info ]
---

#### Italic
```markdown
I am *italic* text
```

I am *italic* text

#### Bold
```markdown
I am **bold** text
```

I am **bold** text

#### Striked
```markdown
I am ~~striked~~ text
```

I am ~~striked~~ text

#### Mixed
```markdown
I am ~\~\*\*\*italic, bold and striked\*\*\*~\~ text
```

I am ~~***italic, bold and striked***~~ text

#### Headings
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

<h1 style="margin:0">Heading 1</h1>
<h2 style="margin:0">Heading 2</h2>
<h3 style="margin:0">Heading 3</h3>
<h4 style="margin:0">Heading 4</h4>
<h5 style="margin:0">Heading 5</h5>
<h6 style="margin:0">Heading 6</h6>

#### Blockquotes
```markdown
> Blockquotes allow for easy quoting of text.
```

> Blockquotes allow for easy quoting of text.

#### Ordered List
```markdown
1. Item 1
2. Item 2
    1. Subitem A
    2. Subitem B
```

1. First item
2. Second item
   1. Subitem 1
   2. Subitem 2


#### Unordered List
```markdown
- Item 1
- Item 2
  - Subitem A
  - Subitem B
```

- Item 1
- Item 2
  - Subitem A
  - Subitem B

#### Links

Quick:
```markdown
<http://www.example.com>
```

<http://www.example.com>

With text:
```markdown
[Example.com](http://www.example.com)
```

[Example.com](http://www.example.com)

With emphasis:
```markdown
*[Example.com](http://www.example.com)*
```
*[Example.com](http://www.example.com)*

#### Images

<br/>

Relative:
```markdown
![Minion](minion.jpg)
```
<img alt="Minion" src="minion.jpg" style="width:150px">

External:

```markdown
![Minion](https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png)
```
<img alt="Minions" src="https://upload.wikimedia.org/wikipedia/en/7/7d/Minions_characters.png" style="width:150px">

#### Tables
```markdown
| Name | Age | Location |
|---:|:---:|:---|
| Alice | 25 | New York |
| Bob | 30 | San Francisco |
```

| Name | Age | Location |
|:---|:---:|---:|
| Alice | 25 | New York |
| Bob | 30 | San Francisco |

#### Codeblocks
```
\`\`\`javascript
function greet() {
  console.log("Hello, Markdown!");
}
\`\`\`
```

```javascript
function greet() {
  console.log("Hello, Markdown!");
}
```

#### Seperator
```markdown
---
```
renders:

---

### Wrapping Up

Just as a reminder, remember that markdown requires empty lines (spaces) after some elements to render
properly. Tags like headings(#) require a space between the decorator and the content. Emphasis tags do not require a space. If you have something that doesn't render correctly, check your syntax.

This was meant to be just a quick guide to markdown. You can visit the following resources to explore
the basic syntax in more depth, or check out the more extended syntax.

<https://en.wikipedia.org/wiki/Markdown>

<https://www.markdownguide.org/>

