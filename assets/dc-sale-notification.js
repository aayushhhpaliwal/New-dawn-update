if (!customElements.get('dc-sale-notification')) {
	customElements.define(
		'dc-sale-notification',
		class DCSaleNotification extends HTMLElement {
			constructor() {
				super()

				const button = this.querySelector('button')

				if (!button) return
				button.addEventListener('click', () => {
					const modal = document.querySelector(this.getAttribute('data-modal'))

					if (modal) modal.show(button)
				})
			}
		}
	)
}

