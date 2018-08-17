!function () {
  var view = document.querySelector('nav.menu')
  var controller = function (view) {
    let aTags = view.querySelectorAll('nav > ul > li > a')
    function animate (time) {
      requestAnimationFrame(animate)
      TWEEN.update(time)
    }
    requestAnimationFrame(animate)

    for (let i = 0; i < aTags.length; i++) {
      aTags[i].onclick = function (x) {
        x.preventDefault()
        let a = x.currentTarget
        let href = a.getAttribute('href')
        let element = document.querySelector(href)
        let top = element.offsetTop

        let currentTop = window.scrollY
        let targetTop = top - 75
        let coords = {y: currentTop}
        s = targetTop - currentTop
        t = Math.abs(s / 100 * 300)
        if (t > 500) {t = 500}
        var tween = new TWEEN.Tween(coords) // 起始位置
          .to({ y: targetTop}, t) // 结束位置 和 时间
          .easing(TWEEN.Easing.Cubic.InOut) // 缓动类型
          .onUpdate(function () {
            // coords.y 已经变了
            window.scrollTo(0, coords.y) // 如何更新界面
          })
          .start(); // 开始缓动
      }
    }
  }
  controller(view)
}.call()
