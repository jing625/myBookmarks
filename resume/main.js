setTimeout(function () {
siteWelcome.classList.remove('active')
}, 1100)

let specialTags = document.querySelectorAll('[data-x]')
for (let i = 0;i < specialTags.length;i++) {
    console.log(specialTags[i])
  specialTags[i].classList.add('offset')
}

setTimeout(function () {
  findClosest()
}, 1000)

window.onscroll = function () {
  (window.scrollY > 0) ? topNavBar.classList.add('sticky') : topNavBar.classList.remove('sticky')
  findClosest()
}

let liTags = document.querySelectorAll('nav.menu > ul > li')
for (let i = 0; i < liTags.length; i++) {
  liTags[i].onmouseenter = function (x) {
    x.currentTarget.classList.add('active')
  }
  liTags[i].onmouseleave = function (x) {
    let li = x.currentTarget.classList.remove('active')
  }
}
let aTags = document.querySelectorAll('nav > ul > li > a')

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

//
function findClosest () {
  let specialTags = document.querySelectorAll('[data-x]')
  let minInedx = 0
  for (let i = 1;i < specialTags.length;i++) {
    if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minInedx].offsetTop - window.scrollY)) {
      minInedx = i
    }
  }
  specialTags[minInedx].classList.remove('offset')
  let id = specialTags[minInedx].id
  let a = document.querySelector('a[href="#' + id + '"]')
  let li = a.parentNode
  let brothersAndMe = li.parentNode.children
  let brother = li.parentNode.childNodes
  for (let i = 0;i < brothersAndMe.length;i++) {
    brothersAndMe[i].classList.remove('highlight')
  }
  li.classList.add('highlight')
}
