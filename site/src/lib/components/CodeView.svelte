<script>
    import { HighlightSvelte } from "svelte-highlight";
    
    import { ProgressRing } from "$fluent/ProgressRing";
    import { Button } from "$fluent/Button";
    import { HyperlinkButton } from "$fluent/HyperlinkButton";
    import { onMount } from "svelte";
    
    export let src = "";
    
    let frame;
    let container;
    let rawCode;
    
    onMount(async () => {
        await fetch(`https://api.github.com/repos/tropix126/fluent-svelte/contents/site/src/routes/examples/${src}`);
    });
    
    function copy() {
        navigator.clipboard.writeText(code.trim());
    }
</script>t
<template>
    <div class="CodeView" bind:this={container}>
        <div class="CodeView-preview">
            <iframe bind:this={frame} src="../examples/{src}"></iframe>
        </div>
        {#if rawCode}
            <HighlightSvelte code={rawCode}/>
            {:else}
            <ProgressRing/>
        {/if}
        <footer class="CodeView-footer">
            <div class="CodeView-footer-left">
                <HyperlinkButton>View Raw</HyperlinkButton>
            </div>
            <Button class="CodeView-copy-button" on:click={copy}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5.5028 4.62704L5.5 6.75V17.2542C5.5 19.0491 6.95507 20.5042 8.75 20.5042L17.3663 20.5045C17.0573 21.3782 16.224 22.0042 15.2444 22.0042H8.75C6.12665 22.0042 4 19.8776 4 17.2542V6.75C4 5.76929 4.62745 4.93512 5.5028 4.62704ZM17.75 2C18.9926 2 20 3.00736 20 4.25V17.25C20 18.4926 18.9926 19.5 17.75 19.5H8.75C7.50736 19.5 6.5 18.4926 6.5 17.25V4.25C6.5 3.00736 7.50736 2 8.75 2H17.75ZM17.75 3.5H8.75C8.33579 3.5 8 3.83579 8 4.25V17.25C8 17.6642 8.33579 18 8.75 18H17.75C18.1642 18 18.5 17.6642 18.5 17.25V4.25C18.5 3.83579 18.1642 3.5 17.75 3.5Z" fill="currentColor"/>
                </svg>
            </Button>
        </footer>
    </div>
</template>

<style lang="scss">
    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    .CodeView {
        width: auto;
        max-width: 100%;
        overflow: hidden;
        border-radius: var(--control-corner-radius);
        border: 1px solid var(--CardStrokeColorDefault);
        display: inline-flex;
        flex-direction: column;
        &-preview,
        &-footer,
        :global(code) {
            padding: 16px;
            display: block;
            background-clip: padding-box;
        }
        &-preview {
            gap: 12px;
            overflow: hidden;
            max-width: 100%;
            max-height: 500px;
            background-color: var(--CardBackgroundFillColorDefault);
            iframe {
                border: none;
            }
        }
        :global {
            pre {
                overflow: auto;
                max-height: 400px;
                padding: 0;
                margin: 0;
                white-space: pre;
                display: block;
            }
            code {
                line-height: 1.43;
                letter-spacing: 0.32px;
                font-family: "Cascadia Code", "Consolas", "Courier New", Courier, monospace;
                font-size: 14px;
                overflow: auto;
                border-top: 1px solid var(--CardStrokeColorDefault);
                background-color: var(--CardBackgroundFillColorSecondary);
            }
        }
        &-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--CardBackgroundFillColorSecondary);
            border-top: 1px solid var(--CardStrokeColorDefault);
            &-left {
                display: flex;
                align-items: center;
            }
        }
    }

    :global {
        .theme-dark {
            .CodeView .hljs {
                color: #abb2bf;
                &-comment,
                &-quote {
                    color: #5c6370;
                    font-style: italic;
                }

                &-doctag,
                &-formula,
                &-keyword {
                    color: #c678dd;
                }

                &-deletion,
                &-name,
                &-section,
                &-selector-tag,
                &-subst {
                    color: #e06c75;
                }

                &-literal {
                    color: #56b6c2;
                }

                &-addition,
                &-attribute,
                &-meta-string,
                &-regexp,
                &-string {
                    color: #98c379;
                }

                &-attr,
                &-number,
                &-selector-attr,
                &-selector-class,
                &-selector-pseudo,
                &-template-variable,
                &-type,
                &-variable {
                    color: #d19a66;
                }

                &-bullet,
                &-link,
                &-meta,
                &-selector-id,
                &-symbol,
                &-title {
                    color: #61aeee;
                }

                &-built_in,
                &-class-title,
                &-title.class_ {
                    color: #e6c07b;
                }

                &-emphasis {
                    font-style: italic;
                }

                &-strong {
                    font-weight: 700;
                }

                &-link {
                    text-decoration: underline;
                }
            }
        }

        .theme-light {
            .CodeView .hljs {
                color: #383a42;;
                &-comment,
                &-quote {
                    color: #a0a1a7;
                    font-style: italic;
                }

                &-doctag,
                &-formula,
                &-keyword {
                    color: #a626a4;
                }

                &-deletion,
                &-name,
                &-section,
                &-selector-tag,
                &-subst {
                    color: #e45649;
                }

                &-literal {
                    color: #0184bb;
                }

                &-addition,
                &-attribute,
                &-meta &-string,
                &-regexp,
                &-string {
                    color: #50a14f;
                }

                &-attr,
                &-number,
                &-selector-attr,
                &-selector-class,
                &-selector-pseudo,
                &-template-variable,
                &-type,&-variable {
                    color: #986801;
                }

                &-bullet,
                &-link,
                &-meta,
                &-selector-id,
                &-symbol,
                &-title {
                    color: #4078f2;
                }

                &-built_in,
                &-class &-title,
                &-title.class_ {
                    color: #c18401;
                }

                &-emphasis {
                    font-style: italic;
                }

                &-strong {
                    font-weight: 700;
                }

                &-link {
                    text-decoration: underline;
                }
            }
        }
    }
</style>