if (!customElements.get('dc-shop-the-look')) {
	customElements.define(
		'dc-shop-the-look',
		class DCShopTheLook extends HTMLElement {
			constructor() {
				super()

				this.setupCarousel()
			}

			setupCarousel() {
				if (!window.Flickity) return

				const productCarousel = this.querySelector('.js-product-carousel')

				let flickity = new window.Flickity(productCarousel, {
					cellAlign: 'left',
					contain: true,
					pageDots: false,
					adaptiveHeight: true,
					prevNextButtons: true,
				})
			}
		}
	)
}

