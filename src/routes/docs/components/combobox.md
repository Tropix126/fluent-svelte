<script lang="ts">
    import { ComboBox, Button, InfoBar } from "$lib";
    import { Showcase, APIDocs } from "$site/lib";

    import data from "$lib/ComboBox/ComboBox.svelte?sveld&raw";
</script>

A combo box (also known as a drop-down list) is used to present a list of items that a user can select from. A combo box starts in a compact state and expands to show a list of selectable items. 


```ts
import { ComboBox } from "fluent-svelte";
```

<Showcase columns={3} repl="todo">
    <ComboBox placeholder="ComboBox" items={[
        { name: "Option 1", value: "option-1" },
        { name: "Option 2 (Disabled)", value: "option-2", disabled: true },
        { name: "Option 3", value: "option-3" }
    ]} />
    <ComboBox value="default" items={[
        { name: "Default Value", value: "default" },
        { name: "Option 1", value: "option-1" },
        { name: "Option 2 (Disabled)", value: "option-2", disabled: true },
        { name: "Option 3", value: "option-3" }
    ]} />
    <ComboBox placeholder="ComboBox" disabled />
    <ComboBox placeholder="ComboBox (Editable)" editable items={[
        { name: "Option 1", value: "option-1" },
        { name: "Option 2 (Disabled)", value: "option-2", disabled: true },
        { name: "Option 3", value: "option-3" }
    ]} />
    <ComboBox value="Default Value" editable items={[
        { name: "Default Value", value: "default" },
        { name: "Option 1", value: "option-1" },
        { name: "Option 2 (Disabled)", value: "option-2", disabled: true },
        { name: "Option 3", value: "option-3" }
    ]} />
    <ComboBox placeholder="ComboBox (editable)" editable disabled />
</Showcase>

## Usage

todo

## Component API

<APIDocs {data} />
