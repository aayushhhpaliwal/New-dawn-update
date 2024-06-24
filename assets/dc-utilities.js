/* ***************************
 * LOAD ASSETS
 * ***************************/
function loadJS(src, container = document.body, async = false, defer = true) {
	return new Promise((resolve, reject) => {
		const ownerDocument = container.ownerDocument
		const existScript = ownerDocument.querySelector(`script[src="${src}"]`)

		if (existScript) {
			return existScript.dataset.loaded
				? resolve(true)
				: void existScript.addEventListener('load', () => {
						existScript.dataset.loaded = true
						resolve(true)
				  })
		}

		const newScript = ownerDocument.createElement('script')
		newScript.src = src
		newScript.async = async
		newScript.defer = defer

		newScript.addEventListener('load', () => {
			newScript.dataset.loaded = true
			resolve(true)
		})

		newScript.onerror = reject
		container.appendChild(newScript)
	})
}

function loadCSS(src, container = document.head) {
	return new Promise((resolve, reject) => {
		const ownerDocument = container.ownerDocument
		const stylesheet = ownerDocument.querySelector(`link[href="${src}"]`)

		if (stylesheet) {
			return stylesheet.dataset.loaded
				? resolve(true)
				: void stylesheet.addEventListener('load', () => {
						stylesheet.dataset.loaded = true
						resolve(true)
				  })
		}

		const newStylesheet = ownerDocument.createElement('link')
		newStylesheet.rel = 'stylesheet'
		newStylesheet.href = src

		newStylesheet.addEventListener('load', () => {
			newStylesheet.dataset.loaded = true
			resolve(true)
		})

		newStylesheet.onerror = reject
		container.appendChild(newStylesheet)
	})
}

function initLazyScript(element, callback, threshold = 500) {
	if ('IntersectionObserver' in window) {
		const io = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (typeof callback === 'function') {
							callback()
							observer.unobserve(entry.target)
						}
					}
				})
			},
			{ rootMargin: `0px 0px ${threshold}px 0px` }
		)

		io.observe(element)
	} else {
		callback()
	}
}

/* ***************************
 * FORMAT MONEY
 * ***************************/
function formatMoney(cents, format = '') {
	let value = ''
	const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/
	const formatString = format || '${{amount}}'

	if (typeof cents == 'string') {
		cents = cents.replace('.', '')
	}

	function defaultOption(opt, def) {
		return typeof opt == 'undefined' ? def : opt
	}

	function formatWithDelimiters(number, precision, thousands, decimal) {
		precision = defaultOption(precision, 2)
		thousands = defaultOption(thousands, ',')
		decimal = defaultOption(decimal, '.')

		if (isNaN(number) || number == null) {
			return 0
		}

		number = (number / 100.0).toFixed(precision)

		var parts = number.split('.'),
			dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
			cents = parts[1] ? decimal + parts[1] : ''

		return dollars + cents
	}

	switch (formatString.match(placeholderRegex)[1]) {
		case 'amount':
			value = formatWithDelimiters(cents, 2)
			break
		case 'amount_no_decimals':
			value = formatWithDelimiters(cents, 0, ' ', '.')
			break
		case 'amount_with_comma_separator':
			value = formatWithDelimiters(cents, 2, '.', '.')
			break
		case 'amount_no_decimals_with_comma_separator':
			value = formatWithDelimiters(cents, 0, '.', '.')
			break
	}

	return formatString.replace(placeholderRegex, value)
}

/* ***************************
 * DOM / ELEMENT UTILITIES
 * ***************************/
function isInViewport(elem) {
	const rect = elem.getBoundingClientRect()

	return (
		Math.round(rect.top) >= 0 &&
		Math.round(rect.left) >= 0 &&
		Math.round(rect.bottom) <= (window.innerHeight || document.documentElement.clientHeight) &&
		Math.round(rect.right) <= (window.innerWidth || document.documentElement.clientWidth)
	)
}

