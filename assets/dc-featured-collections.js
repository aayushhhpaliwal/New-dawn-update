if (!customElements.get('d-featured-collection')) {
	customElements.define(
		'd-featured-collection',
		class SectionCustomerReviews extends HTMLElement {
			constructor() {
				super()
			}

			connectedCallback() {
				if (!window.Flickity) return

				const carouselContainer = this.querySelector('[data-carousel]')
        const slides = carouselContainer.querySelectorAll('[data-slide]')

        slides.forEach(slide => slide.classList.remove('hidden'))

				let flickity = new window.Flickity(carouselContainer, {
					cellAlign: 'center',
					contain: true,
					prevNextButtons: false,
					adaptiveHeight: true,
					pageDots: false,
					autoPlay: false,
					wrapAround: true,
				})
			}
		}
	)
}

