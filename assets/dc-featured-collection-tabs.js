if (!customElements.get('featured-collection-tabs')) {
	class FeaturedCollectionTabs extends HTMLElement {
		constructor() {
			super()

			this.toggleTabs()
		}

		toggleTabs() {
			this.tabs = this.querySelectorAll('[data-tab]')
			this.collections = this.querySelectorAll('[data-collection]')

			this.tabs.forEach((tab) => {
				tab.addEventListener('click', () => {
					const blockId = tab.dataset.tab

					this.tabs.forEach((__tab) => {
						tab != __tab ? __tab.classList.remove('is-active') : __tab.classList.add('is-active')
					})

					this.collections.forEach((collection) => {
						collection.dataset.collection == blockId
							? collection.classList.add('is-active')
							: collection.classList.remove('is-active')
					})
				})
			})
		}
	}

	customElements.define('featured-collection-tabs', FeaturedCollectionTabs)
}

