(function () {
  var hero = document.getElementById("hero");
  var video = document.getElementById("heroVideo");
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobileMenu");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reducedMotion) {
    requestAnimationFrame(function () {
      hero.classList.add("anim-ready");
    });
  } else {
    hero.classList.remove("anim-init");
  }

  if (video && !reducedMotion) {
    var showVideo = function () {
      video.classList.add("is-ready");
      var p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(function () {});
      }
    };
    if (video.readyState >= 2) {
      showVideo();
    } else {
      video.addEventListener("loadeddata", showVideo, { once: true });
    }
  } else if (video) {
    video.pause();
    video.removeAttribute("autoplay");
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      burger.setAttribute("aria-label", open ? "Open menu" : "Close menu");
      menu.classList.toggle("is-open", !open);
      menu.hidden = open;
    });

    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("is-open")) return;
      if (burger.contains(e.target) || menu.contains(e.target)) return;
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      menu.classList.remove("is-open");
      menu.hidden = true;
    });
  }
})();
