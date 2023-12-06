export class PageMetricsElement extends HTMLElement {
	static {
		this.styleSheet = new CSSStyleSheet();
		this.styleSheet.replaceSync(`
			@layer styles {
				:host {
					display: none;
					max-height: 100lvh;
					min-height: 100svh;
				}
			}
			
			:host {
				all: revert-layer !important;
			}
		`);
	}
	
	get smallViewportHeight() {
		return Math.round(this.computedStyle.minHeight.slice(0, -2));
	}

	get largeViewportHeight() {
		return Math.round(this.computedStyle.maxHeight.slice(0, -2));
	}

	get ADDRESS_BAR_COLLAPSED() { return "collapsed"; }
	get ADDRESS_BAR_EXPANDED() { return "expanded"; }
	get ADDRESS_BAR_RESIZING() { return "resizing"; }

	#addressBarState = this.ADDRESS_BAR_EXPANDED;

	get addressBarState() {
		return this.#addressBarState;
	}
	
	connectedCallback() {
		if (!this.shadowRoot) {
			this.attachShadow({ mode: "open" });
			this.shadowRoot.adoptedStyleSheets = [this.constructor.styleSheet];
		}
		this.computedStyle = window.getComputedStyle(this);
		
		window.visualViewport.addEventListener("resize", this);
	}

	handleEvent(event) {
		if (event.type === "resize") {
			if (Math.round(event.target.height) === this.largeViewportHeight) {
				this.#addressBarState = this.ADDRESS_BAR_COLLAPSED;
			} else if (Math.round(event.target.height) === this.smallViewportHeight) {
				this.#addressBarState = this.ADDRESS_BAR_EXPANDED;
			} else {
				this.#addressBarState = this.ADDRESS_BAR_RESIZING;
			}
		}
	}
	
	static define(tagName = "page-metrics") {
		if (!window.customElements.get(tagName)) {
			window[this.name] = this;
			window.customElements.define(tagName, this);
		}
	}
}
