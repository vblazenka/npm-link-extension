import { createNPMAnchor, getElementStyle, canUseInRepo, isRelativeImport, checkIfNpmLink } from "./utils";

let timer;

function start() {
  if (canUseInRepo()) {
    let $package;
    const lines = document.querySelectorAll('.js-file-line');

    lines.forEach(function (line) {
      const words = line.querySelectorAll('span');

      words.forEach((word, index) => {
        if (word.textContent === 'from' || word.textContent === 'require') {
          $package = words[index + 1];

          if (isRelativeImport($package.textContent)) {
            return;
          }

          if (checkIfNpmLink($package)) {
            return;
          }

          const npmLink = createNPMAnchor($package.textContent);

          npmLink.style.color = getElementStyle($package, 'color');

          $package.textContent = '';
          $package.appendChild(npmLink);
        }
      });
    });
  }

  clearInterval(timer);
  timer = setInterval(() => {
    start();
  }, 1000);

}

start();


