if (!customElements.get('dc-recent-views')) {
	customElements.define(
		'dc-recent-views',
		class DCRecentViews extends HTMLElement {
			constructor() {
				super()

				window.initLazyScript(this, this.init.bind(this))
			}

			async init() {
				const recentViewsLocalStorage = localStorage.getItem('dc-recent-views')
				if (!recentViewsLocalStorage) {
					this.parentElement.remove()

					return
				}

				this.productsContainer = this.querySelector('[data-products]')
				const recentViewHandles = (recentViewsLocalStorage || []).split('$**$')

				await Promise.all(
					recentViewHandles.map(async (recentViewHandle) => {
						fetch(`${recentViewHandle}?section_id=ajax-recent-view`)
							.then((response) => response.text())
							.then((html) => {
								const productCard = this.getSectionDOM(html, '[data-product]')

								if (productCard)
									this.productsContainer.insertAdjacentHTML(
										'beforeend',
										`<li class="grid__item">${productCard.outerHTML}</li>`
									)
							})
					})
				)
			}

			getSectionDOM(html, selector = '.shopify-section') {
				return new DOMParser().parseFromString(html, 'text/html').querySelector(selector)
			}
		}
	)
}

