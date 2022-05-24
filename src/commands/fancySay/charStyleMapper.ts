const styles = require("./styles.json");

export default function applyCharStyle(style, text) {
  let out = "";
  let _iteratorNormalCompletion2 = true;
  let _didIteratorError2 = false;
  let _iteratorError2 = undefined;

  try {
    for (
      var _iterator2 = text.split("")[Symbol.iterator](), _step2;
      !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
      _iteratorNormalCompletion2 = true
    ) {
      let c = _step2.value;
      if (style[c] !== undefined) out += style[c];
      else if (style[c.toLowerCase()] !== undefined)
        out += style[c.toLowerCase()];
      else out += c;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return out;
}
