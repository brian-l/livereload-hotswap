# LiveReload hotswap plugin

This script piggybacks off https://github.com/gruntjs/grunt-contrib-watch and reloads your assets in place instead of refreshing the page.

## How livereload-hotswap works

LiveReload is exposed through livereload.js when using livereload through Grunt, see https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html

This script simply adds in a plugin that intercepts assets you specify to be reloaded, by replacing their element with a clone containing a cache-busted source URL.

Note: this script will not remove event listeners or do any other cleanup.

## How to use livereload-hotswap

1. Add `dest/hotswap.min.js` to your page following your local LR server script.

2. For all scripts you want to be reloaded, add `data-hotswap` to their element. You may also target specific source files using regular expressions.

## Examples

* Always reload a script, regardless of what changed during grunt watch:

    ```
        <script type="text/javascript" src="myfancyscript.js" data-hotswap></script>
    ```

* Reload a script when its main source file is matched:

    ```
        <script type="text/javascript" src="myfancyscript.js" data-hotswap="src/myfancyscript.jsx"></script>
    ```

* Reload global CSS when one LESS source is updated:

    ```
        <link rel="stylesheet" href="style.css" data-hotswap="less/.*less" />
    ```
