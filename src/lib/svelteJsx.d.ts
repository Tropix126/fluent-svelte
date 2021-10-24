declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onouterclick?: () => void;
		onoutercontextmenu?: () => void;
		onouterdblclick?: () => void;
		onoutermousedown?: () => void;
		onoutermouseenter?: () => void;
		onoutermouseleave?: () => void;
		onoutermousemove?: () => void;
		onoutermouseout?: () => void;
		onoutermouseover?: () => void;
		onoutermouseup?: () => void;
	}
}
