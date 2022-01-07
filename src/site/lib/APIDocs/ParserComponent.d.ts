interface ComponentProp {
	name: string;
	kind: "let" | "const" | "function";
	constant: boolean;
	type?: string;
	value?: any;
	description?: string;
	isFunction: boolean;
	isFunctionDeclaration: boolean;
	reactive: boolean;
}

const DEFAULT_SLOT_NAME = "Default Slot"

type SlotProps = Record<string, SlotPropValue>;

interface SlotPropValue {
	value?: string;
	replace: boolean;
}

interface ComponentSlot {
	name?: typeof DEFAULT_SLOT_NAME | string;
	default: boolean;
	fallback?: string;
	slot_props?: SlotProps;
}

interface ForwardedEvent {
	type: "forwarded";
	name: string;
	element: ComponentInlineElement | ComponentElement;
}

interface DispatchedEvent {
	type: "dispatched";
	name: string;
	detail?: any;
}

interface TypeDef extends Pick<commentParser.Tag, "type" | "name"> {
	description?: string;
	ts: string;
}

interface ComponentInlineElement {
	type: "InlineComponent";
	name: string;
}

interface ComponentElement {
	type: "Element";
	name: string;
}

type RestProps = undefined | ComponentInlineElement | ComponentElement;

interface Extends {
	interface: string;
	import: string;
}

interface ComponentPropBindings {
	elements: string[];
}

export interface ParsedComponent {
	props: ComponentProp[];
	slots: ComponentSlot[];
	events: (ForwardedEvent | DispatchedEvent)[];
	typedefs: TypeDef[];
	rest_props: RestProps;
	extends?: Extends;
	componentComment?: string;
}
