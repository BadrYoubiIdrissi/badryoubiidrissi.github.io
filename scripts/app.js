particlesJS.load("header-particles", headerParticles);

function resetPath(path){
  var l = path.getTotalLength();
  TweenMax.set(path, {strokeDasharray:l, strokeDashoffset:l});
}

function animateDraw(path, time=1){
  var l = path.getTotalLength();
  return TweenMax.to(path, time, {strokeDashoffset:0.0, onUpdate : function(){console.log(this)}});
}

$(window).on("load", function() {
  var svgObject = document.getElementById("panel2_svg"),
    svgDoc = svgObject.contentDocument,
    heart = svgDoc.getElementById("Heart"),
    neurones = svgDoc.getElementsByClassName("neurone"),
    synapses = svgDoc.getElementsByClassName("synapse"),
    startSyn = svgDoc.getElementById("startSyn"),
    endSyn = svgDoc.getElementById("endSyn");

  [].forEach.call(synapses, resetPath);

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onCenter"
    }
  });

  // get all slides
  var slides = document.querySelectorAll(".panel");

  var tl = new TimelineMax()
    .add(animateDraw(startSyn))
    .add(animateDraw(endSyn))
    .from(neurones, 1, { fill: "#104354" })
    .add([].map.call(synapses, animateDraw))
  //tween = TweenMax.to(neurones, 1, { fill: "#111" });

  new ScrollMagic.Scene({
    triggerElement: slides[1]
  })
    .setTween(tl)
    .addTo(controller);

  // // create scene for every slide
  // for (var i = 0; i < slides.length; i++) {
  //   new ScrollMagic.Scene({
  //     triggerElement: slides[i]
  //   })
  //     .setPin(slides[i])
  //     .addTo(controller);
  // }
  //

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
