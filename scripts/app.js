particlesJS.load("header-particles", headerParticles);

function getBBox(element, withoutTransforms, toElement) {

  var svg = element.ownerSVGElement;

  if (!svg) {
    return { x: 0, y: 0, cx: 0, cy: 0, width: 0, height: 0 };
  }

  var r = element.getBBox();

  if (withoutTransforms) {
    return {
      x: r.x,
      y: r.y,
      width: r.width,
      height: r.height,
      cx: r.x + r.width / 2,
      cy: r.y + r.height / 2
    };
  }

  var p = svg.createSVGPoint();

  var matrix = (toElement || svg).getScreenCTM().inverse().multiply(element.getScreenCTM());

  p.x = r.x;
  p.y = r.y;
  var a = p.matrixTransform(matrix);

  p.x = r.x + r.width;
  p.y = r.y;
  var b = p.matrixTransform(matrix);

  p.x = r.x + r.width;
  p.y = r.y + r.height;
  var c = p.matrixTransform(matrix);

  p.x = r.x;
  p.y = r.y + r.height;
  var d = p.matrixTransform(matrix);

  var minX = Math.min(a.x, b.x, c.x, d.x);
  var maxX = Math.max(a.x, b.x, c.x, d.x);
  var minY = Math.min(a.y, b.y, c.y, d.y);
  var maxY = Math.max(a.y, b.y, c.y, d.y);

  var width = maxX - minX;
  var height = maxY - minY;

  return {
    x: minX,
    y: minY,
    width: width,
    height: height,
    cx: minX + width / 2,
    cy: minY + height / 2
  };
}

function resetPath(path) {
  var l = path.getTotalLength();
  var num = Math.ceil(1 + l);
  TweenMax.set(path, { strokeDasharray: num, strokeDashoffset: num, immediateRender: true });
}

function animateDraw(path, time = 1) {
  var tl = new TimelineMax();
  var l = path.getTotalLength();
  var num = Math.ceil(1 + l);
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
  tl.set(path, { strokeDasharray: dashArr2String(initialDashArray), immediateRender: true });
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

function floatRight(elements, up = false) {
  const width = $("body").width();
  const scrHeight = $("body").height();
  for (var el of elements) {
    var speed = 20 + 60 * Math.random();
    const elWidth = el.clientWidth;
    const height = (up ? -(110 + 40 * Math.random()) : 10 + 40 * Math.random()) + "%";
    const pos = (width + 2 * elWidth) * Math.random() - elWidth;
    var tl = new TimelineMax({ repeat: -1 });
    tl.fromTo(el, (width - pos) / speed, { x: pos, y: height }, { x: width, y: height, ease: Linear.easeNone })
      .fromTo(el, (pos + elWidth) / speed, { x: -elWidth, y: height }, { x: pos, y: height, ease: Linear.easeNone })
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

function mapAni(arr, animFunction, time) {
  var aniArr = [];
  for (var e of arr) {
    aniArr.push(animFunction(e, time));
  }
  return aniArr
}

function xoffset(targetbox){
  return function (index, el) {
    var elbox = getBBox(el);
    return targetbox.cx - elbox.cx;
  }
}
function yoffset(targetbox){
  return function (index, el) {
    var elbox = getBBox(el);
    return targetbox.cy - elbox.cy;
  }
}

$(window).on("load", function () {
  $('.loader').fadeOut();
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
  var svg = document.getElementById("allianz_header").contentDocument,
    tickets = svg.getElementById("tickets").children,
    pink_cluster = svg.getElementById("pink-cluster").children,
    blue_cluster = svg.getElementById("blue-cluster").children,
    green_cluster = svg.getElementById("green-cluster").children,
    gear1 = svg.getElementById("gear1"),
    gear2 = svg.getElementById("gear2"),
    gear3 = svg.getElementById("gear3"),
    input = svg.getElementById("input"),
    output = svg.getElementById("output");

  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onCenter"
    }
  });

  // get all slides
  var slides = document.querySelectorAll(".panel");

  [].forEach.call(synapse0, elem => resetPath(elem));
  [].forEach.call(synapse1, elem => resetPath(elem));
  [].forEach.call(synapse2, elem => resetPath(elem));
  [].forEach.call(tech_sym, elem => resetPath(elem));
  resetPath(question_path);

  floatRight(document.getElementsByClassName("floating-down"), up = false);
  floatRight(document.getElementsByClassName("floating-up"), up = true);

  var tl = new TimelineMax()
    .add(mapAni(synapse0, animateDraw, 0.5))
    .from(neurones, 0.3, { fill: "#104354" })
    .add(mapAni(synapse1, animateDraw, 0.5))
    .add(mapAni(synapse2, animateDraw, 0.5))
    .add("end_syn")
    .add(mapAni(tech_sym, animateDraw, 1))
    .add(animateDraw(question_path, 0.5))
    .from(question_dot, 0.3, { scale: 0 })
    .from(technology, 0.3, { opacity: 0 })
    .from(passion, 0.3, { opacity: 0 })
    .from(curiosity, 0.3, { opacity: 0 });

  new ScrollMagic.Scene({
    triggerElement: slides[1],
    duration: "50%"
  })
    .setTween(tl)
    .addTo(controller);

  let inputBox = getBBox(input);
  let outputBox = getBBox(output);
  var gearTl = new TimelineMax({repeat:-1})
    .to(gear1, 2, {rotation:360, transformOrigin:"50% 50%", ease:Linear.easeNone},0)
    .to(gear2, 2, {rotation:-360, transformOrigin:"50% 50%", ease:Linear.easeNone},0)
    .to(gear3, 2, {rotation:360, transformOrigin:"50% 50%", ease:Linear.easeNone},0)
  var tl2 = new TimelineMax({repeat:-1})
    .staggerFrom(tickets, 0.3, {opacity:0}, 0.02)
    .staggerTo(tickets, 0.3, {
      x: xoffset(inputBox),
      y: yoffset(inputBox),
      scale:0.5
    }, 0.02)
    .staggerFrom(pink_cluster, 0.3, {
      x: xoffset(outputBox),
      y: yoffset(outputBox)
    }, 0.02)
    .staggerFrom(blue_cluster, 0.3, {
      x: xoffset(outputBox),
      y: yoffset(outputBox)
    }, 0.02)
    .staggerFrom(green_cluster, 0.3, {
      x: xoffset(outputBox),
      y: yoffset(outputBox)
    }, 0.02)
    .staggerTo(pink_cluster, 0.3, {opacity:0}, 0.02)
    .staggerTo(green_cluster, 0.3, {opacity:0}, 0.02)
    .staggerTo(blue_cluster, 0.3, {opacity:0}, 0.02)

  new ScrollMagic.Scene({
    triggerElement: slides[3]
  })
    .setTween(tl2)
    .addTo(controller);


  controller.scrollTo(function (newpos) {
    TweenMax.to(window, 1.5, { scrollTo: { y: newpos }, ease: "exp" });
  });
  //  bind scroll to anchor links
  $(document).on("click", "a[href^='#']", function (e) {
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
