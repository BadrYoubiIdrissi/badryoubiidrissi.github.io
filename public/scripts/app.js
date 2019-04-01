particlesJS.load("header-particles", headerParticles);

function resetPath(path) {
  var l = path.getTotalLength();
  var num = Math.ceil(1+l);
  TweenMax.set(path, { strokeDasharray: num, strokeDashoffset: num , immediateRender:true});
}

function animateDraw(path, time = 1) {
  var tl = new TimelineMax();
  var l = path.getTotalLength();
  var num = Math.ceil(1+l);
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

function floatRight(elements){
  const width = $("body").width();
  for (var el of elements){
    var speed = 50+70*Math.random();
    const elWidth = el.clientWidth;
    const height = elWidth*Math.random()/3-elWidth/3;
    const pos = (width+2*elWidth)*Math.random()-elWidth;
    var tl = new TimelineMax({repeat:-1});
    tl.fromTo(el, (width-pos)/speed, {x:pos, y:height}, {x:width, y:height, ease:"linear"})
      .fromTo(el, (pos+elWidth)/speed, {x:-elWidth, y:height}, {x:pos, y:height,ease:"linear"})
  }
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
  var svg = document.getElementById("summary_header").contentDocument,
    neurones = svg.getElementsByClassName("neurone"),
    synapse0 = svg.getElementsByClassName("synapse0"),
    synapse1 = svg.getElementsByClassName("synapse1"),
    synapse2 = svg.getElementsByClassName("synapse2"),
    tech_sym = svg.getElementsByClassName("technology_sym"),
    question_path = svg.getElementById("question_path"),
    question_dot = svg.getElementById("question_dot"),
    technology = svg.getElementById("technology"),
    curiosity = svg.getElementById("curiosity"),
    passion = svg.getElementById("passion");

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onCenter",
      duration:"50%"
    }
  });

  // get all slides
  var slides = document.querySelectorAll(".panel");

  [].forEach.call(synapse0, elem => resetPath(elem));
  [].forEach.call(synapse1, elem => resetPath(elem));
  [].forEach.call(synapse2, elem => resetPath(elem));
  [].forEach.call(tech_sym, elem => resetPath(elem));
  resetPath(question_path);

  floatRight(document.getElementsByClassName("floating"));

  var tl = new TimelineMax()
    .add(mapAni(synapse0, animateDraw, 0.5))
    .from(neurones, 0.3, { fill: "#104354" })
    .add(mapAni(synapse1, animateDraw, 0.5))
    .add(mapAni(synapse2, animateDraw, 0.5))
    .add("end_syn")
    .add(mapAni(tech_sym, animateDraw, 1))
    .add(animateDraw(question_path, 0.5))
    .from(question_dot, 0.3, {scale:0})
    .from(technology, 0.3, {opacity:0})
    .from(passion, 0.3, {opacity:0})
    .from(curiosity, 0.3, {opacity:0})
    
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
