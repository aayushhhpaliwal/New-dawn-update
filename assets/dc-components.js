/*****************************************************************
 *                      LTA COLLAPSIBLE TAB                      *
 ****************************************************************/
if (!customElements.get('dc-collapsible-tab')) {
	class DCCollapsibleTab extends HTMLElement {
		constructor() {
			super()

			window.initLazyScript(this, this.init.bind(this))
		}

		init() {
			// Setup default
			this.collapsibleContainer = this.closest('[data-collapsible-container]')
			this.trigger = this.querySelector('[data-trigger]')
			this.content = this.querySelector('[data-content]')

			if (!this.trigger || !this.content) return

			this.expandedClass = 'is-expanded'
			this.collapsedClass = 'is-collapsed'
			this.collapsedHeight = '0px'
			this.oneAtATime = this.dataset.oneOpen === 'true' || false

			// Set default height to trigger animate in the first time
			this.classList.contains('is-open')
				? (this.content.style.height = this.content.scrollHeight + 'px')
				: (this.content.style.height = '0px')

			// Setup events
			this.trigger.addEventListener('click', () => {
				this.classList.contains('is-open') ? this.close() : this.open()
			})
		}

		open() {
			this.classList.add('is-open')
			this.content.classList.remove('hidden')

			requestAnimationFrame(() => {
				this.content.style.height = this.content.scrollHeight + 'px'
			})

			this.setExpandedAria()
			this.trigger.focus()

			this.closeOtherTabs()
		}

		close() {
			this.classList.remove('is-open')
			this.content.style.height = '0px'

			window.debounce(() => {
				this.content.classList.add('hidden')
			}, 400)()

			this.setCollapsedAria()
		}

		closeOtherTabs() {
			if (!this.collapsibleContainer) return

			this.otherTabs = this.otherTabs || this.collapsibleContainer.querySelectorAll('dc-collapsible-tab')

			this.otherTabs.forEach((tab) => {
				if (tab != this) tab?.close?.()
			})
		}

		setExpandedAria() {
			this.trigger.setAttribute('aria-expanded', 'true')
			this.content.setAttribute('aria-hidden', 'false')
		}

		setCollapsedAria() {
			this.trigger.setAttribute('aria-expanded', 'false')
			this.content.setAttribute('aria-hidden', 'true')
		}
	}

	customElements.define('dc-collapsible-tab', DCCollapsibleTab)
}

/*****************************************************************
 *                      LTA TABS                                 *
 ****************************************************************/

if (!customElements.get('dc-tabs')) {
	class DCTabs extends HTMLElement {
		constructor() {
			super()

			window.initLazyScript(this, this.init.bind(this))
		}

		init() {
			// Setup default
			this.tabs = this.querySelectorAll('[data-tab]')
			this.contents = this.querySelectorAll('[data-content]')

			this.expandedClass = 'is-expanded'
			this.collapsedClass = 'is-collapsed'
			this.collapsedHeight = '0px'

			// Setup events
			this.tabs.forEach((tab) => {
				tab.addEventListener('click', () => {
					const tabId = tab.dataset.tab

					this.tabs.forEach((currentTab) => {
						currentTab == tab ? currentTab.classList.add('is-active') : currentTab.classList.remove('is-active')
					})

					this.contents.forEach((content) => {
						const contentId = content.dataset.content
						contentId == tabId ? content.classList.remove('hidden') : content.classList.add('hidden')
					})
				})
			})
		}

		setExpandedAria() {
			this.trigger.setAttribute('aria-expanded', 'true')
			this.content.setAttribute('aria-hidden', 'false')
		}

		setCollapsedAria() {
			this.trigger.setAttribute('aria-expanded', 'false')
			this.content.setAttribute('aria-hidden', 'true')
		}
	}

	customElements.define('dc-tabs', DCTabs)
}

/****************************************************************
 *                      DC COUNTDOWN                            *
 ****************************************************************/

if (!customElements.get('dc-count-down')) {
	class DCCountDown extends HTMLElement {
		constructor() {
			super()

			this.endDate = new Date(this.dataset.endDate).getTime()

			if (!Number(this.endDate)) return

			window.initLazyScript(this, this.init.bind(this))
		}

		init() {
			this.daysEl = this.querySelector('.js-days')
			this.hoursEl = this.querySelector('.js-hours')
			this.minsEl = this.querySelector('.js-mins')
			this.secsEl = this.querySelector('.js-secs')

			this.second = 1000
			this.minute = 60 * this.second
			this.hour = 60 * this.minute
			this.day = 24 * this.hour

			this.timer()
			this.interval = setInterval(this.timer.bind(this), this.second)
		}

		timer() {
			const timeDiff = this.endDate - new Date()

			if (timeDiff < 0) {
				clearInterval(this.interval)

				return
			}

			const days = Math.floor(timeDiff / this.day)
			const hours = Math.floor(timeDiff / this.hour)
			const mins = Math.floor(timeDiff / this.minute)
			const secs = Math.floor(timeDiff / this.second)

			this.daysEl.textContent = days
			this.hoursEl.textContent = hours - days * 24
			this.minsEl.textContent = mins - hours * 60
			this.secsEl.textContent = secs - mins * 60
		}
	}

	customElements.define('dc-count-down', DCCountDown)
}

