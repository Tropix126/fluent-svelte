<script>
    import { page } from "$app/stores"
    import { TextBox } from "$fluent/TextBox";
    import { ListViewItem } from "$fluent/ListView";

    const docsMap = [
        {
            "name": "Button",
            "path": "/docs/button"
        },
        {
            "name": "CheckBox",
            "path": "/docs/checkbox"
        },
        {
            "name": "HyperlinkButton",
            "path": "/docs/hyperlinkbutton"
        },
        {
            "name": "InfoBar",
            "path": "/docs/InfoBar"
        },
        {
            "name": "ListView",
            "path": "/docs/listview"
        },
        {
            "name": "ProgressRing",
            "path": "/docs/progressring"
        },
        {
            "name": "RadioButton",
            "path": "/docs/radiobutton"
        },
        {
            "name": "TextBox",
            "path": "/docs/textbox"
        },
        {
            "name": "ToggleSwitch",
            "path": "/docs/toggleswitch"
        }
    ]
</script>

<template>
    <div class="docs-container">
        <aside>
            <TextBox placeholder="Search controls" type="search" />
            <hr />
            {#each docsMap as docsPage}
                <a class="docs-item-wrap" href={docsPage.path}>
                    <ListViewItem selected={$page.path === docsPage.path}>{docsPage.name}</ListViewItem>
                </a>
            {/each}
        </aside>
        <slot/>
    </div>
</template>

<style lang="scss" global>
    .docs-container {
        display: flex;
        overflow: auto;
        max-height: 100%;
        aside {
            flex: 0 0 auto;
            position: sticky;
            top: 0;
            padding: 8px 5px;
            width: 298px;
            background-color: var(--background-primary);
            hr {
                margin: 0 auto;
                margin-left: 8px;
                width: calc(100% - 16px);
                margin-top: 12px;
                padding-top: 12px;
                border: none;
                border-top: 1px solid var(--DividerStrokeColorDefault);
            }
            .textbox-underline-frame {
                margin: 0 auto;
                width: calc(100% - 18px);
                margin-top: 8px;
            }
            &.sidebar-right {
                display: flex;
                flex-direction: column;
                width: 248px;
                padding-top: 24px;
                >* {
                    width: fit-content;
                }
                h5 {
                    margin: 0;
                    margin-top: 48px;
                    margin-bottom: 12px;
                    font-size: 22px;
                    font-weight: 500;
                    color: var(--text-color-primary);
                    &:first-child {
                        margin-top: 0;
                    }
                }
            }
        }

        article {
            padding: 30px 64px;
            display: block;
            flex: 1 1 auto;
        }
    }
    .docs-item-wrap {
        text-decoration: none;
        display: contents;
    }

    @media screen and (max-width: 1024px) {
        .docs-sidebar-right {
            display: none;
        }
    }
</style>