export const getElementStyle = (element, property) => {
  return window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(property) : element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); })];
};

export const canUseInRepo = () => {
  return !!document.querySelector('div.type-javascript') || !!document.querySelector('div.type-typescript')
};

export const stripWord = word => word.substring(1, word.length-1);

// https://gist.github.com/MoOx/8614711
export const createElement = options => {
  var el
    , a
    , i
  if (!options.tagName) {
    el = document.createDocumentFragment()
  }
  else {
    el = document.createElement(options.tagName)
    if (options.className) {
      el.className = options.className
    }

    if (options.attributes) {
      for (a in options.attributes) {
        el.setAttribute(a, options.attributes[a])
      }
    }

    if (options.html !== undefined) {
      el.innerHTML = options.html
    }
  }

  if (options.text) {
    el.appendChild(document.createTextNode(options.text))
  }

  // IE 8 doesn"t have HTMLElement
  if (window.HTMLElement === undefined) {
    window.HTMLElement = Element
  }

  if (options.childs && options.childs.length) {
    for (i = 0; i < options.childs.length; i++) {
      el.appendChild(options.childs[i] instanceof window.HTMLElement ? options.childs[i] : createElement(options.childs[i]))
    }
  }

  return el
};

export const createNPMAnchor = (packageName) => createElement({
  'tagName': 'a',
  'text': packageName,
  'attributes': {
    'href': `https://npmjs.com/package/${stripWord(packageName)}`,
    'target': '_blank',
  }
});

export const isRelativeImport = (packageName) => {
  return packageName.includes('./');
};

export const checkIfNpmLink = (node) => {
  let links = Array.from(node.childNodes).filter(node => {
    return node && node.tagName === 'A' && node.href;
  });

  return links && links.length;
};
