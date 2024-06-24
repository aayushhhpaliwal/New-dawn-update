if (!customElements.get('dc-category-carousel')) {
	customElements.define(
		'dc-category-carousel',
		class DCCategoryCarousel extends HTMLElement {
			constructor() {
				super()

				this.setupCarousel()
			}

			setupCarousel() {
				if (!window.Flickity) return

				this.sectionId = this.dataset.section
				const categoryCarousel = this.querySelector('[data-carousel]')

				this.classList.remove('hidden')

				this.flickity = new window.Flickity(categoryCarousel, {
					cellAlign: 'center',
					contain: true,

					prevNextButtons: false,
					adaptiveHeight: true,
					pageDots: false,
					autoPlay: false,
				})

				// Setup navigation data
				this.navigationPrev = document.getElementById(`NavigationPrev-${this.sectionId}`)
				this.navigationNext = document.getElementById(`NavigationNext-${this.sectionId}`)

				if (this.navigationPrev) {
					this.navigationPrev.removeAttribute('disabled')
					this.navigationPrev.addEventListener('click', () => {
						this.flickity.previous()
					})
				}

				if (this.navigationNext) {
					this.navigationNext.removeAttribute('disabled')
					this.navigationNext.addEventListener('click', () => {
						this.flickity.next()
					})
				}
			}
		}
	)
}

