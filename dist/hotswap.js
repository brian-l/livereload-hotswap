'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (globals) {
    var HotSwapPlugin = function () {
        function HotSwapPlugin() {
            _classCallCheck(this, HotSwapPlugin);
        }

        _createClass(HotSwapPlugin, [{
            key: 'reload',
            value: function reload(path, options) {
                /*
                 * Search for specifically targeted scripts/links/images.
                 */
                var targets = [].concat(_toConsumableArray(globals.document.querySelectorAll('[data-hotswap]')));

                /*
                 * Tell the Reloader to continue its normal processing by returning false;
                 */
                if (!targets.length) {
                    return false;
                }

                /*
                 * If the data-hotswap attribute exists but is not set then always reload it,
                 * else test assets that match the regexes passed through data-hotswap.
                 */
                var reloads = targets.filter(function (target) {
                    return 'hotswap' in target.dataset && !target.dataset.hotswap || new RegExp(target.dataset.hotswap).test(path);
                });

                /*
                 * Its possible no targets matched our regex or had the data-hotswap attribute, quit early if so.
                 */
                if (!reloads.length) {
                    return false;
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = reloads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var obj = _step.value;

                        /*
                         * Create a new element with an updated src/href attribute adding in the current time for cache-busting.
                         */
                        var clone = document.createElement(obj.nodeName),
                            parent = obj.parentNode,
                            index = [].concat(_toConsumableArray(parent.children)).indexOf(obj),
                            remote = obj.nodeName == 'LINK' ? 'href' : 'src',
                            generated = new Date().getTime();

                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = obj.attributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var attr = _step2.value;

                                var value = attr.value;
                                if (attr.name == remote) {
                                    var _attr$value$split = attr.value.split('?'),
                                        _attr$value$split2 = _slicedToArray(_attr$value$split, 2),
                                        _path = _attr$value$split2[0],
                                        uri = _attr$value$split2[1],
                                        params = new URLSearchParams(uri);

                                    params.set('hotswap-generated', generated);
                                    value = _path + '?' + params.toString();
                                }

                                clone.setAttribute(attr.name, value);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        obj.parentNode.replaceChild(clone, obj);
                    }

                    /*
                     * Returning true tells the Reloader to stop processing the asset after this plugin.
                     */
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return true;
            }
        }], [{
            key: 'identifier',
            get: function get() {
                /*
                 * Reveal this plugin to the LiveReload plugin system so it can only be loaded once.
                 */
                return 'hotswap';
            }
        }]);

        return HotSwapPlugin;
    }();

    /*
     * Cheat the plugin system and add this class in after LiveReload exists.
     */


    globals.LiveReload.addPlugin(HotSwapPlugin);
})(window);
//# sourceMappingURL=hotswap.js.map
