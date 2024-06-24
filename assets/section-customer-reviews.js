if (!customElements.get('section-customer-reviews')) {
	customElements.define(
		'section-customer-reviews',
		class SectionCustomerReviews extends HTMLElement {
			constructor() {
				super()
			}

			connectedCallback() {
				if (!window.Flickity) return

				const customerReviewsCarousel = this.querySelector('.js-carousel')

				let isPaused = false
				let tickerSpeed = 2

				let flickity = new Flickity(customerReviewsCarousel, {
					cellAlign: 'left',
					contain: true,
					prevNextButtons: false,
					adaptiveHeight: true,
					pageDots: false,
					autoPlay: false,
					wrapAround: true,
					selectedAttraction: 0.015,
					friction: 0.25,
					draggable: true,
				})

				// Setup auto run
				const update = () => {
					if (isPaused) return
					if (flickity.slides) {
						flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth
						flickity.selectedIndex = flickity.dragEndRestingSelect()
						flickity.updateSelectedSlide()
						flickity.settle(flickity.x)
					}

					window.requestAnimationFrame(update)
				}

				const pause = () => {
					isPaused = true
				}

				const play = () => {
					if (isPaused) {
						isPaused = false
						window.requestAnimationFrame(update)
					}
				}

				customerReviewsCarousel.addEventListener('mouseenter', pause, false)
				customerReviewsCarousel.addEventListener('focusin', pause, false)
				customerReviewsCarousel.addEventListener('mouseleave', play, false)
				customerReviewsCarousel.addEventListener('focusout', play, false)

				flickity.on('dragStart', () => {
					isPaused = true
				})

				update()
			}
		}
	)
}

