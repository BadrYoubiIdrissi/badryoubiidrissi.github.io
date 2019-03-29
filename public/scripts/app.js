particlesJS.load("header-particles", headerParticles);

function animateDraw(path, time = 1) {
  var l = path.getTotalLength();
  var tl = new TimelineMax();
  var num = Math.ceil(1+l);
  tl.set(path, { strokeDasharray: num, strokeDashoffset: num , immediateRender:true});
  tl.to(path, time, { strokeDashoffset: num - l });
  return tl;
}

function dashArr2String(dashArr) {
  return dashArr.a + " " + dashArr.b + " " + dashArr.c + " " + dashArr.d;
}

function animateStrokeDashArray(path) {
  var strokeArr = dashArr2String(this.target);
  path.style.strokeDasharray = strokeArr;
}

function dashArray(a, b, c = false, d = false) {
  c = c ? c : a;
  d = d ? d : b;
  return { a: a, b: b, c: c, d: d };
}

function animateDashArr(path, initial, final, time) {
  return TweenMax.to(initial, time, final).eventCallback(
    "onUpdate",
    animateStrokeDashArray,
    [path]
  );
}

function animateChase(path, initialDashArray, finalDashArray, dashOffset, time) {
  var l = path.getTotalLength();
  var tl = new TimelineMax();
  tl.set(path, { strokeDasharray: dashArr2String(initialDashArray), immediateRender:true });
  tl.add(animateDashArr(path, initialDashArray, finalDashArray, time));
  return tl.to(path, time, { strokeDashoffset: -l + dashOffset }, 0);
}

function animateFire(fire) {
  var tl = new TimelineMax();
  tl.set(fire, { transformOrigin: "50% 100%", immediateRender: true });
  var list = [];
  for (var el of fire) {
    list.push(
      TweenMax.fromTo(
        el,
        0.5,
        { scaleY: 0.1, opacity: 0 },
        { scaleY: 0.9 + 0.2 * Math.random(), opacity: 1, ease: Linear.easeIn }
      )
    );
  }
  var looptl = new TimelineMax({ repeat: -1, yoyo: true });
  for (var i = 0; i <= 10; i++) {
    var l = [];
    for (var el of fire) {
      l.push(
        TweenMax.to(el, 0.3, {
          scaleX: 0.9 + 0.15 * Math.random(),
          scaleY: 0.9 + 0.25 * Math.random(),
          ease: Linear.easeIn
        })
      );
    }
    looptl.add(l);
  }
  tl.add(list);
  tl.add(looptl);
  return tl;
}

function animateFire(fire) {
  var tl = new TimelineMax();
  tl.set(fire, { transformOrigin: "50% 100%", immediateRender: true });
  var list = [];
  for (var el of fire) {
    list.push(
      TweenMax.fromTo(
        el,
        0.5,
        { scaleY: 0.1, opacity: 0 },
        { scaleY: 0.9 + 0.2 * Math.random(), opacity: 1, ease: Linear.easeIn }
      )
    );
  }
  var looptl = new TimelineMax({ repeat: -1, yoyo: true });
  for (var i = 0; i <= 10; i++) {
    var l = [];
    for (var el of fire) {
      l.push(
        TweenMax.to(el, 0.3, {
          scaleX: 0.9 + 0.15 * Math.random(),
          scaleY: 0.9 + 0.25 * Math.random(),
          ease: Linear.easeIn
        })
      );
    }
    looptl.add(l);
  }
  tl.add(list);
  tl.add(looptl);
  return tl;
}

function mapAni(arr, animFunction, time){
  var aniArr = [];
  for (var e of arr){
    aniArr.push(animFunction(e, time));
  }
  return aniArr
}

$(window).on("load", function() {
  var leftSVG = document.getElementById("summary_anim_left").contentDocument,
    neurones = leftSVG.getElementsByClassName("neurone"),
    synapses = leftSVG.getElementsByClassName("synapse"),
    synapses1 = leftSVG.getElementsByClassName("synapse1"),
    main_syn = leftSVG.getElementById("main-synapse"),
    rightSVG = document.getElementById("summary_anim_right").contentDocument,
    icons = rightSVG.getElementById("icons"),
    question = rightSVG.getElementById("question"),
    question_mark = rightSVG.getElementById("question_mark")
    leftBracket = rightSVG.getElementById("left-bracket"),
    middle = rightSVG.getElementById("middle"),
    rightBracket = rightSVG.getElementById("right-bracket"),
    fire = rightSVG.getElementsByClassName("fire"),
    secondary_syn = rightSVG.getElementById("secondary-synapse");

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onCenter"
    }
  });

  // get all slides
  var slides = document.querySelectorAll(".panel");

  var tl = new TimelineMax()
    .add("origin", 0)
    .from(neurones, 0.3, { fill: "#104354" }, "origin")
    .add(mapAni(synapses, animateDraw, 0.5))
    .add(mapAni(synapses1, animateDraw, 0.5))
    .add("brain")
    .from("#panel2 h2", 1, {autoAlpha:0, y:10})
    .from("#panel2 p", 1, {autoAlpha:0, y:10}, "-=0.5")
    .add(animateDraw(main_syn, 2),"brain")
    .add(animateDraw(secondary_syn, 2), "brain")
    .add("end_syn")
    .from(icons, 0.2, {opacity:0})
    .add(animateChase(question,dashArray(1, 1000),dashArray(100, 1000),100, 1), "end_syn")
    .from(question_mark, 0.3, {scale: 0})
    .add(animateFire(fire), "end_syn")
    .add(animateChase(leftBracket, dashArray(1, 1000), dashArray(65, 1000), 65, 1), "end_syn")
    .add(animateChase(middle, dashArray(1, 1000), dashArray(47, 1000), 47, 1), "end_syn")
    .add(animateChase(rightBracket, dashArray(1, 1000), dashArray(67, 1000), 67, 1), "end_syn");
  new ScrollMagic.Scene({
    triggerElement: slides[1]
  })
    .setTween(tl)
    .addTo(controller);

  

  controller.scrollTo(function(newpos) {
    TweenMax.to(window, 1.5, { scrollTo: { y: newpos }, ease: "exp" });
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
