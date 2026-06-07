/* ═══════════════════════════════════════════
   ASCII Garden — scattered 2D layout
   Each line has its own colour:
   petals/blooms use floral colours,
   stems/branches/roots use greens.
═══════════════════════════════════════════ */

(function () {
  /* Seeded RNG — same sequence every page load */
  var _seed = 20260605;
  function rand() {
    _seed = (_seed * 1664525 + 1013904223) & 0xffffffff;
    return (_seed >>> 0) / 0xffffffff;
  }

  var PINK   = '#FD6B94';
  var GREEN  = '#B2BF5A';
  var OLIVE  = '#C8D665';
  var ORANGE = '#F2511B';
  var BLUE   = '#ADD6F7';
  var CREAM  = '#F7FEBC';

  /* Each line: { t: text, c: colour } */
  function buildPlantHTML(lines) {
    return lines.map(function (l) {
      return '<span style="color:' + l.c + '">' + l.t + '</span>';
    }).join('\n');
  }

  var PLANTS = [
    /* 0 — Pink cherry blossom */
    {
      frames: [
        [ { t: '  ,',   c: PINK  } ],
        [ { t: '  .',   c: PINK  }, { t: '  |',   c: GREEN } ],
        [ { t: ' (*)',  c: CREAM }, { t: '  >/',   c: GREEN } ],
        [ { t: '  @',   c: PINK  }, { t: ' \\|/', c: GREEN }, { t: ' ^^^',  c: GREEN } ],
        [ { t: ' vVv',  c: PINK  }, { t: ' (_)',   c: PINK  }, { t: '  \\|', c: GREEN }, { t: ' ^^^', c: GREEN } ]
      ],
      intervalMs: 2200
    },
    /* 1 — Simple green branch */
    {
      frames: [
        [ { t: '\\|/',   c: GREEN } ],
        [ { t: '\\ |/',  c: GREEN } ]
      ],
      intervalMs: 3600
    },
    /* 2 — Big tree */
    {
      frames: [
        [ { t: '  |',      c: GREEN } ],
        [ { t: '~Y~',      c: GREEN }, { t: '\\|/',    c: GREEN } ],
        [ { t: '\\~Y~/',   c: GREEN }, { t: '\\\\|//', c: GREEN }, { t: ' ^^^^^', c: OLIVE } ],
        [ { t: 'vVVVv',    c: OLIVE }, { t: '(___)',   c: GREEN }, { t: ' ~Y~',   c: GREEN }, { t: '\\\\|//', c: GREEN }, { t: '^^^^^', c: OLIVE } ]
      ],
      intervalMs: 2600
    },
    /* 3 — Orange fruit sprout */
    {
      frames: [
        [ { t: '  .',    c: ORANGE } ],
        [ { t: ' (o)',   c: ORANGE }, { t: ' \\|/',  c: GREEN } ],
        [ { t: ' vVv',  c: ORANGE }, { t: ' (_)',   c: ORANGE }, { t: '  \\|/', c: GREEN } ],
        [ { t: ' vVv',  c: ORANGE }, { t: ' (_)',   c: ORANGE }, { t: '  \\|/', c: GREEN }, { t: '  ^^^', c: OLIVE } ]
      ],
      intervalMs: 2400
    },
    /* 4 — Tiny pink seedling */
    {
      frames: [
        [ { t: '   ,',    c: PINK  } ],
        [ { t: '   .',    c: PINK  }, { t: '   |',   c: GREEN } ],
        [ { t: '  (*)',   c: CREAM }, { t: '   >/',  c: GREEN } ],
        [ { t: '   @',   c: PINK  }, { t: '  \\|/', c: GREEN }, { t: '  ^^^', c: GREEN } ]
      ],
      intervalMs: 2800
    },
    /* 5 — Blue water plant */
    {
      frames: [
        [ { t: '  v',    c: BLUE  } ],
        [ { t: ' vvv',   c: BLUE  }, { t: '  Y',    c: GREEN }, { t: ' ^^^',   c: OLIVE } ],
        [ { t: 'vVVVv',  c: BLUE  }, { t: ' ~Y~',   c: GREEN }, { t: '^^^^^',  c: OLIVE } ]
      ],
      intervalMs: 3000
    },
    /* 6 — Willow type */
    {
      frames: [
        [ { t: '  .',     c: CREAM }, { t: '  |',     c: GREEN } ],
        [ { t: '  .',     c: CREAM }, { t: ' \\(|,-', c: GREEN } ],
        [ { t: ' \\(| ,-',c: GREEN }, { t: '  \\|/',  c: GREEN } ]
      ],
      intervalMs: 3200
    },
    /* 7 — Pink bush */
    {
      frames: [
        [ { t: ' ,,,',    c: PINK  } ],
        [ { t: ' ,,,',    c: PINK  }, { t: ' ~Y~',   c: GREEN }, { t: ' \\|/',  c: GREEN } ],
        [ { t: ' ,,,',    c: PINK  }, { t: ' ~Y~',   c: GREEN }, { t: ' \\|/',  c: GREEN }, { t: '^^^^^', c: OLIVE } ],
        [ { t: ' ,,,',    c: PINK  }, { t: '{({})}', c: GREEN }, { t: ' ~Y~',   c: GREEN }, { t: ' \\|/', c: GREEN }, { t: '^^^^^', c: OLIVE } ]
      ],
      intervalMs: 2000
    },
    /* 8 — Small yellow seedling */
    {
      frames: [
        [ { t: '  ,',    c: CREAM } ],
        [ { t: ' (*)',   c: CREAM }, { t: '  >/',  c: GREEN } ],
        [ { t: ' (*)',   c: CREAM }, { t: '  >\\', c: GREEN } ]
      ],
      intervalMs: 3400
    },
    /* 9 — Orange growing flower */
    {
      frames: [
        [ { t: '   .',    c: ORANGE } ],
        [ { t: '   @',   c: ORANGE }, { t: '  \\|/', c: GREEN } ],
        [ { t: '   @',   c: ORANGE }, { t: '  \\|/', c: GREEN }, { t: '  ^^^', c: OLIVE } ],
        [ { t: '  vVv',  c: ORANGE }, { t: '  (_)',  c: ORANGE }, { t: '  \\|/', c: GREEN } ]
      ],
      intervalMs: 2200
    }
  ];

  /* ── Scatter positions across a grid ── */
  function generatePositions(cols, rows) {
    var positions = [];
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var cellW = 90 / cols;
        var cellH = 80 / rows;
        positions.push({
          x: 3 + c * cellW + rand() * cellW * 0.85,
          y: 4 + r * cellH + rand() * cellH * 0.85
        });
      }
    }
    for (var i = positions.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = positions[i]; positions[i] = positions[j]; positions[j] = tmp;
    }
    return positions;
  }

  function initGarden() {
    var garden = document.querySelector('.df-garden');
    if (!garden) return;
    garden.innerHTML = '';

    var isMobile = window.innerWidth < 768;

    /* Portrait grid for mobile (3×6), landscape for desktop (6×3) */
    var positions = isMobile
      ? generatePositions(3, 6)
      : generatePositions(6, 3);

    /* Extra green branches — redistributed for mobile */
    var BRANCH = PLANTS[1];
    var extraBranches = isMobile ? [
      { x: 5  + rand() * 10, y: 10 + rand() * 10 },
      { x: 60 + rand() * 10, y: 25 + rand() * 10 },
      { x: 20 + rand() * 10, y: 45 + rand() * 10 },
      { x: 70 + rand() * 10, y: 58 + rand() * 10 },
      { x: 10 + rand() * 10, y: 72 + rand() * 10 }
    ] : [
      { x: 8  + rand() * 6, y: 20 + rand() * 20 },
      { x: 28 + rand() * 6, y: 55 + rand() * 15 },
      { x: 50 + rand() * 6, y: 30 + rand() * 20 },
      { x: 68 + rand() * 6, y: 65 + rand() * 15 },
      { x: 85 + rand() * 6, y: 40 + rand() * 20 }
    ];
    extraBranches.forEach(function (pos) {
      var el = document.createElement('div');
      el.className = 'df-plant';
      el.setAttribute('aria-hidden', 'true');
      el.style.left = pos.x.toFixed(1) + '%';
      el.style.top  = pos.y.toFixed(1) + '%';
      garden.appendChild(el);
      var frameIndex = 0;
      function renderBranch() {
        el.innerHTML = buildPlantHTML(BRANCH.frames[frameIndex % BRANCH.frames.length]);
        frameIndex = (frameIndex + 1) % BRANCH.frames.length;
      }
      renderBranch();
      setInterval(renderBranch, BRANCH.intervalMs);
    });

    positions.forEach(function (pos, i) {
      var plant = PLANTS[i % PLANTS.length];

      var el = document.createElement('div');
      el.className = 'df-plant';
      el.setAttribute('aria-hidden', 'true');
      el.style.left = pos.x.toFixed(1) + '%';
      el.style.top  = pos.y.toFixed(1) + '%';
      garden.appendChild(el);

      /* Show fully grown immediately */
      var lastFrame = plant.frames[plant.frames.length - 1];
      el.innerHTML = buildPlantHTML(lastFrame);

      /* Grow from seedling → full, hold, then regrow */
      function growCycle() {
        var frameIndex = 0;
        function step() {
          el.innerHTML = buildPlantHTML(plant.frames[frameIndex]);
          frameIndex++;
          if (frameIndex < plant.frames.length) {
            setTimeout(step, plant.intervalMs);
          } else {
            setTimeout(growCycle, 7000 + rand() * 5000);
          }
        }
        step();
      }

      setTimeout(growCycle, i * 300 + rand() * 2000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGarden);
  } else {
    initGarden();
  }
})();
