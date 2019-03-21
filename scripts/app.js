particlesJS.load("header-particles", headerParticles);

function resetPath(path){
  TweenMax.set(path, {strokeDasharray:10000, strokeDashoffset:10000});
}

function animateDraw(path, time=0.()){
  var l = path.getTotalLength();
  return TweenMax.to(path, time, {strokeDashoffset:10000-l});
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
    .from(startSyn, 1, {attr : {y2:startSyn.y1.baseVal.value}})
    .from(neurones, 1, { fill: "#104354" })
    .add([].map.call(synapses, animateDraw))
    .from(endSyn, 0.1, {strokeWidth:0})
    .from(endSyn, 3, {attr : {y2:endSyn.y1.baseVal.value}})
  //tween = TweenMax.to(neurones, 1, { fill: "#111" });

  new ScrollMagic.Scene({
    triggerElement: slides[1],
    duration:"50%"
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
    TweenMax.to(window, 1.5, { scrollTo: { y: newpos } , ease:"exp"});
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
