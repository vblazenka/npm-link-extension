import { createNPMAnchor, getElementStyle, canUseInRepo, isRelativeImport } from "./utils";


let location = window.location.href;
let timer;

function start() {
  if (canUseInRepo()) {
    const lines = document.querySelectorAll('.js-file-line');

    lines.forEach(function (line) {
      const words = line.querySelectorAll('span');

      words.forEach((word, index) => {
        if (word.textContent === 'from' || word.textContent === 'require') {
          const $package = words[index + 1];

          if (isRelativeImport($package.textContent)) {
            return;
          }

          const npmLink = createNPMAnchor($package.textContent);

          npmLink.style.color = getElementStyle($package, 'color');

          $package.textContent = '';
          $package.appendChild(npmLink);
        }
      });
    });

    location = window.location.href;
  }

  clearInterval(timer);
  timer = setInterval(() => {
    if (location !== window.location.href) {
      start();
    }
  }, 1000);

}

start();


