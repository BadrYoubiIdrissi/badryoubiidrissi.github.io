particlesJS.load("header-particles", headerParticles);

$(window).on("load", function() {
  var svgObject = document.getElementById("panel2_svg"),
    svgDoc = svgObject.contentDocument,
    neurones = svgDoc.getElementById("neurones");
  console.log(neurones);

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onLeave"
    }
  });

  // get all slides
  var slides = document.querySelectorAll(".panel");

  // create scene for every slide
  for (var i = 0; i < slides.length; i++) {
    new ScrollMagic.Scene({
      triggerElement: slides[i],
      duration: "20%"
    })
      .setPin(slides[i])
      .addTo(controller);
  }

  var tl = new TimelineMax().from(neurones, 1, { color: "white" });
  new ScrollMagic.Scene({ triggerElement: slides[1] })
    .setTween(tl)
    .addTo(controller);

  controller.scrollTo(function(newpos) {
    TweenMax.to(window, 0.5, { scrollTo: { y: newpos } });
  });
  //  bind scroll to anchor links
  $(document).on("click", "a[href^='#']", function(e) {
    var id = $(this).attr("href");
    if ($(id).length > 0) {
      e.preventDefault();

      // trigger scroll
      controller.scrollTo(id);

      // if supported by the browser we can even update the URL.
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }
  });
});
