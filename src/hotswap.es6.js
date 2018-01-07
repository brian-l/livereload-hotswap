(function(globals) {
    class HotSwapPlugin {
        static get identifier() {
            /*
             * Reveal this plugin to the LiveReload plugin system so it can only be loaded once.
             */
            return 'hotswap';
        }

        reload(path, options) {
            /*
             * Search for specifically targeted scripts/links/images.
             */
            let targets = [...globals.document.querySelectorAll('[data-hotswap]')];

            /*
             * Tell the Reloader to continue its normal processing by returning false;
             */
            if(!targets.length) {
                return false;
            }

            /*
             * If the data-hotswap attribute exists but is not set then always reload it,
             * else test assets that match the regexes passed through data-hotswap.
             */
            let reloads = targets.filter((target) => {
                return ('hotswap' in target.dataset && !target.dataset.hotswap) || new RegExp(target.dataset.hotswap).test(path)
            });

            /*
             * Its possible no targets matched our regex or had the data-hotswap attribute, quit early if so.
             */
            if(!reloads.length) {
                return false;
            }

            for(let obj of reloads) {
                /*
                 * Create a new element with an updated src/href attribute adding in the current time for cache-busting.
                 */
                let clone = document.createElement(obj.nodeName),
                    parent = obj.parentNode,
                    index = [...parent.children].indexOf(obj),
                    remote = obj.nodeName == 'LINK' ? 'href' : 'src',
                    generated = new Date().getTime();

                for(let attr of obj.attributes) {
                    let value = attr.value;
                    if(attr.name == remote) {
                        let [path, uri] = attr.value.split('?'),
                            params = new URLSearchParams(uri);

                        params.set('hotswap-generated', generated);
                        value = path + '?' + params.toString();
                    }

                    clone.setAttribute(attr.name, value);
                }

                obj.parentNode.replaceChild(clone, obj);
            }

            /*
             * Returning true tells the Reloader to stop processing the asset after this plugin.
             */
            return true;
        }
    }

    /*
     * Cheat the plugin system and add this class in after LiveReload exists.
     */
    globals.LiveReload.addPlugin(HotSwapPlugin);
})(window);
