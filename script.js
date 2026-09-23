document.addEventListener("DOMContentLoaded", () => {


  /* =====================================================
     SCROLL BLUR
  ===================================================== */

  const fadeTop = document.createElement("div");
  fadeTop.className = "scroll-fade scroll-fade-top";

  const fadeBottom = document.createElement("div");
  fadeBottom.className = "scroll-fade scroll-fade-bottom";

  document.body.appendChild(fadeTop);
  document.body.appendChild(fadeBottom);


  /* =====================================================
     PAGE TRANSITION
  ===================================================== */

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 350);


  document
    .querySelectorAll('a[href$=".html"]')
    .forEach((link) => {

      const href = link.getAttribute("href");

      const currentPage =
        window.location.pathname
          .split("/")
          .pop();

      if (
        !href ||
        href === currentPage
      ) {
        return;
      }


      link.addEventListener(
        "click",
        (event) => {

          if (
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey
          ) {
            return;
          }

          event.preventDefault();

          document.body.classList.remove(
            "loaded"
          );

          document.body.classList.add(
            "leaving"
          );


          setTimeout(() => {

            window.location.href =
              href;

          }, 650);

        }
      );

    });


  /* =====================================================
     NAV LOGO
     OSCURO → ROSA
  ===================================================== */

  const navLogo =
    document.querySelector(
      ".site-header .logo img"
    );


  if (navLogo) {

    const originalLogo =
      navLogo.getAttribute("src");

    const lightLogo =
      "assets/moy-mark-light.svg";


    navLogo.addEventListener(
      "mouseenter",
      () => {

        navLogo.src =
          lightLogo;

      }
    );


    navLogo.addEventListener(
      "mouseleave",
      () => {

        navLogo.src =
          originalLogo;

      }
    );


    navLogo.addEventListener(
      "touchstart",
      () => {

        navLogo.src =
          lightLogo;


        setTimeout(() => {

          navLogo.src =
            originalLogo;

        }, 800);

      },
      {
        passive: true
      }
    );

  }


  /* =====================================================
     REVEAL ON SCROLL
  ===================================================== */

  const reveals =
    document.querySelectorAll(
      ".reveal"
    );


  const revealObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: .12
      }
    );


  reveals.forEach((el) => {

    revealObserver.observe(el);

  });


  /* =====================================================
     MAGNETIC
  ===================================================== */

  document
    .querySelectorAll(".magnetic")
    .forEach((el) => {


      el.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            el.getBoundingClientRect();


          const x =
            event.clientX -
            rect.left -
            rect.width / 2;


          const y =
            event.clientY -
            rect.top -
            rect.height / 2;


          el.style.transform =
            `translate(${x * .08}px, ${y * .2}px)`;

        }
      );


      el.addEventListener(
        "mouseleave",
        () => {

          el.style.transform =
            "translate(0, 0)";

        }
      );

    });


  /* =====================================================
     AUTOPLAY VIDEOS
  ===================================================== */

  const videos =
    document.querySelectorAll(
      "video"
    );


  const videoObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            const video =
              entry.target;


            if (
              entry.isIntersecting
            ) {

              video
                .play()
                .catch(() => {});

            } else {

              video.pause();

            }

          }
        );

      },
      {
        threshold: .6
      }
    );


  videos.forEach((video) => {

    videoObserver.observe(video);

  });


  /* =====================================================
     CURSOR PILL TRAIL
     HOME
  ===================================================== */

  if (
    document.body.classList.contains(
      "home-page"
    )
  ) {

    const trailWords = [

      "diseño",
      "branding",
      "UX/UI",
      "web",
      "creatividad",
      "marca",
      "identidad",
      "interfaz",
      "visual",
      "código",
      "color"

    ];


    const trailColors = [

      "pill-wine",
      "pill-pink",
      "pill-pink-light",
      "pill-lime",
      "pill-dark",
      "pill-white"

    ];


    const home =
      document.querySelector(
        ".home-main"
      );


    let lastSpawn = 0;

    let lastX = null;
    let lastY = null;


    if (home) {

      home.addEventListener(
        "mousemove",
        (event) => {


          const now =
            Date.now();


          if (
            lastX !== null
          ) {

            const moved =
              Math.hypot(
                event.clientX -
                  lastX,
                event.clientY -
                  lastY
              );


            if (
              moved < 8
            ) {
              return;
            }

          }


          lastX =
            event.clientX;

          lastY =
            event.clientY;


          if (
            now -
            lastSpawn <
            85
          ) {
            return;
          }


          lastSpawn =
            now;


          const pill =
            document.createElement(
              "span"
            );


          const color =
            trailColors[
              Math.floor(
                Math.random() *
                trailColors.length
              )
            ];


          const word =
            trailWords[
              Math.floor(
                Math.random() *
                trailWords.length
              )
            ];


          pill.className =
            `cursor-pill pill ${color}`;


          pill.textContent =
            word;


          pill.style.left =
            `${event.clientX}px`;


          pill.style.top =
            `${event.clientY}px`;


          pill.style.setProperty(
            "--drift",
            `${(
              Math.random() *
              16 -
              8
            ).toFixed(1)}px`
          );


          document.body.appendChild(
            pill
          );


          requestAnimationFrame(
            () => {

              pill.classList.add(
                "is-visible"
              );

            }
          );


          setTimeout(() => {

            pill.classList.add(
              "is-fading"
            );


            setTimeout(() => {

              pill.remove();

            }, 450);

          }, 600);

        }
      );

    }

  }


  /* =====================================================
     ALIA MEDIA VIEWER
  ===================================================== */

  const viewer =
    document.getElementById(
      "mediaViewer"
    );


  const dotsWrap =
    document.getElementById(
      "mediaDots"
    );


  if (
    viewer &&
    dotsWrap
  ) {

    const items =
      viewer.querySelectorAll(
        ".media-item"
      );


    items.forEach(
      (_, i) => {

        const dot =
          document.createElement(
            "span"
          );


        if (
          i === 0
        ) {

          dot.classList.add(
            "is-active"
          );

        }


        dotsWrap.appendChild(
          dot
        );

      }
    );


    const dots =
      dotsWrap.querySelectorAll(
        "span"
      );


    const dotObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.intersectionRatio >
                .6
              ) {

                const index =
                  Array
                    .from(items)
                    .indexOf(
                      entry.target
                    );


                dots.forEach(
                  (dot) => {

                    dot.classList.remove(
                      "is-active"
                    );

                  }
                );


                if (
                  dots[index]
                ) {

                  dots[index].classList.add(
                    "is-active"
                  );

                }

              }

            }
          );

        },
        {
          root: viewer,
          threshold: [
            0,
            .6,
            1
          ]
        }
      );


    items.forEach(
      (item) => {

        dotObserver.observe(
          item
        );

      }
    );

  }

});