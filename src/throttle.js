/**
 * 节流函数
 *（第一次立即执行，delay 时间内必须执行一次）
 *
 * @param  {Function} fn 需要节流的函数
 * @param  {Number} delay=150 设置节流的时间间隔（单位：毫秒）
 * @return {Function} 返回一个节流函数，可被事件调用
 *
 * e.g.
 * let fnThrottle = throttle(fun, delay)
 * document.addEventListener('scroll', fnThrottle)
 */
export default function throttle (fn, delay = 150) {
	let now, lastExec, timer, context, args

	let execute = function () {
		lastExec = now
		return fn.apply(context, args)
	}

	return function () {
		context = this
		args = arguments

		now = Date.now()

		if (timer) {
			clearTimeout(timer)
			timer = null
		}

		if (lastExec) {
			let diff = delay - (now - lastExec)
			// console.log('diff: ', diff)
			if (diff < 0) {
				return execute()
			} else {
				timer = setTimeout(() => {
					return execute()
				}, diff)
			}
		} else {
			return execute()
		}
	}
}
