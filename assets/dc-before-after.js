if (!customElements.get('dc-before-after')) {
	class DCBeforeAfter extends HTMLElement {
		constructor() {
			super()

			this.inputRange = this.querySelector('[data-range]')

			this.inputRange.addEventListener('input', window.debounce(this.handleInputChange.bind(this), 10))
		}

		handleInputChange() {
			this.style.setProperty('--dc-before-after-range', `${this.inputRange.value}%`)
		}
	}

	customElements.define('dc-before-after', DCBeforeAfter)
}

