"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports, module2) {
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism3 = (function(_self2) {
      var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: _self2.Prism && _self2.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = /** @type {Record<string, any>} */
                {};
                visited[id] = clone;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone[key] = deepClone(o[key], visited);
                  }
                }
                return (
                  /** @type {any} */
                  clone
                );
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone = [];
                visited[id] = clone;
                /** @type {Array} */
                /** @type {any} */
                o.forEach(function(v, i) {
                  clone[i] = deepClone(v, visited);
                });
                return (
                  /** @type {any} */
                  clone
                );
              default:
                return o;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(element) {
            while (element) {
              var m = lang.exec(element.className);
              if (m) {
                return m[1].toLowerCase();
              }
              element = element.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang, "gi"), "");
            element.classList.add("language-" + language);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if (document.currentScript && document.currentScript.tagName === "SCRIPT" && 1 < 2) {
              return (
                /** @type {any} */
                document.currentScript
              );
            }
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(inside, before, insert, root) {
            root = root || /** @type {any} */
            _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            _.util.setLanguage(parent, language);
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          if (!env.grammar) {
            throw new Error('The language "' + env.language + '" has no grammar.');
          }
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i = 0, callback; callback = callbacks[i++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s = "";
          o.forEach(function(e) {
            s += stringify(e, language);
          });
          return s;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match || match.index >= text.length) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    })(_self);
    if (typeof module2 !== "undefined" && module2.exports) {
      module2.exports = Prism3;
    }
    if (typeof global !== "undefined") {
      global.Prism = Prism3;
    }
    Prism3.languages.markup = {
      "comment": {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: true
      },
      "prolog": {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: true
      },
      "doctype": {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
            // see below
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: true
      },
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true
                }
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism3.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism3.languages.markup["entity"];
    Prism3.languages.markup["doctype"].inside["internal-subset"].inside = Prism3.languages.markup;
    Prism3.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism3.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism3.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism3.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism3.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(attrName, lang) {
        Prism3.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism3.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism3.languages.html = Prism3.languages.markup;
    Prism3.languages.mathml = Prism3.languages.markup;
    Prism3.languages.svg = Prism3.languages.markup;
    Prism3.languages.xml = Prism3.languages.extend("markup", {});
    Prism3.languages.ssml = Prism3.languages.xml;
    Prism3.languages.atom = Prism3.languages.xml;
    Prism3.languages.rss = Prism3.languages.xml;
    (function(Prism4) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism4.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
            // See rest below
          }
        },
        "url": {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism4.languages.css["atrule"].inside.rest = Prism4.languages.css;
      var markup = Prism4.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism3);
    Prism3.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      "boolean": /\b(?:false|true)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism3.languages.javascript = Prism3.languages.extend("clike", {
      "class-name": [
        Prism3.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: true
      },
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism3.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
    Prism3.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: RegExp(
          // lookbehind
          // eslint-disable-next-line regexp/no-dupe-characters-character-class
          /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
          // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
          // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
          // with the only syntax, so we have to define 2 different regex patterns.
          /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
          /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
          /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism3.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism3.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism3.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism3.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      }
    });
    Prism3.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: true,
        alias: "property"
      }
    });
    if (Prism3.languages.markup) {
      Prism3.languages.markup.tag.addInlined("script", "javascript");
      Prism3.languages.markup.tag.addAttribute(
        /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
        "javascript"
      );
    }
    Prism3.languages.js = Prism3.languages.javascript;
    (function() {
      if (typeof Prism3 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      function loadFile(src, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", src, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status < 400 && xhr.responseText) {
              success(xhr.responseText);
            } else {
              if (xhr.status >= 400) {
                error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
              } else {
                error(FAILURE_EMPTY_MESSAGE);
              }
            }
          }
        };
        xhr.send(null);
      }
      function parseRange(range) {
        var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || "");
        if (m) {
          var start = Number(m[1]);
          var comma = m[2];
          var end = m[3];
          if (!comma) {
            return [start, start];
          }
          if (!end) {
            return [start, void 0];
          }
          return [start, Number(end)];
        }
        return void 0;
      }
      Prism3.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism3.hooks.add("before-sanity-check", function(env) {
        var pre = (
          /** @type {HTMLPreElement} */
          env.element
        );
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          Prism3.util.setLanguage(code, language);
          Prism3.util.setLanguage(pre, language);
          var autoloader = Prism3.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          loadFile(
            src,
            function(text) {
              pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
              var range = parseRange(pre.getAttribute("data-range"));
              if (range) {
                var lines = text.split(/\r\n?|\n/g);
                var start = range[0];
                var end = range[1] == null ? lines.length : range[1];
                if (start < 0) {
                  start += lines.length;
                }
                start = Math.max(0, Math.min(start - 1, lines.length));
                if (end < 0) {
                  end += lines.length;
                }
                end = Math.max(0, Math.min(end, lines.length));
                text = lines.slice(start, end).join("\n");
                if (!pre.hasAttribute("data-start")) {
                  pre.setAttribute("data-start", String(start + 1));
                }
              }
              code.textContent = text;
              Prism3.highlightElement(code);
            },
            function(error) {
              pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
              code.textContent = error;
            }
          );
        }
      });
      Prism3.plugins.fileHighlight = {
        /**
         * Executes the File Highlight plugin for all matching `pre` elements under the given container.
         *
         * Note: Elements which are already loaded or currently loading will not be touched by this method.
         *
         * @param {ParentNode} [container=document]
         */
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i = 0, element; element = elements[i++]; ) {
            Prism3.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism3.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism3.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => CodeViewPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// src/prism.ts
var import_prismjs = __toESM(require_prism());

// node_modules/prismjs/components/prism-markup-templating.js
(function(Prism3) {
  function getPlaceholder(language, index) {
    return "___" + language.toUpperCase() + index + "___";
  }
  Object.defineProperties(Prism3.languages["markup-templating"] = {}, {
    buildPlaceholders: {
      /**
       * Tokenize all inline templating expressions matching `placeholderPattern`.
       *
       * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
       * `true` will be replaced.
       *
       * @param {object} env The environment of the `before-tokenize` hook.
       * @param {string} language The language id.
       * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
       * @param {(match: string) => boolean} [replaceFilter]
       */
      value: function(env, language, placeholderPattern, replaceFilter) {
        if (env.language !== language) {
          return;
        }
        var tokenStack = env.tokenStack = [];
        env.code = env.code.replace(placeholderPattern, function(match) {
          if (typeof replaceFilter === "function" && !replaceFilter(match)) {
            return match;
          }
          var i = tokenStack.length;
          var placeholder;
          while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
            ++i;
          }
          tokenStack[i] = match;
          return placeholder;
        });
        env.grammar = Prism3.languages.markup;
      }
    },
    tokenizePlaceholders: {
      /**
       * Replace placeholders with proper tokens after tokenizing.
       *
       * @param {object} env The environment of the `after-tokenize` hook.
       * @param {string} language The language id.
       */
      value: function(env, language) {
        if (env.language !== language || !env.tokenStack) {
          return;
        }
        env.grammar = Prism3.languages[language];
        var j = 0;
        var keys = Object.keys(env.tokenStack);
        function walkTokens(tokens) {
          for (var i = 0; i < tokens.length; i++) {
            if (j >= keys.length) {
              break;
            }
            var token = tokens[i];
            if (typeof token === "string" || token.content && typeof token.content === "string") {
              var k = keys[j];
              var t = env.tokenStack[k];
              var s = typeof token === "string" ? token : token.content;
              var placeholder = getPlaceholder(language, k);
              var index = s.indexOf(placeholder);
              if (index > -1) {
                ++j;
                var before = s.substring(0, index);
                var middle = new Prism3.Token(language, Prism3.tokenize(t, env.grammar), "language-" + language, t);
                var after = s.substring(index + placeholder.length);
                var replacement = [];
                if (before) {
                  replacement.push.apply(replacement, walkTokens([before]));
                }
                replacement.push(middle);
                if (after) {
                  replacement.push.apply(replacement, walkTokens([after]));
                }
                if (typeof token === "string") {
                  tokens.splice.apply(tokens, [i, 1].concat(replacement));
                } else {
                  token.content = replacement;
                }
              }
            } else if (token.content) {
              walkTokens(token.content);
            }
          }
          return tokens;
        }
        walkTokens(env.tokens);
      }
    }
  });
})(Prism);

// node_modules/prismjs/components/prism-clike.js
Prism.languages.clike = {
  "comment": [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }
  ],
  "string": {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      "punctuation": /[.\\]/
    }
  },
  "keyword": /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  "boolean": /\b(?:false|true)\b/,
  "function": /\b\w+(?=\()/,
  "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  "punctuation": /[{}[\];(),.:]/
};

// node_modules/prismjs/components/prism-c.js
Prism.languages.c = Prism.languages.extend("clike", {
  "comment": {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  "string": {
    // https://en.cppreference.com/w/c/language/string_literal
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: true
  },
  "class-name": {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: true
  },
  "keyword": /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "number": /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  "operator": />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
});
Prism.languages.insertBefore("c", "string", {
  "char": {
    // https://en.cppreference.com/w/c/language/character_constant
    pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
    greedy: true
  }
});
Prism.languages.insertBefore("c", "string", {
  "macro": {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: true,
    greedy: true,
    alias: "property",
    inside: {
      "string": [
        {
          // highlight the path of the include statement as a string
          pattern: /^(#\s*include\s*)<[^>]+>/,
          lookbehind: true
        },
        Prism.languages.c["string"]
      ],
      "char": Prism.languages.c["char"],
      "comment": Prism.languages.c["comment"],
      "macro-name": [
        {
          pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
          lookbehind: true
        },
        {
          pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
          lookbehind: true,
          alias: "function"
        }
      ],
      // highlight macro directives as keywords
      "directive": {
        pattern: /^(#\s*)[a-z]+/,
        lookbehind: true,
        alias: "keyword"
      },
      "directive-hash": /^#/,
      "punctuation": /##|\\(?=[\r\n])/,
      "expression": {
        pattern: /\S[\s\S]*/,
        inside: Prism.languages.c
      }
    }
  }
});
Prism.languages.insertBefore("c", "function", {
  // highlight predefined macros as constants
  "constant": /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
});
delete Prism.languages.c["boolean"];

// node_modules/prismjs/components/prism-cpp.js
(function(Prism3) {
  var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
  var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function() {
    return keyword.source;
  });
  Prism3.languages.cpp = Prism3.languages.extend("c", {
    "class-name": [
      {
        pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function() {
          return keyword.source;
        })),
        lookbehind: true
      },
      // This is intended to capture the class name of method implementations like:
      //   void foo::bar() const {}
      // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
      // it starts with an uppercase letter. This approximation should give decent results.
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      // This will capture the class name before destructors like:
      //   Foo::~Foo() {}
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      // This also intends to capture the class name of method implementations but here the class has template
      // parameters, so it can't be a namespace (until C++ adds generic namespaces).
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
    ],
    "keyword": keyword,
    "number": {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: true
    },
    "operator": />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    "boolean": /\b(?:false|true)\b/
  });
  Prism3.languages.insertBefore("cpp", "string", {
    "module": {
      // https://en.cppreference.com/w/cpp/language/modules
      pattern: RegExp(
        /(\b(?:import|module)\s+)/.source + "(?:" + // header-name
        /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + "|" + // module name or partition or both
        /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function() {
          return modName;
        }) + ")"
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "string": /^[<"][\s\S]+/,
        "operator": /:/,
        "punctuation": /\./
      }
    },
    "raw-string": {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: "string",
      greedy: true
    }
  });
  Prism3.languages.insertBefore("cpp", "keyword", {
    "generic-function": {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        "function": /^\w+/,
        "generic": {
          pattern: /<[\s\S]+/,
          alias: "class-name",
          inside: Prism3.languages.cpp
        }
      }
    }
  });
  Prism3.languages.insertBefore("cpp", "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  });
  Prism3.languages.insertBefore("cpp", "class-name", {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    "base-clause": {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: true,
      greedy: true,
      inside: Prism3.languages.extend("cpp", {})
    }
  });
  Prism3.languages.insertBefore("inside", "double-colon", {
    // All untokenized words that are not namespaces should be class names
    "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
  }, Prism3.languages.cpp["base-clause"]);
})(Prism);

// node_modules/prismjs/components/prism-csharp.js
(function(Prism3) {
  function replace(pattern, replacements) {
    return pattern.replace(/<<(\d+)>>/g, function(m, index) {
      return "(?:" + replacements[+index] + ")";
    });
  }
  function re(pattern, replacements, flags) {
    return RegExp(replace(pattern, replacements), flags || "");
  }
  function nested(pattern, depthLog2) {
    for (var i = 0; i < depthLog2; i++) {
      pattern = pattern.replace(/<<self>>/g, function() {
        return "(?:" + pattern + ")";
      });
    }
    return pattern.replace(/<<self>>/g, "[^\\s\\S]");
  }
  var keywordKinds = {
    // keywords which represent a return or variable type
    type: "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
    // keywords which are used to declare a type
    typeDeclaration: "class enum interface record struct",
    // contextual keywords
    // ("var" and "dynamic" are missing because they are used like types)
    contextual: "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
    // all other keywords
    other: "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield"
  };
  function keywordsToPattern(words) {
    return "\\b(?:" + words.trim().replace(/ /g, "|") + ")\\b";
  }
  var typeDeclarationKeywords = keywordsToPattern(keywordKinds.typeDeclaration);
  var keywords = RegExp(keywordsToPattern(keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other));
  var nonTypeKeywords = keywordsToPattern(keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other);
  var nonContextualKeywords = keywordsToPattern(keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.other);
  var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2);
  var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
  var name = /@?\b[A-Za-z_]\w*\b/.source;
  var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
  var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [nonTypeKeywords, genericName]);
  var array = /\[\s*(?:,\s*)*\]/.source;
  var typeExpressionWithoutTuple = replace(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [identifier, array]);
  var tupleElement = replace(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [generic, nestedRound, array]);
  var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
  var typeExpression = replace(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [tuple, identifier, array]);
  var typeInside = {
    "keyword": keywords,
    "punctuation": /[<>()?,.:[\]]/
  };
  var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source;
  var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
  var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
  Prism3.languages.csharp = Prism3.languages.extend("clike", {
    "string": [
      {
        pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
        lookbehind: true,
        greedy: true
      },
      {
        pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
        lookbehind: true,
        greedy: true
      }
    ],
    "class-name": [
      {
        // Using static
        // using static System.Math;
        pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [identifier]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Using alias (type)
        // using Project = PC.MyCompany.Project;
        pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [name, typeExpression]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Using alias (alias)
        // using Project = PC.MyCompany.Project;
        pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
        lookbehind: true
      },
      {
        // Type declarations
        // class Foo<A, B>
        // interface Foo<out A, B>
        pattern: re(/(\b<<0>>\s+)<<1>>/.source, [typeDeclarationKeywords, genericName]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Single catch exception declaration
        // catch(Foo)
        // (things like catch(Foo e) is covered by variable declaration)
        pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Name of the type parameter of generic constraints
        // where Foo : class
        pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
        lookbehind: true
      },
      {
        // Casts and checks via as and is.
        // as Foo<A>, is Bar<B>
        // (things like if(a is Foo b) is covered by variable declaration)
        pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [typeExpressionWithoutTuple]),
        lookbehind: true,
        inside: typeInside
      },
      {
        // Variable, field and parameter declaration
        // (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
        pattern: re(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source, [typeExpression, nonContextualKeywords, name]),
        inside: typeInside
      }
    ],
    "keyword": keywords,
    // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
    "number": /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    "operator": />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    "punctuation": /\?\.?|::|[{}[\];(),.:]/
  });
  Prism3.languages.insertBefore("csharp", "number", {
    "range": {
      pattern: /\.\./,
      alias: "operator"
    }
  });
  Prism3.languages.insertBefore("csharp", "punctuation", {
    "named-parameter": {
      pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
      lookbehind: true,
      alias: "punctuation"
    }
  });
  Prism3.languages.insertBefore("csharp", "class-name", {
    "namespace": {
      // namespace Foo.Bar {}
      // using Foo.Bar;
      pattern: re(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source, [name]),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    },
    "type-expression": {
      // default(Foo), typeof(Foo<Bar>), sizeof(int)
      pattern: re(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source, [nestedRound]),
      lookbehind: true,
      alias: "class-name",
      inside: typeInside
    },
    "return-type": {
      // Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
      // int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
      // int Foo => 0; int Foo { get; set } = 0;
      pattern: re(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source, [typeExpression, identifier]),
      inside: typeInside,
      alias: "class-name"
    },
    "constructor-invocation": {
      // new List<Foo<Bar[]>> { }
      pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
      lookbehind: true,
      inside: typeInside,
      alias: "class-name"
    },
    /*'explicit-implementation': {
    	// int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
    	pattern: replace(/\b<<0>>(?=\.<<1>>)/, className, methodOrPropertyDeclaration),
    	inside: classNameInside,
    	alias: 'class-name'
    },*/
    "generic-method": {
      // foo<Bar>()
      pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
      inside: {
        "function": re(/^<<0>>/.source, [name]),
        "generic": {
          pattern: RegExp(generic),
          alias: "class-name",
          inside: typeInside
        }
      }
    },
    "type-list": {
      // The list of types inherited or of generic constraints
      // class Foo<F> : Bar, IList<FooBar>
      // where F : Bar, IList<int>
      pattern: re(
        /\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,
        [typeDeclarationKeywords, genericName, name, typeExpression, keywords.source, nestedRound, /\bnew\s*\(\s*\)/.source]
      ),
      lookbehind: true,
      inside: {
        "record-arguments": {
          pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [genericName, nestedRound]),
          lookbehind: true,
          greedy: true,
          inside: Prism3.languages.csharp
        },
        "keyword": keywords,
        "class-name": {
          pattern: RegExp(typeExpression),
          greedy: true,
          inside: typeInside
        },
        "punctuation": /[,()]/
      }
    },
    "preprocessor": {
      pattern: /(^[\t ]*)#.*/m,
      lookbehind: true,
      alias: "property",
      inside: {
        // highlight preprocessor directives as keywords
        "directive": {
          pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
          lookbehind: true,
          alias: "keyword"
        }
      }
    }
  });
  var regularStringOrCharacter = regularString + "|" + character;
  var regularStringCharacterOrComment = replace(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source, [regularStringOrCharacter]);
  var roundExpression = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
  var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
  var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [identifier, roundExpression]);
  Prism3.languages.insertBefore("csharp", "class-name", {
    "attribute": {
      // Attributes
      // [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
      pattern: re(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source, [attrTarget, attr]),
      lookbehind: true,
      greedy: true,
      inside: {
        "target": {
          pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
          alias: "keyword"
        },
        "attribute-arguments": {
          pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
          inside: Prism3.languages.csharp
        },
        "class-name": {
          pattern: RegExp(identifier),
          inside: {
            "punctuation": /\./
          }
        },
        "punctuation": /[:,]/
      }
    }
  });
  var formatString = /:[^}\r\n]+/.source;
  var mInterpolationRound = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
  var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [mInterpolationRound, formatString]);
  var sInterpolationRound = nested(replace(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source, [regularStringOrCharacter]), 2);
  var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [sInterpolationRound, formatString]);
  function createInterpolationInside(interpolation, interpolationRound) {
    return {
      "interpolation": {
        pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
        lookbehind: true,
        inside: {
          "format-string": {
            pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [interpolationRound, formatString]),
            lookbehind: true,
            inside: {
              "punctuation": /^:/
            }
          },
          "punctuation": /^\{|\}$/,
          "expression": {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: Prism3.languages.csharp
          }
        }
      },
      "string": /[\s\S]+/
    };
  }
  Prism3.languages.insertBefore("csharp", "string", {
    "interpolation-string": [
      {
        pattern: re(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source, [mInterpolation]),
        lookbehind: true,
        greedy: true,
        inside: createInterpolationInside(mInterpolation, mInterpolationRound)
      },
      {
        pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [sInterpolation]),
        lookbehind: true,
        greedy: true,
        inside: createInterpolationInside(sInterpolation, sInterpolationRound)
      }
    ],
    "char": {
      pattern: RegExp(character),
      greedy: true
    }
  });
  Prism3.languages.dotnet = Prism3.languages.cs = Prism3.languages.csharp;
})(Prism);

// node_modules/prismjs/components/prism-glsl.js
Prism.languages.glsl = Prism.languages.extend("c", {
  "keyword": /\b(?:active|asm|atomic_uint|attribute|[ibdu]?vec[234]|bool|break|buffer|case|cast|centroid|class|coherent|common|const|continue|d?mat[234](?:x[234])?|default|discard|do|double|else|enum|extern|external|false|filter|fixed|flat|float|for|fvec[234]|goto|half|highp|hvec[234]|[iu]?sampler2DMS(?:Array)?|[iu]?sampler2DRect|[iu]?samplerBuffer|[iu]?samplerCube|[iu]?samplerCubeArray|[iu]?sampler[123]D|[iu]?sampler[12]DArray|[iu]?image2DMS(?:Array)?|[iu]?image2DRect|[iu]?imageBuffer|[iu]?imageCube|[iu]?imageCubeArray|[iu]?image[123]D|[iu]?image[12]DArray|if|in|inline|inout|input|int|interface|invariant|layout|long|lowp|mediump|namespace|noinline|noperspective|out|output|partition|patch|precise|precision|public|readonly|resource|restrict|return|sample|sampler[12]DArrayShadow|sampler[12]DShadow|sampler2DRectShadow|sampler3DRect|samplerCubeArrayShadow|samplerCubeShadow|shared|short|sizeof|smooth|static|struct|subroutine|superp|switch|template|this|true|typedef|uint|uniform|union|unsigned|using|varying|void|volatile|while|writeonly)\b/
});

// node_modules/prismjs/components/prism-java.js
(function(Prism3) {
  var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
  var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
  var className = {
    pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
    lookbehind: true,
    inside: {
      "namespace": {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: {
          "punctuation": /\./
        }
      },
      "punctuation": /\./
    }
  };
  Prism3.languages.java = Prism3.languages.extend("clike", {
    "string": {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
      lookbehind: true,
      greedy: true
    },
    "class-name": [
      className,
      {
        // variables, parameters, and constructor references
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
        lookbehind: true,
        inside: className.inside
      },
      {
        // class names based on keyword
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source),
        lookbehind: true,
        inside: className.inside
      }
    ],
    "keyword": keywords,
    "function": [
      Prism3.languages.clike.function,
      {
        pattern: /(::\s*)[a-z_]\w*/,
        lookbehind: true
      }
    ],
    "number": /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    "operator": {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: true
    },
    "constant": /\b[A-Z][A-Z_\d]+\b/
  });
  Prism3.languages.insertBefore("java", "string", {
    "triple-quoted-string": {
      // http://openjdk.java.net/jeps/355#Description
      pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
      greedy: true,
      alias: "string"
    },
    "char": {
      pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
      greedy: true
    }
  });
  Prism3.languages.insertBefore("java", "class-name", {
    "annotation": {
      pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
      lookbehind: true,
      alias: "punctuation"
    },
    "generics": {
      pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
      inside: {
        "class-name": className,
        "keyword": keywords,
        "punctuation": /[<>(),.:]/,
        "operator": /[?&|]/
      }
    },
    "import": [
      {
        pattern: RegExp(/(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
        lookbehind: true,
        inside: {
          "namespace": className.inside.namespace,
          "punctuation": /\./,
          "operator": /\*/,
          "class-name": /\w+/
        }
      },
      {
        pattern: RegExp(/(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source),
        lookbehind: true,
        alias: "static",
        inside: {
          "namespace": className.inside.namespace,
          "static": /\b\w+$/,
          "punctuation": /\./,
          "operator": /\*/,
          "class-name": /\w+/
        }
      }
    ],
    "namespace": {
      pattern: RegExp(
        /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function() {
          return keywords.source;
        })
      ),
      lookbehind: true,
      inside: {
        "punctuation": /\./
      }
    }
  });
})(Prism);

// node_modules/prismjs/components/prism-kotlin.js
(function(Prism3) {
  Prism3.languages.kotlin = Prism3.languages.extend("clike", {
    "keyword": {
      // The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
      pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
      lookbehind: true
    },
    "function": [
      {
        pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
        greedy: true
      },
      {
        pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
        lookbehind: true,
        greedy: true
      }
    ],
    "number": /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    "operator": /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
  });
  delete Prism3.languages.kotlin["class-name"];
  var interpolationInside = {
    "interpolation-punctuation": {
      pattern: /^\$\{?|\}$/,
      alias: "punctuation"
    },
    "expression": {
      pattern: /[\s\S]+/,
      inside: Prism3.languages.kotlin
    }
  };
  Prism3.languages.insertBefore("kotlin", "string", {
    // https://kotlinlang.org/spec/expressions.html#string-interpolation-expressions
    "string-literal": [
      {
        pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
        alias: "multiline",
        inside: {
          "interpolation": {
            pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
            inside: interpolationInside
          },
          "string": /[\s\S]+/
        }
      },
      {
        pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
        alias: "singleline",
        inside: {
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
            lookbehind: true,
            inside: interpolationInside
          },
          "string": /[\s\S]+/
        }
      }
    ],
    "char": {
      // https://kotlinlang.org/spec/expressions.html#character-literals
      pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/,
      greedy: true
    }
  });
  delete Prism3.languages.kotlin["string"];
  Prism3.languages.insertBefore("kotlin", "keyword", {
    "annotation": {
      pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
      alias: "builtin"
    }
  });
  Prism3.languages.insertBefore("kotlin", "function", {
    "label": {
      pattern: /\b\w+@|@\w+\b/,
      alias: "symbol"
    }
  });
  Prism3.languages.kt = Prism3.languages.kotlin;
  Prism3.languages.kts = Prism3.languages.kotlin;
})(Prism);

// node_modules/prismjs/components/prism-swift.js
Prism.languages.swift = {
  "comment": {
    // Nested comments are supported up to 2 levels
    pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
    lookbehind: true,
    greedy: true
  },
  "string-literal": [
    // https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html
    {
      pattern: RegExp(
        /(^|[^"#])/.source + "(?:" + /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source + "|" + /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source + ")" + /(?!["#])/.source
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
          lookbehind: true,
          inside: null
          // see below
        },
        "interpolation-punctuation": {
          pattern: /^\)|\\\($/,
          alias: "punctuation"
        },
        "punctuation": /\\(?=[\r\n])/,
        "string": /[\s\S]+/
      }
    },
    {
      pattern: RegExp(
        /(^|[^"#])(#+)/.source + "(?:" + /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source + "|" + /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source + ")\\2"
      ),
      lookbehind: true,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
          lookbehind: true,
          inside: null
          // see below
        },
        "interpolation-punctuation": {
          pattern: /^\)|\\#+\($/,
          alias: "punctuation"
        },
        "string": /[\s\S]+/
      }
    }
  ],
  "directive": {
    // directives with conditions
    pattern: RegExp(
      /#/.source + "(?:" + (/(?:elseif|if)\b/.source + "(?:[ 	]*" + /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source + ")+") + "|" + /(?:else|endif)\b/.source + ")"
    ),
    alias: "property",
    inside: {
      "directive-name": /^#\w+/,
      "boolean": /\b(?:false|true)\b/,
      "number": /\b\d+(?:\.\d+)*\b/,
      "operator": /!|&&|\|\||[<>]=?/,
      "punctuation": /[(),]/
    }
  },
  "literal": {
    pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
    alias: "constant"
  },
  "other-directive": {
    pattern: /#\w+\b/,
    alias: "property"
  },
  "attribute": {
    pattern: /@\w+/,
    alias: "atrule"
  },
  "function-definition": {
    pattern: /(\bfunc\s+)\w+/,
    lookbehind: true,
    alias: "function"
  },
  "label": {
    // https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID141
    pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
    lookbehind: true,
    alias: "important"
  },
  "keyword": /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
  "boolean": /\b(?:false|true)\b/,
  "nil": {
    pattern: /\bnil\b/,
    alias: "constant"
  },
  "short-argument": /\$\d+\b/,
  "omit": {
    pattern: /\b_\b/,
    alias: "keyword"
  },
  "number": /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  // A class name must start with an upper-case letter and be either 1 letter long or contain a lower-case letter.
  "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
  "function": /\b[a-z_]\w*(?=\s*\()/i,
  "constant": /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  // Operators are generic in Swift. Developers can even create new operators (e.g. +++).
  // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html#ID481
  // This regex only supports ASCII operators.
  "operator": /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
  "punctuation": /[{}[\]();,.:\\]/
};
Prism.languages.swift["string-literal"].forEach(function(rule) {
  rule.inside["interpolation"].inside = Prism.languages.swift;
});

// node_modules/prismjs/components/prism-dart.js
(function(Prism3) {
  var keywords = [
    /\b(?:async|sync|yield)\*/,
    /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/
  ];
  var packagePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
  var className = {
    pattern: RegExp(packagePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
    lookbehind: true,
    inside: {
      "namespace": {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: {
          "punctuation": /\./
        }
      }
    }
  };
  Prism3.languages.dart = Prism3.languages.extend("clike", {
    "class-name": [
      className,
      {
        // variables and parameters
        // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
        pattern: RegExp(packagePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source),
        lookbehind: true,
        inside: className.inside
      }
    ],
    "keyword": keywords,
    "operator": /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
  });
  Prism3.languages.insertBefore("dart", "string", {
    "string-literal": {
      pattern: /r?(?:("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\\\r\n])*\2(?!\2))/,
      greedy: true,
      inside: {
        "interpolation": {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
          lookbehind: true,
          inside: {
            "punctuation": /^\$\{?|\}$/,
            "expression": {
              pattern: /[\s\S]+/,
              inside: Prism3.languages.dart
            }
          }
        },
        "string": /[\s\S]+/
      }
    },
    "string": void 0
  });
  Prism3.languages.insertBefore("dart", "class-name", {
    "metadata": {
      pattern: /@\w+/,
      alias: "function"
    }
  });
  Prism3.languages.insertBefore("dart", "class-name", {
    "generics": {
      pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
      inside: {
        "class-name": className,
        "keyword": keywords,
        "punctuation": /[<>(),.:]/,
        "operator": /[?&|]/
      }
    }
  });
})(Prism);

// node_modules/prismjs/components/prism-go.js
Prism.languages.go = Prism.languages.extend("clike", {
  "string": {
    pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
    lookbehind: true,
    greedy: true
  },
  "keyword": /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  "boolean": /\b(?:_|false|iota|nil|true)\b/,
  "number": [
    // binary and octal integers
    /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
    // hexadecimal integers and floats
    /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    // decimal integers and floats
    /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
  ],
  "operator": /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  "builtin": /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
});
Prism.languages.insertBefore("go", "string", {
  "char": {
    pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
    greedy: true
  }
});
delete Prism.languages.go["class-name"];

// node_modules/prismjs/components/prism-rust.js
(function(Prism3) {
  var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
  for (var i = 0; i < 2; i++) {
    multilineComment = multilineComment.replace(/<self>/g, function() {
      return multilineComment;
    });
  }
  multilineComment = multilineComment.replace(/<self>/g, function() {
    return /[^\s\S]/.source;
  });
  Prism3.languages.rust = {
    "comment": [
      {
        pattern: RegExp(/(^|[^\\])/.source + multilineComment),
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    "string": {
      pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
      greedy: true
    },
    "char": {
      pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
      greedy: true
    },
    "attribute": {
      pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
      greedy: true,
      alias: "attr-name",
      inside: {
        "string": null
        // see below
      }
    },
    // Closure params should not be confused with bitwise OR |
    "closure-params": {
      pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
      lookbehind: true,
      greedy: true,
      inside: {
        "closure-punctuation": {
          pattern: /^\||\|$/,
          alias: "punctuation"
        },
        rest: null
        // see below
      }
    },
    "lifetime-annotation": {
      pattern: /'\w+/,
      alias: "symbol"
    },
    "fragment-specifier": {
      pattern: /(\$\w+:)[a-z]+/,
      lookbehind: true,
      alias: "punctuation"
    },
    "variable": /\$\w+/,
    "function-definition": {
      pattern: /(\bfn\s+)\w+/,
      lookbehind: true,
      alias: "function"
    },
    "type-definition": {
      pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
      lookbehind: true,
      alias: "class-name"
    },
    "module-declaration": [
      {
        pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
        lookbehind: true,
        alias: "namespace"
      },
      {
        pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
        lookbehind: true,
        alias: "namespace",
        inside: {
          "punctuation": /::/
        }
      }
    ],
    "keyword": [
      // https://github.com/rust-lang/reference/blob/master/src/keywords.md
      /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
      // primitives and str
      // https://doc.rust-lang.org/stable/rust-by-example/primitives.html
      /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
    ],
    // functions can technically start with an upper-case letter, but this will introduce a lot of false positives
    // and Rust's naming conventions recommend snake_case anyway.
    // https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
    "function": /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
    "macro": {
      pattern: /\b\w+!/,
      alias: "property"
    },
    "constant": /\b[A-Z_][A-Z_\d]+\b/,
    "class-name": /\b[A-Z]\w*\b/,
    "namespace": {
      pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
      inside: {
        "punctuation": /::/
      }
    },
    // Hex, oct, bin, dec numbers with visual separators and type suffix
    "number": /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
    "boolean": /\b(?:false|true)\b/,
    "punctuation": /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    "operator": /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
  };
  Prism3.languages.rust["closure-params"].inside.rest = Prism3.languages.rust;
  Prism3.languages.rust["attribute"].inside["string"] = Prism3.languages.rust["string"];
})(Prism);

// node_modules/prismjs/components/prism-protobuf.js
(function(Prism3) {
  var builtinTypes = /\b(?:bool|bytes|double|s?fixed(?:32|64)|float|[su]?int(?:32|64)|string)\b/;
  Prism3.languages.protobuf = Prism3.languages.extend("clike", {
    "class-name": [
      {
        pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
        lookbehind: true
      },
      {
        pattern: /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s*\))/,
        lookbehind: true
      }
    ],
    "keyword": /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
    "function": /\b[a-z_]\w*(?=\s*\()/i
  });
  Prism3.languages.insertBefore("protobuf", "operator", {
    "map": {
      pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i,
      alias: "class-name",
      inside: {
        "punctuation": /[<>.,]/,
        "builtin": builtinTypes
      }
    },
    "builtin": builtinTypes,
    "positional-class-name": {
      pattern: /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i,
      alias: "class-name",
      inside: {
        "punctuation": /\./
      }
    },
    "annotation": {
      pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i,
      lookbehind: true
    }
  });
})(Prism);

// node_modules/prismjs/components/prism-javascript.js
Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: true
    }
  ],
  "keyword": [
    {
      pattern: /((?:^|\})\s*)catch\b/,
      lookbehind: true
    },
    {
      pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: true
    }
  ],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  "number": {
    pattern: RegExp(
      /(^|[^\w$])/.source + "(?:" + // constant
      (/NaN|Infinity/.source + "|" + // binary integer
      /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
      /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
      /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
      /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
      /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
    ),
    lookbehind: true
  },
  "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore("javascript", "keyword", {
  "regex": {
    pattern: RegExp(
      // lookbehind
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source + // Regex pattern:
      // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
      // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
      // with the only syntax, so we have to define 2 different regex patterns.
      /\//.source + "(?:" + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + "|" + // `v` flag syntax. This supports 3 levels of nested character classes.
      /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ")" + // lookahead
      /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
    ),
    lookbehind: true,
    greedy: true,
    inside: {
      "regex-source": {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: "language-regex",
        inside: Prism.languages.regex
      },
      "regex-delimiter": /^\/|\/$/,
      "regex-flags": /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  "function-variable": {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: "function"
  },
  "parameter": [
    {
      pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    },
    {
      pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
      lookbehind: true,
      inside: Prism.languages.javascript
    }
  ],
  "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore("javascript", "string", {
  "hashbang": {
    pattern: /^#!.*/,
    greedy: true,
    alias: "comment"
  },
  "template-string": {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      "template-punctuation": {
        pattern: /^`|`$/,
        alias: "string"
      },
      "interpolation": {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          "interpolation-punctuation": {
            pattern: /^\$\{|\}$/,
            alias: "punctuation"
          },
          rest: Prism.languages.javascript
        }
      },
      "string": /[\s\S]+/
    }
  },
  "string-property": {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: "property"
  }
});
Prism.languages.insertBefore("javascript", "operator", {
  "literal-property": {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: "property"
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined("script", "javascript");
  Prism.languages.markup.tag.addAttribute(
    /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
    "javascript"
  );
}
Prism.languages.js = Prism.languages.javascript;

// node_modules/prismjs/components/prism-typescript.js
(function(Prism3) {
  Prism3.languages.typescript = Prism3.languages.extend("javascript", {
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null
      // see below
    },
    "builtin": /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  });
  Prism3.languages.typescript.keyword.push(
    /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
    // keywords that have to be followed by an identifier
    /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
    // This is for `import type *, {}`
    /\btype\b(?=\s*(?:[\{*]|$))/
  );
  delete Prism3.languages.typescript["parameter"];
  delete Prism3.languages.typescript["literal-property"];
  var typeInside = Prism3.languages.extend("typescript", {});
  delete typeInside["class-name"];
  Prism3.languages.typescript["class-name"].inside = typeInside;
  Prism3.languages.insertBefore("typescript", "function", {
    "decorator": {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        "at": {
          pattern: /^@/,
          alias: "operator"
        },
        "function": /^[\s\S]+/
      }
    },
    "generic-function": {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        "function": /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        "generic": {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: "class-name",
          inside: typeInside
        }
      }
    }
  });
  Prism3.languages.ts = Prism3.languages.typescript;
})(Prism);

// node_modules/prismjs/components/prism-jsx.js
(function(Prism3) {
  var javascript = Prism3.util.clone(Prism3.languages.javascript);
  var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
  var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
  var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
  function re(source, flags) {
    source = source.replace(/<S>/g, function() {
      return space;
    }).replace(/<BRACES>/g, function() {
      return braces;
    }).replace(/<SPREAD>/g, function() {
      return spread;
    });
    return RegExp(source, flags);
  }
  spread = re(spread).source;
  Prism3.languages.jsx = Prism3.languages.extend("markup", javascript);
  Prism3.languages.jsx.tag.pattern = re(
    /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
  );
  Prism3.languages.jsx.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/;
  Prism3.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
  Prism3.languages.jsx.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism3.languages.jsx.tag.inside["comment"] = javascript["comment"];
  Prism3.languages.insertBefore("inside", "attr-name", {
    "spread": {
      pattern: re(/<SPREAD>/.source),
      inside: Prism3.languages.jsx
    }
  }, Prism3.languages.jsx.tag);
  Prism3.languages.insertBefore("inside", "special-attr", {
    "script": {
      // Allow for two levels of nesting
      pattern: re(/=<BRACES>/.source),
      alias: "language-javascript",
      inside: {
        "script-punctuation": {
          pattern: /^=(?=\{)/,
          alias: "punctuation"
        },
        rest: Prism3.languages.jsx
      }
    }
  }, Prism3.languages.jsx.tag);
  var stringifyToken = function(token) {
    if (!token) {
      return "";
    }
    if (typeof token === "string") {
      return token;
    }
    if (typeof token.content === "string") {
      return token.content;
    }
    return token.content.map(stringifyToken).join("");
  };
  var walkTokens = function(tokens) {
    var openedTags = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var notTagNorBrace = false;
      if (typeof token !== "string") {
        if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
          if (token.content[0].content[0].content === "</") {
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === "/>") {
            } else {
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") {
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace || typeof token === "string") {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          var plainText = stringifyToken(token);
          if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }
          if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }
          tokens[i] = new Prism3.Token("plain-text", plainText, null, plainText);
        }
      }
      if (token.content && typeof token.content !== "string") {
        walkTokens(token.content);
      }
    }
  };
  Prism3.hooks.add("after-tokenize", function(env) {
    if (env.language !== "jsx" && env.language !== "tsx") {
      return;
    }
    walkTokens(env.tokens);
  });
})(Prism);

// node_modules/prismjs/components/prism-tsx.js
(function(Prism3) {
  var typescript = Prism3.util.clone(Prism3.languages.typescript);
  Prism3.languages.tsx = Prism3.languages.extend("jsx", typescript);
  delete Prism3.languages.tsx["parameter"];
  delete Prism3.languages.tsx["literal-property"];
  var tag = Prism3.languages.tsx.tag;
  tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")", tag.pattern.flags);
  tag.lookbehind = true;
})(Prism);

// node_modules/prismjs/components/prism-python.js
Prism.languages.python = {
  "comment": {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true,
    greedy: true
  },
  "string-interpolation": {
    pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: true,
    inside: {
      "interpolation": {
        // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
        pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: true,
        inside: {
          "format-spec": {
            pattern: /(:)[^:(){}]+(?=\}$)/,
            lookbehind: true
          },
          "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation"
          },
          rest: null
        }
      },
      "string": /[\s\S]+/
    }
  },
  "triple-quoted-string": {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: true,
    alias: "string"
  },
  "string": {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: true
  },
  "function": {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: true
  },
  "class-name": {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: true
  },
  "decorator": {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: true,
    alias: ["annotation", "punctuation"],
    inside: {
      "punctuation": /\./
    }
  },
  "keyword": /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  "builtin": /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  "boolean": /\b(?:False|None|True)\b/,
  "number": /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  "operator": /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  "punctuation": /[{}[\];(),.:]/
};
Prism.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism.languages.python;
Prism.languages.py = Prism.languages.python;

// node_modules/prismjs/components/prism-ruby.js
(function(Prism3) {
  Prism3.languages.ruby = Prism3.languages.extend("clike", {
    "comment": {
      pattern: /#.*|^=begin\s[\s\S]*?^=end/m,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
      lookbehind: true,
      inside: {
        "punctuation": /[.\\]/
      }
    },
    "keyword": /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    "operator": /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
    "punctuation": /[(){}[\].,;]/
  });
  Prism3.languages.insertBefore("ruby", "operator", {
    "double-colon": {
      pattern: /::/,
      alias: "punctuation"
    }
  });
  var interpolation = {
    pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
    lookbehind: true,
    inside: {
      "content": {
        pattern: /^(#\{)[\s\S]+(?=\}$)/,
        lookbehind: true,
        inside: Prism3.languages.ruby
      },
      "delimiter": {
        pattern: /^#\{|\}$/,
        alias: "punctuation"
      }
    }
  };
  delete Prism3.languages.ruby.function;
  var percentExpression = "(?:" + [
    /([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
    /\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,
    /\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,
    /\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,
    /<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source
  ].join("|") + ")";
  var symbolName = /(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;
  Prism3.languages.insertBefore("ruby", "keyword", {
    "regex-literal": [
      {
        pattern: RegExp(/%r/.source + percentExpression + /[egimnosux]{0,6}/.source),
        greedy: true,
        inside: {
          "interpolation": interpolation,
          "regex": /[\s\S]+/
        }
      },
      {
        pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "interpolation": interpolation,
          "regex": /[\s\S]+/
        }
      }
    ],
    "variable": /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    "symbol": [
      {
        pattern: RegExp(/(^|[^:]):/.source + symbolName),
        lookbehind: true,
        greedy: true
      },
      {
        pattern: RegExp(/([\r\n{(,][ \t]*)/.source + symbolName + /(?=:(?!:))/.source),
        lookbehind: true,
        greedy: true
      }
    ],
    "method-definition": {
      pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
      lookbehind: true,
      inside: {
        "function": /\b\w+$/,
        "keyword": /^self\b/,
        "class-name": /^\w+/,
        "punctuation": /\./
      }
    }
  });
  Prism3.languages.insertBefore("ruby", "string", {
    "string-literal": [
      {
        pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),
        greedy: true,
        inside: {
          "interpolation": interpolation,
          "string": /[\s\S]+/
        }
      },
      {
        pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
        greedy: true,
        inside: {
          "interpolation": interpolation,
          "string": /[\s\S]+/
        }
      },
      {
        pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
        alias: "heredoc-string",
        greedy: true,
        inside: {
          "delimiter": {
            pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
            inside: {
              "symbol": /\b\w+/,
              "punctuation": /^<<[-~]?/
            }
          },
          "interpolation": interpolation,
          "string": /[\s\S]+/
        }
      },
      {
        pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
        alias: "heredoc-string",
        greedy: true,
        inside: {
          "delimiter": {
            pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
            inside: {
              "symbol": /\b\w+/,
              "punctuation": /^<<[-~]?'|'$/
            }
          },
          "string": /[\s\S]+/
        }
      }
    ],
    "command-literal": [
      {
        pattern: RegExp(/%x/.source + percentExpression),
        greedy: true,
        inside: {
          "interpolation": interpolation,
          "command": {
            pattern: /[\s\S]+/,
            alias: "string"
          }
        }
      },
      {
        pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
        greedy: true,
        inside: {
          "interpolation": interpolation,
          "command": {
            pattern: /[\s\S]+/,
            alias: "string"
          }
        }
      }
    ]
  });
  delete Prism3.languages.ruby.string;
  Prism3.languages.insertBefore("ruby", "number", {
    "builtin": /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
    "constant": /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
  });
  Prism3.languages.rb = Prism3.languages.ruby;
})(Prism);

// node_modules/prismjs/components/prism-perl.js
(function(Prism3) {
  var brackets = /(?:\((?:[^()\\]|\\[\s\S])*\)|\{(?:[^{}\\]|\\[\s\S])*\}|\[(?:[^[\]\\]|\\[\s\S])*\]|<(?:[^<>\\]|\\[\s\S])*>)/.source;
  Prism3.languages.perl = {
    "comment": [
      {
        // POD
        pattern: /(^\s*)=\w[\s\S]*?=cut.*/m,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\$])#.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    // TODO Could be nice to handle Heredoc too.
    "string": [
      {
        pattern: RegExp(
          /\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
            // q/.../
            /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
            // q a...a
            // eslint-disable-next-line regexp/strict
            /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
            // q(...)
            // q{...}
            // q[...]
            // q<...>
            brackets
          ].join("|") + ")"
        ),
        greedy: true
      },
      // "...", `...`
      {
        pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: true
      },
      // '...'
      // FIXME Multi-line single-quoted strings are not supported as they would break variables containing '
      {
        pattern: /'(?:[^'\\\r\n]|\\.)*'/,
        greedy: true
      }
    ],
    "regex": [
      {
        pattern: RegExp(
          /\b(?:m|qr)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
            // m/.../
            /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
            // m a...a
            // eslint-disable-next-line regexp/strict
            /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
            // m(...)
            // m{...}
            // m[...]
            // m<...>
            brackets
          ].join("|") + ")" + /[msixpodualngc]*/.source
        ),
        greedy: true
      },
      // The lookbehinds prevent -s from breaking
      {
        pattern: RegExp(
          /(^|[^-])\b(?:s|tr|y)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
            // s/.../.../
            // eslint-disable-next-line regexp/strict
            /([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
            // s a...a...a
            // eslint-disable-next-line regexp/strict
            /([a-zA-Z0-9])(?:(?!\3)[^\\]|\\[\s\S])*\3(?:(?!\3)[^\\]|\\[\s\S])*\3/.source,
            // s(...)(...)
            // s{...}{...}
            // s[...][...]
            // s<...><...>
            // s(...)[...]
            brackets + /\s*/.source + brackets
          ].join("|") + ")" + /[msixpodualngcer]*/.source
        ),
        lookbehind: true,
        greedy: true
      },
      // /.../
      // The look-ahead tries to prevent two divisions on
      // the same line from being highlighted as regex.
      // This does not support multi-line regex.
      {
        pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,
        greedy: true
      }
    ],
    // FIXME Not sure about the handling of ::, ', and #
    "variable": [
      // ${^POSTMATCH}
      /[&*$@%]\{\^[A-Z]+\}/,
      // $^V
      /[&*$@%]\^[A-Z_]/,
      // ${...}
      /[&*$@%]#?(?=\{)/,
      // $foo
      /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,
      // $1
      /[&*$@%]\d+/,
      // $_, @_, %!
      // The negative lookahead prevents from breaking the %= operator
      /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/
    ],
    "filehandle": {
      // <>, <FOO>, _
      pattern: /<(?![<=])\S*?>|\b_\b/,
      alias: "symbol"
    },
    "v-string": {
      // v1.2, 1.2.3
      pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
      alias: "string"
    },
    "function": {
      pattern: /(\bsub[ \t]+)\w+/,
      lookbehind: true
    },
    "keyword": /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    "number": /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    "operator": /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,
    "punctuation": /[{}[\];(),:]/
  };
})(Prism);

// node_modules/prismjs/components/prism-r.js
Prism.languages.r = {
  "comment": /#.*/,
  "string": {
    pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "percent-operator": {
    // Includes user-defined operators
    // and %%, %*%, %/%, %in%, %o%, %x%
    pattern: /%[^%\s]*%/,
    alias: "operator"
  },
  "boolean": /\b(?:FALSE|TRUE)\b/,
  "ellipsis": /\.\.(?:\.|\d+)/,
  "number": [
    /\b(?:Inf|NaN)\b/,
    /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/
  ],
  "keyword": /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
  "operator": /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
  "punctuation": /[(){}\[\],;]/
};

// node_modules/prismjs/components/prism-lua.js
Prism.languages.lua = {
  "comment": /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
  // \z may be used to skip the following space
  "string": {
    pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
    greedy: true
  },
  "number": /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
  "keyword": /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
  "function": /(?!\d)\w+(?=\s*(?:[({]))/,
  "operator": [
    /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
    {
      // Match ".." but don't break "..."
      pattern: /(^|[^.])\.\.(?!\.)/,
      lookbehind: true
    }
  ],
  "punctuation": /[\[\](){},;]|\.+|:+/
};

// node_modules/prismjs/components/prism-php.js
(function(Prism3) {
  var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
  var constant = [
    {
      pattern: /\b(?:false|true)\b/i,
      alias: "boolean"
    },
    {
      pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
      greedy: true,
      lookbehind: true
    },
    {
      pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
      greedy: true,
      lookbehind: true
    },
    /\b(?:null)\b/i,
    /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/
  ];
  var number = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
  var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
  var punctuation = /[{}\[\](),:;]/;
  Prism3.languages.php = {
    "delimiter": {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: "important"
    },
    "comment": comment,
    "variable": /\$+(?:\w+\b|(?=\{))/,
    "package": {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "class-name-definition": {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: true,
      alias: "class-name"
    },
    "function-definition": {
      pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
      lookbehind: true,
      alias: "function"
    },
    "keyword": [
      {
        pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
        alias: "type-casting",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
        alias: "type-declaration",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b(?:parent|self|static)(?=\s*::)/i,
        alias: "static-context",
        greedy: true
      },
      {
        // yield from
        pattern: /(\byield\s+)from\b/i,
        lookbehind: true
      },
      // `class` is always a keyword unlike other keywords
      /\bclass\b/i,
      {
        // https://www.php.net/manual/en/reserved.keywords.php
        //
        // keywords cannot be preceded by "->"
        // the complex lookbehind means `(?<!(?:->|::)\s*)`
        pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
        lookbehind: true
      }
    ],
    "argument-name": {
      pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
      lookbehind: true
    },
    "class-name": [
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
        greedy: true
      },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: "class-name-fully-qualified",
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*\$)/i,
        alias: "type-declaration",
        greedy: true
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-declaration"],
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*::)/i,
        alias: "static-context",
        greedy: true
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ["class-name-fully-qualified", "static-context"],
        greedy: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
        alias: "type-hint",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ["class-name-fully-qualified", "type-hint"],
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
        alias: "return-type",
        greedy: true,
        lookbehind: true
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ["class-name-fully-qualified", "return-type"],
        greedy: true,
        lookbehind: true,
        inside: {
          "punctuation": /\\/
        }
      }
    ],
    "constant": constant,
    "function": {
      pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
      lookbehind: true,
      inside: {
        "punctuation": /\\/
      }
    },
    "property": {
      pattern: /(->\s*)\w+/,
      lookbehind: true
    },
    "number": number,
    "operator": operator,
    "punctuation": punctuation
  };
  var string_interpolation = {
    pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
    lookbehind: true,
    inside: Prism3.languages.php
  };
  var string = [
    {
      pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
      alias: "nowdoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<'?|[';]$/
          }
        }
      }
    },
    {
      pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
      alias: "heredoc-string",
      greedy: true,
      inside: {
        "delimiter": {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: {
            "punctuation": /^<<<"?|[";]$/
          }
        },
        "interpolation": string_interpolation
      }
    },
    {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      alias: "backtick-quoted-string",
      greedy: true
    },
    {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      alias: "single-quoted-string",
      greedy: true
    },
    {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      alias: "double-quoted-string",
      greedy: true,
      inside: {
        "interpolation": string_interpolation
      }
    }
  ];
  Prism3.languages.insertBefore("php", "variable", {
    "string": string,
    "attribute": {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: true,
      inside: {
        "attribute-content": {
          pattern: /^(#\[)[\s\S]+(?=\]$)/,
          lookbehind: true,
          // inside can appear subset of php
          inside: {
            "comment": comment,
            "string": string,
            "attribute-class-name": [
              {
                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                alias: "class-name",
                greedy: true,
                lookbehind: true
              },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                alias: [
                  "class-name",
                  "class-name-fully-qualified"
                ],
                greedy: true,
                lookbehind: true,
                inside: {
                  "punctuation": /\\/
                }
              }
            ],
            "constant": constant,
            "number": number,
            "operator": operator,
            "punctuation": punctuation
          }
        },
        "delimiter": {
          pattern: /^#\[|\]$/,
          alias: "punctuation"
        }
      }
    }
  });
  Prism3.hooks.add("before-tokenize", function(env) {
    if (!/<\?/.test(env.code)) {
      return;
    }
    var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g;
    Prism3.languages["markup-templating"].buildPlaceholders(env, "php", phpPattern);
  });
  Prism3.hooks.add("after-tokenize", function(env) {
    Prism3.languages["markup-templating"].tokenizePlaceholders(env, "php");
  });
})(Prism);

// node_modules/prismjs/components/prism-powershell.js
(function(Prism3) {
  var powershell = Prism3.languages.powershell = {
    "comment": [
      {
        pattern: /(^|[^`])<#[\s\S]*?#>/,
        lookbehind: true
      },
      {
        pattern: /(^|[^`])#.*/,
        lookbehind: true
      }
    ],
    "string": [
      {
        pattern: /"(?:`[\s\S]|[^`"])*"/,
        greedy: true,
        inside: null
        // see below
      },
      {
        pattern: /'(?:[^']|'')*'/,
        greedy: true
      }
    ],
    // Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
    // Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
    "namespace": /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
    "boolean": /\$(?:false|true)\b/i,
    "variable": /\$\w+\b/,
    // Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
    // Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
    // Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
    "function": [
      /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
      /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
    ],
    // per http://technet.microsoft.com/en-us/library/hh847744.aspx
    "keyword": /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
    "operator": {
      pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
      lookbehind: true
    },
    "punctuation": /[|{}[\];(),.]/
  };
  powershell.string[0].inside = {
    "function": {
      // Allow for one level of nesting
      pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
      lookbehind: true,
      inside: powershell
    },
    "boolean": powershell.boolean,
    "variable": powershell.variable
  };
})(Prism);

// node_modules/prismjs/components/prism-bash.js
(function(Prism3) {
  var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
  var commandAfterHeredoc = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: true,
    alias: "punctuation",
    // this looks reasonably well in all themes
    inside: null
    // see below
  };
  var insideString = {
    "bash": commandAfterHeredoc,
    "environment": {
      pattern: RegExp("\\$" + envVars),
      alias: "constant"
    },
    "variable": [
      // [0]: Arithmetic Environment
      {
        pattern: /\$?\(\([\s\S]+?\)\)/,
        greedy: true,
        inside: {
          // If there is a $ sign at the beginning highlight $(( and )) as variable
          "variable": [
            {
              pattern: /(^\$\(\([\s\S]+)\)\)/,
              lookbehind: true
            },
            /^\$\(\(/
          ],
          "number": /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
          // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
          "operator": /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
          // If there is no $ sign at the beginning highlight (( and )) as punctuation
          "punctuation": /\(\(?|\)\)?|,|;/
        }
      },
      // [1]: Command Substitution
      {
        pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
        greedy: true,
        inside: {
          "variable": /^\$\(|^`|\)$|`$/
        }
      },
      // [2]: Brace expansion
      {
        pattern: /\$\{[^}]+\}/,
        greedy: true,
        inside: {
          "operator": /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
          "punctuation": /[\[\]]/,
          "environment": {
            pattern: RegExp("(\\{)" + envVars),
            lookbehind: true,
            alias: "constant"
          }
        }
      },
      /\$(?:\w+|[#?*!@$])/
    ],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    "entity": /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
  };
  Prism3.languages.bash = {
    "shebang": {
      pattern: /^#!\s*\/.*/,
      alias: "important"
    },
    "comment": {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    "function-name": [
      // a) function foo {
      // b) foo() {
      // c) function foo() {
      // but not “foo {”
      {
        // a) and c)
        pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: true,
        alias: "function"
      },
      {
        // b)
        pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
        alias: "function"
      }
    ],
    // Highlight variable names as variables in for and select beginnings.
    "for-or-select": {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: "variable",
      lookbehind: true
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    "assign-left": {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
      inside: {
        "environment": {
          pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
          lookbehind: true,
          alias: "constant"
        }
      },
      alias: "variable",
      lookbehind: true
    },
    // Highlight parameter names as variables
    "parameter": {
      pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
      alias: "variable",
      lookbehind: true
    },
    "string": [
      // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
      {
        pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      // Here-document with quotes around the tag
      // → No expansion (so no “inside”).
      {
        pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: true,
        greedy: true,
        inside: {
          "bash": commandAfterHeredoc
        }
      },
      // “Normal” string
      {
        // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
        pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
        lookbehind: true,
        greedy: true,
        inside: insideString
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
        pattern: /(^|[^$\\])'[^']*'/,
        lookbehind: true,
        greedy: true
      },
      {
        // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
        pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
        greedy: true,
        inside: {
          "entity": insideString.entity
        }
      }
    ],
    "environment": {
      pattern: RegExp("\\$?" + envVars),
      alias: "constant"
    },
    "variable": insideString.variable,
    "function": {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "keyword": {
      pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    "builtin": {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: true,
      // Alias added to make those easier to distinguish from strings.
      alias: "class-name"
    },
    "boolean": {
      pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    "file-descriptor": {
      pattern: /\B&\d\b/,
      alias: "important"
    },
    "operator": {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        "file-descriptor": {
          pattern: /^\d/,
          alias: "important"
        }
      }
    },
    "punctuation": /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    "number": {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  commandAfterHeredoc.inside = Prism3.languages.bash;
  var toBeCopied = [
    "comment",
    "function-name",
    "for-or-select",
    "assign-left",
    "parameter",
    "string",
    "environment",
    "function",
    "keyword",
    "builtin",
    "boolean",
    "file-descriptor",
    "operator",
    "punctuation",
    "number"
  ];
  var inside = insideString.variable[1].inside;
  for (var i = 0; i < toBeCopied.length; i++) {
    inside[toBeCopied[i]] = Prism3.languages.bash[toBeCopied[i]];
  }
  Prism3.languages.sh = Prism3.languages.bash;
  Prism3.languages.shell = Prism3.languages.bash;
})(Prism);

// node_modules/prismjs/components/prism-batch.js
(function(Prism3) {
  var variable = /%%?[~:\w]+%?|!\S+!/;
  var parameter = {
    pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
    alias: "attr-name",
    inside: {
      "punctuation": /:/
    }
  };
  var string = /"(?:[\\"]"|[^"])*"(?!")/;
  var number = /(?:\b|-)\d+\b/;
  Prism3.languages.batch = {
    "comment": [
      /^::.*/m,
      {
        pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
        lookbehind: true
      }
    ],
    "label": {
      pattern: /^:.*/m,
      alias: "property"
    },
    "command": [
      {
        // FOR command
        pattern: /((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
        lookbehind: true,
        inside: {
          "keyword": /\b(?:do|in)\b|^for\b/i,
          "string": string,
          "parameter": parameter,
          "variable": variable,
          "number": number,
          "punctuation": /[()',]/
        }
      },
      {
        // IF command
        pattern: /((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|geq|gtr|leq|lss|neq) )(?:"[^"]*"|[^\s"]\S*))/im,
        lookbehind: true,
        inside: {
          "keyword": /\b(?:cmdextversion|defined|errorlevel|exist|not)\b|^if\b/i,
          "string": string,
          "parameter": parameter,
          "variable": variable,
          "number": number,
          "operator": /\^|==|\b(?:equ|geq|gtr|leq|lss|neq)\b/i
        }
      },
      {
        // ELSE command
        pattern: /((?:^|[&()])[ \t]*)else\b/im,
        lookbehind: true,
        inside: {
          "keyword": /^else\b/i
        }
      },
      {
        // SET command
        pattern: /((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
        lookbehind: true,
        inside: {
          "keyword": /^set\b/i,
          "string": string,
          "parameter": parameter,
          "variable": [
            variable,
            /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/
          ],
          "number": number,
          "operator": /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
          "punctuation": /[()',]/
        }
      },
      {
        // Other commands
        pattern: /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/m,
        lookbehind: true,
        inside: {
          "keyword": /^\w+\b/,
          "string": string,
          "parameter": parameter,
          "label": {
            pattern: /(^\s*):\S+/m,
            lookbehind: true,
            alias: "property"
          },
          "variable": variable,
          "number": number,
          "operator": /\^/
        }
      }
    ],
    "operator": /[&@]/,
    "punctuation": /[()']/
  };
})(Prism);

// node_modules/prismjs/components/prism-yaml.js
(function(Prism3) {
  var anchorOrAlias = /[*&][^\s[\]{},]+/;
  var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
  var properties = "(?:" + tag.source + "(?:[ 	]+" + anchorOrAlias.source + ")?|" + anchorOrAlias.source + "(?:[ 	]+" + tag.source + ")?)";
  var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function() {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  });
  var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
  function createValuePattern(value, flags) {
    flags = (flags || "").replace(/m/g, "") + "m";
    var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
      return properties;
    }).replace(/<<value>>/g, function() {
      return value;
    });
    return RegExp(pattern, flags);
  }
  Prism3.languages.yaml = {
    "scalar": {
      pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function() {
        return properties;
      })),
      lookbehind: true,
      alias: "string"
    },
    "comment": /#.*/,
    "key": {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
        return properties;
      }).replace(/<<key>>/g, function() {
        return "(?:" + plainKey + "|" + string + ")";
      })),
      lookbehind: true,
      greedy: true,
      alias: "atrule"
    },
    "directive": {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: "important"
    },
    "datetime": {
      pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
      lookbehind: true,
      alias: "number"
    },
    "boolean": {
      pattern: createValuePattern(/false|true/.source, "i"),
      lookbehind: true,
      alias: "important"
    },
    "null": {
      pattern: createValuePattern(/null|~/.source, "i"),
      lookbehind: true,
      alias: "important"
    },
    "string": {
      pattern: createValuePattern(string),
      lookbehind: true,
      greedy: true
    },
    "number": {
      pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"),
      lookbehind: true
    },
    "tag": tag,
    "important": anchorOrAlias,
    "punctuation": /---|[:[\]{}\-,|>?]|\.\.\./
  };
  Prism3.languages.yml = Prism3.languages.yaml;
})(Prism);

// node_modules/prismjs/components/prism-toml.js
(function(Prism3) {
  var key = /(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;
  function insertKey(pattern) {
    return pattern.replace(/__/g, function() {
      return key;
    });
  }
  Prism3.languages.toml = {
    "comment": {
      pattern: /#.*/,
      greedy: true
    },
    "table": {
      pattern: RegExp(insertKey(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source), "m"),
      lookbehind: true,
      greedy: true,
      alias: "class-name"
    },
    "key": {
      pattern: RegExp(insertKey(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source), "m"),
      lookbehind: true,
      greedy: true,
      alias: "property"
    },
    "string": {
      pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
      greedy: true
    },
    "date": [
      {
        // Offset Date-Time, Local Date-Time, Local Date
        pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
        alias: "number"
      },
      {
        // Local Time
        pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,
        alias: "number"
      }
    ],
    "number": /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
    "boolean": /\b(?:false|true)\b/,
    "punctuation": /[.,=[\]{}]/
  };
})(Prism);

// node_modules/prismjs/components/prism-ini.js
Prism.languages.ini = {
  /**
   * The component mimics the behavior of the Win32 API parser.
   *
   * @see {@link https://github.com/PrismJS/prism/issues/2775#issuecomment-787477723}
   */
  "comment": {
    pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m,
    lookbehind: true
  },
  "section": {
    pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,
    lookbehind: true,
    inside: {
      "section-name": {
        pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,
        lookbehind: true,
        alias: "selector"
      },
      "punctuation": /\[|\]/
    }
  },
  "key": {
    pattern: /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,
    lookbehind: true,
    alias: "attr-name"
  },
  "value": {
    pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,
    lookbehind: true,
    alias: "attr-value",
    inside: {
      "inner-value": {
        pattern: /^("|').+(?=\1$)/,
        lookbehind: true
      }
    }
  },
  "punctuation": /=/
};

// node_modules/prismjs/components/prism-json.js
Prism.languages.json = {
  "property": {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true
  },
  "string": {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true
  },
  "comment": {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  "number": /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  "punctuation": /[{}[\],]/,
  "operator": /:/,
  "boolean": /\b(?:false|true)\b/,
  "null": {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;

// node_modules/prismjs/components/prism-json5.js
(function(Prism3) {
  var string = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
  Prism3.languages.json5 = Prism3.languages.extend("json", {
    "property": [
      {
        pattern: RegExp(string.source + "(?=\\s*:)"),
        greedy: true
      },
      {
        pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
        alias: "unquoted"
      }
    ],
    "string": {
      pattern: string,
      greedy: true
    },
    "number": /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/
  });
})(Prism);

// node_modules/prismjs/components/prism-hcl.js
Prism.languages.hcl = {
  "comment": /(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/,
  "heredoc": {
    pattern: /<<-?(\w+\b)[\s\S]*?^[ \t]*\1/m,
    greedy: true,
    alias: "string"
  },
  "keyword": [
    {
      pattern: /(?:data|resource)\s+(?:"(?:\\[\s\S]|[^\\"])*")(?=\s+"[\w-]+"\s+\{)/i,
      inside: {
        "type": {
          pattern: /(resource|data|\s+)(?:"(?:\\[\s\S]|[^\\"])*")/i,
          lookbehind: true,
          alias: "variable"
        }
      }
    },
    {
      pattern: /(?:backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+(?=\{)/i,
      inside: {
        "type": {
          pattern: /(backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+/i,
          lookbehind: true,
          alias: "variable"
        }
      }
    },
    /[\w-]+(?=\s+\{)/
  ],
  "property": [
    /[-\w\.]+(?=\s*=(?!=))/,
    /"(?:\\[\s\S]|[^\\"])+"(?=\s*[:=])/
  ],
  "string": {
    pattern: /"(?:[^\\$"]|\\[\s\S]|\$(?:(?=")|\$+(?!\$)|[^"${])|\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\})*"/,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /(^|[^$])\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\}/,
        lookbehind: true,
        inside: {
          "type": {
            pattern: /(\b(?:count|data|local|module|path|self|terraform|var)\b\.)[\w\*]+/i,
            lookbehind: true,
            alias: "variable"
          },
          "keyword": /\b(?:count|data|local|module|path|self|terraform|var)\b/i,
          "function": /\w+(?=\()/,
          "string": {
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            greedy: true
          },
          "number": /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
          "punctuation": /[!\$#%&'()*+,.\/;<=>@\[\\\]^`{|}~?:]/
        }
      }
    }
  },
  "number": /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
  "boolean": /\b(?:false|true)\b/i,
  "punctuation": /[=\[\]{}]/
};

// node_modules/prismjs/components/prism-graphql.js
Prism.languages.graphql = {
  "comment": /#.*/,
  "description": {
    pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
    greedy: true,
    alias: "string",
    inside: {
      "language-markdown": {
        pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
        lookbehind: true,
        inside: Prism.languages.markdown
      }
    }
  },
  "string": {
    pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
    greedy: true
  },
  "number": /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  "boolean": /\b(?:false|true)\b/,
  "variable": /\$[a-z_]\w*/i,
  "directive": {
    pattern: /@[a-z_]\w*/i,
    alias: "function"
  },
  "attr-name": {
    pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: true
  },
  "atom-input": {
    pattern: /\b[A-Z]\w*Input\b/,
    alias: "class-name"
  },
  "scalar": /\b(?:Boolean|Float|ID|Int|String)\b/,
  "constant": /\b[A-Z][A-Z_\d]*\b/,
  "class-name": {
    pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
    lookbehind: true
  },
  "fragment": {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: "function"
  },
  "definition-mutation": {
    pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: "function"
  },
  "definition-query": {
    pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
    lookbehind: true,
    alias: "function"
  },
  "keyword": /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
  "operator": /[!=|&]|\.{3}/,
  "property-query": /\w+(?=\s*\()/,
  "object": /\w+(?=\s*\{)/,
  "punctuation": /[!(){}\[\]:=,]/,
  "property": /\w+/
};
Prism.hooks.add("after-tokenize", function afterTokenizeGraphql(env) {
  if (env.language !== "graphql") {
    return;
  }
  var validTokens = env.tokens.filter(function(token) {
    return typeof token !== "string" && token.type !== "comment" && token.type !== "scalar";
  });
  var currentIndex = 0;
  function getToken(offset) {
    return validTokens[currentIndex + offset];
  }
  function isTokenType(types, offset) {
    offset = offset || 0;
    for (var i2 = 0; i2 < types.length; i2++) {
      var token = getToken(i2 + offset);
      if (!token || token.type !== types[i2]) {
        return false;
      }
    }
    return true;
  }
  function findClosingBracket(open, close) {
    var stackHeight = 1;
    for (var i2 = currentIndex; i2 < validTokens.length; i2++) {
      var token = validTokens[i2];
      var content = token.content;
      if (token.type === "punctuation" && typeof content === "string") {
        if (open.test(content)) {
          stackHeight++;
        } else if (close.test(content)) {
          stackHeight--;
          if (stackHeight === 0) {
            return i2;
          }
        }
      }
    }
    return -1;
  }
  function addAlias(token, alias) {
    var aliases = token.alias;
    if (!aliases) {
      token.alias = aliases = [];
    } else if (!Array.isArray(aliases)) {
      token.alias = aliases = [aliases];
    }
    aliases.push(alias);
  }
  for (; currentIndex < validTokens.length; ) {
    var startToken = validTokens[currentIndex++];
    if (startToken.type === "keyword" && startToken.content === "mutation") {
      var inputVariables = [];
      if (isTokenType(["definition-mutation", "punctuation"]) && getToken(1).content === "(") {
        currentIndex += 2;
        var definitionEnd = findClosingBracket(/^\($/, /^\)$/);
        if (definitionEnd === -1) {
          continue;
        }
        for (; currentIndex < definitionEnd; currentIndex++) {
          var t = getToken(0);
          if (t.type === "variable") {
            addAlias(t, "variable-input");
            inputVariables.push(t.content);
          }
        }
        currentIndex = definitionEnd + 1;
      }
      if (isTokenType(["punctuation", "property-query"]) && getToken(0).content === "{") {
        currentIndex++;
        addAlias(getToken(0), "property-mutation");
        if (inputVariables.length > 0) {
          var mutationEnd = findClosingBracket(/^\{$/, /^\}$/);
          if (mutationEnd === -1) {
            continue;
          }
          for (var i = currentIndex; i < mutationEnd; i++) {
            var varToken = validTokens[i];
            if (varToken.type === "variable" && inputVariables.indexOf(varToken.content) >= 0) {
              addAlias(varToken, "variable-input");
            }
          }
        }
      }
    }
  }
});

// node_modules/prismjs/components/prism-sql.js
Prism.languages.sql = {
  "comment": {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: true
  },
  "variable": [
    {
      pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
      greedy: true
    },
    /@[\w.$]+/
  ],
  "string": {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: true,
    lookbehind: true
  },
  "identifier": {
    pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
    greedy: true,
    lookbehind: true,
    inside: {
      "punctuation": /^`|`$/
    }
  },
  "function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  // Should we highlight user defined functions too?
  "keyword": /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  "boolean": /\b(?:FALSE|NULL|TRUE)\b/i,
  "number": /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  "operator": /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  "punctuation": /[;[\]()`,.]/
};

// node_modules/prismjs/components/prism-makefile.js
Prism.languages.makefile = {
  "comment": {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: true
  },
  "string": {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  "builtin-target": {
    pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    alias: "builtin"
  },
  "target": {
    pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
    alias: "symbol",
    inside: {
      "variable": /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
    }
  },
  "variable": /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  // Directives
  "keyword": /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
  "function": {
    pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
    lookbehind: true
  },
  "operator": /(?:::|[?:+!])?=|[|@]/,
  "punctuation": /[:;(){}]/
};

// node_modules/prismjs/components/prism-cmake.js
Prism.languages.cmake = {
  "comment": /#.*/,
  "string": {
    pattern: /"(?:[^\\"]|\\.)*"/,
    greedy: true,
    inside: {
      "interpolation": {
        pattern: /\$\{(?:[^{}$]|\$\{[^{}$]*\})*\}/,
        inside: {
          "punctuation": /\$\{|\}/,
          "variable": /\w+/
        }
      }
    }
  },
  "variable": /\b(?:CMAKE_\w+|\w+_(?:(?:BINARY|SOURCE)_DIR|DESCRIPTION|HOMEPAGE_URL|ROOT|VERSION(?:_MAJOR|_MINOR|_PATCH|_TWEAK)?)|(?:ANDROID|APPLE|BORLAND|BUILD_SHARED_LIBS|CACHE|CPACK_(?:ABSOLUTE_DESTINATION_FILES|COMPONENT_INCLUDE_TOPLEVEL_DIRECTORY|ERROR_ON_ABSOLUTE_INSTALL_DESTINATION|INCLUDE_TOPLEVEL_DIRECTORY|INSTALL_DEFAULT_DIRECTORY_PERMISSIONS|INSTALL_SCRIPT|PACKAGING_INSTALL_PREFIX|SET_DESTDIR|WARN_ON_ABSOLUTE_INSTALL_DESTINATION)|CTEST_(?:BINARY_DIRECTORY|BUILD_COMMAND|BUILD_NAME|BZR_COMMAND|BZR_UPDATE_OPTIONS|CHANGE_ID|CHECKOUT_COMMAND|CONFIGURATION_TYPE|CONFIGURE_COMMAND|COVERAGE_COMMAND|COVERAGE_EXTRA_FLAGS|CURL_OPTIONS|CUSTOM_(?:COVERAGE_EXCLUDE|ERROR_EXCEPTION|ERROR_MATCH|ERROR_POST_CONTEXT|ERROR_PRE_CONTEXT|MAXIMUM_FAILED_TEST_OUTPUT_SIZE|MAXIMUM_NUMBER_OF_(?:ERRORS|WARNINGS)|MAXIMUM_PASSED_TEST_OUTPUT_SIZE|MEMCHECK_IGNORE|POST_MEMCHECK|POST_TEST|PRE_MEMCHECK|PRE_TEST|TESTS_IGNORE|WARNING_EXCEPTION|WARNING_MATCH)|CVS_CHECKOUT|CVS_COMMAND|CVS_UPDATE_OPTIONS|DROP_LOCATION|DROP_METHOD|DROP_SITE|DROP_SITE_CDASH|DROP_SITE_PASSWORD|DROP_SITE_USER|EXTRA_COVERAGE_GLOB|GIT_COMMAND|GIT_INIT_SUBMODULES|GIT_UPDATE_CUSTOM|GIT_UPDATE_OPTIONS|HG_COMMAND|HG_UPDATE_OPTIONS|LABELS_FOR_SUBPROJECTS|MEMORYCHECK_(?:COMMAND|COMMAND_OPTIONS|SANITIZER_OPTIONS|SUPPRESSIONS_FILE|TYPE)|NIGHTLY_START_TIME|P4_CLIENT|P4_COMMAND|P4_OPTIONS|P4_UPDATE_OPTIONS|RUN_CURRENT_SCRIPT|SCP_COMMAND|SITE|SOURCE_DIRECTORY|SUBMIT_URL|SVN_COMMAND|SVN_OPTIONS|SVN_UPDATE_OPTIONS|TEST_LOAD|TEST_TIMEOUT|TRIGGER_SITE|UPDATE_COMMAND|UPDATE_OPTIONS|UPDATE_VERSION_ONLY|USE_LAUNCHERS)|CYGWIN|ENV|EXECUTABLE_OUTPUT_PATH|GHS-MULTI|IOS|LIBRARY_OUTPUT_PATH|MINGW|MSVC(?:10|11|12|14|60|70|71|80|90|_IDE|_TOOLSET_VERSION|_VERSION)?|MSYS|PROJECT_NAME|UNIX|WIN32|WINCE|WINDOWS_PHONE|WINDOWS_STORE|XCODE))\b/,
  "property": /\b(?:cxx_\w+|(?:ARCHIVE_OUTPUT_(?:DIRECTORY|NAME)|COMPILE_DEFINITIONS|COMPILE_PDB_NAME|COMPILE_PDB_OUTPUT_DIRECTORY|EXCLUDE_FROM_DEFAULT_BUILD|IMPORTED_(?:IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_LANGUAGES|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|NO_SONAME|OBJECTS|SONAME)|INTERPROCEDURAL_OPTIMIZATION|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINK_FLAGS|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|MAP_IMPORTED_CONFIG|OSX_ARCHITECTURES|OUTPUT_NAME|PDB_NAME|PDB_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|STATIC_LIBRARY_FLAGS|VS_CSHARP|VS_DOTNET_REFERENCEPROP|VS_DOTNET_REFERENCE|VS_GLOBAL_SECTION_POST|VS_GLOBAL_SECTION_PRE|VS_GLOBAL|XCODE_ATTRIBUTE)_\w+|\w+_(?:CLANG_TIDY|COMPILER_LAUNCHER|CPPCHECK|CPPLINT|INCLUDE_WHAT_YOU_USE|OUTPUT_NAME|POSTFIX|VISIBILITY_PRESET)|ABSTRACT|ADDITIONAL_MAKE_CLEAN_FILES|ADVANCED|ALIASED_TARGET|ALLOW_DUPLICATE_CUSTOM_TARGETS|ANDROID_(?:ANT_ADDITIONAL_OPTIONS|API|API_MIN|ARCH|ASSETS_DIRECTORIES|GUI|JAR_DEPENDENCIES|NATIVE_LIB_DEPENDENCIES|NATIVE_LIB_DIRECTORIES|PROCESS_MAX|PROGUARD|PROGUARD_CONFIG_PATH|SECURE_PROPS_PATH|SKIP_ANT_STEP|STL_TYPE)|ARCHIVE_OUTPUT_DIRECTORY|ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|AUTOGEN_(?:BUILD_DIR|ORIGIN_DEPENDS|PARALLEL|SOURCE_GROUP|TARGETS_FOLDER|TARGET_DEPENDS)|AUTOMOC|AUTOMOC_(?:COMPILER_PREDEFINES|DEPEND_FILTERS|EXECUTABLE|MACRO_NAMES|MOC_OPTIONS|SOURCE_GROUP|TARGETS_FOLDER)|AUTORCC|AUTORCC_EXECUTABLE|AUTORCC_OPTIONS|AUTORCC_SOURCE_GROUP|AUTOUIC|AUTOUIC_EXECUTABLE|AUTOUIC_OPTIONS|AUTOUIC_SEARCH_PATHS|BINARY_DIR|BUILDSYSTEM_TARGETS|BUILD_RPATH|BUILD_RPATH_USE_ORIGIN|BUILD_WITH_INSTALL_NAME_DIR|BUILD_WITH_INSTALL_RPATH|BUNDLE|BUNDLE_EXTENSION|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMMON_LANGUAGE_RUNTIME|COMPATIBLE_INTERFACE_(?:BOOL|NUMBER_MAX|NUMBER_MIN|STRING)|COMPILE_(?:DEFINITIONS|FEATURES|FLAGS|OPTIONS|PDB_NAME|PDB_OUTPUT_DIRECTORY)|COST|CPACK_DESKTOP_SHORTCUTS|CPACK_NEVER_OVERWRITE|CPACK_PERMANENT|CPACK_STARTUP_SHORTCUTS|CPACK_START_MENU_SHORTCUTS|CPACK_WIX_ACL|CROSSCOMPILING_EMULATOR|CUDA_EXTENSIONS|CUDA_PTX_COMPILATION|CUDA_RESOLVE_DEVICE_SYMBOLS|CUDA_SEPARABLE_COMPILATION|CUDA_STANDARD|CUDA_STANDARD_REQUIRED|CXX_EXTENSIONS|CXX_STANDARD|CXX_STANDARD_REQUIRED|C_EXTENSIONS|C_STANDARD|C_STANDARD_REQUIRED|DEBUG_CONFIGURATIONS|DEFINE_SYMBOL|DEFINITIONS|DEPENDS|DEPLOYMENT_ADDITIONAL_FILES|DEPLOYMENT_REMOTE_DIRECTORY|DISABLED|DISABLED_FEATURES|ECLIPSE_EXTRA_CPROJECT_CONTENTS|ECLIPSE_EXTRA_NATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|ENABLE_EXPORTS|ENVIRONMENT|EXCLUDE_FROM_ALL|EXCLUDE_FROM_DEFAULT_BUILD|EXPORT_NAME|EXPORT_PROPERTIES|EXTERNAL_OBJECT|EchoString|FAIL_REGULAR_EXPRESSION|FIND_LIBRARY_USE_LIB32_PATHS|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_LIBX32_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|FIXTURES_CLEANUP|FIXTURES_REQUIRED|FIXTURES_SETUP|FOLDER|FRAMEWORK|Fortran_FORMAT|Fortran_MODULE_DIRECTORY|GENERATED|GENERATOR_FILE_NAME|GENERATOR_IS_MULTI_CONFIG|GHS_INTEGRITY_APP|GHS_NO_SOURCE_GROUP_FILE|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|GNUtoMS|HAS_CXX|HEADER_FILE_ONLY|HELPSTRING|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_(?:COMMON_LANGUAGE_RUNTIME|CONFIGURATIONS|GLOBAL|IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_(?:LANGUAGES|LIBRARIES|MULTIPLICITY)|LOCATION|NO_SONAME|OBJECTS|SONAME)|IMPORT_PREFIX|IMPORT_SUFFIX|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERFACE_(?:AUTOUIC_OPTIONS|COMPILE_DEFINITIONS|COMPILE_FEATURES|COMPILE_OPTIONS|INCLUDE_DIRECTORIES|LINK_DEPENDS|LINK_DIRECTORIES|LINK_LIBRARIES|LINK_OPTIONS|POSITION_INDEPENDENT_CODE|SOURCES|SYSTEM_INCLUDE_DIRECTORIES)|INTERPROCEDURAL_OPTIMIZATION|IN_TRY_COMPILE|IOS_INSTALL_COMBINED|JOB_POOLS|JOB_POOL_COMPILE|JOB_POOL_LINK|KEEP_EXTENSION|LABELS|LANGUAGE|LIBRARY_OUTPUT_DIRECTORY|LINKER_LANGUAGE|LINK_(?:DEPENDS|DEPENDS_NO_SHARED|DIRECTORIES|FLAGS|INTERFACE_LIBRARIES|INTERFACE_MULTIPLICITY|LIBRARIES|OPTIONS|SEARCH_END_STATIC|SEARCH_START_STATIC|WHAT_YOU_USE)|LISTFILE_STACK|LOCATION|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MACOSX_PACKAGE_LOCATION|MACOSX_RPATH|MACROS|MANUALLY_ADDED_DEPENDENCIES|MEASUREMENT|MODIFIED|NAME|NO_SONAME|NO_SYSTEM_FROM_IMPORTED|OBJECT_DEPENDS|OBJECT_OUTPUTS|OSX_ARCHITECTURES|OUTPUT_NAME|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PARENT_DIRECTORY|PASS_REGULAR_EXPRESSION|PDB_NAME|PDB_OUTPUT_DIRECTORY|POSITION_INDEPENDENT_CODE|POST_INSTALL_SCRIPT|PREDEFINED_TARGETS_FOLDER|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE_HEADER|PROCESSORS|PROCESSOR_AFFINITY|PROJECT_LABEL|PUBLIC_HEADER|REPORT_UNDEFINED_PROPERTIES|REQUIRED_FILES|RESOURCE|RESOURCE_LOCK|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|RUNTIME_OUTPUT_DIRECTORY|RUN_SERIAL|SKIP_AUTOGEN|SKIP_AUTOMOC|SKIP_AUTORCC|SKIP_AUTOUIC|SKIP_BUILD_RPATH|SKIP_RETURN_CODE|SOURCES|SOURCE_DIR|SOVERSION|STATIC_LIBRARY_FLAGS|STATIC_LIBRARY_OPTIONS|STRINGS|SUBDIRECTORIES|SUFFIX|SYMBOLIC|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_MESSAGES|TARGET_SUPPORTS_SHARED_LIBS|TESTS|TEST_INCLUDE_FILE|TEST_INCLUDE_FILES|TIMEOUT|TIMEOUT_AFTER_MATCH|TYPE|USE_FOLDERS|VALUE|VARIABLES|VERSION|VISIBILITY_INLINES_HIDDEN|VS_(?:CONFIGURATION_TYPE|COPY_TO_OUT_DIR|DEBUGGER_(?:COMMAND|COMMAND_ARGUMENTS|ENVIRONMENT|WORKING_DIRECTORY)|DEPLOYMENT_CONTENT|DEPLOYMENT_LOCATION|DOTNET_REFERENCES|DOTNET_REFERENCES_COPY_LOCAL|INCLUDE_IN_VSIX|IOT_STARTUP_TASK|KEYWORD|RESOURCE_GENERATOR|SCC_AUXPATH|SCC_LOCALPATH|SCC_PROJECTNAME|SCC_PROVIDER|SDK_REFERENCES|SHADER_(?:DISABLE_OPTIMIZATIONS|ENABLE_DEBUG|ENTRYPOINT|FLAGS|MODEL|OBJECT_FILE_NAME|OUTPUT_HEADER_FILE|TYPE|VARIABLE_NAME)|STARTUP_PROJECT|TOOL_OVERRIDE|USER_PROPS|WINRT_COMPONENT|WINRT_EXTENSIONS|WINRT_REFERENCES|XAML_TYPE)|WILL_FAIL|WIN32_EXECUTABLE|WINDOWS_EXPORT_ALL_SYMBOLS|WORKING_DIRECTORY|WRAP_EXCLUDE|XCODE_(?:EMIT_EFFECTIVE_PLATFORM_NAME|EXPLICIT_FILE_TYPE|FILE_ATTRIBUTES|LAST_KNOWN_FILE_TYPE|PRODUCT_TYPE|SCHEME_(?:ADDRESS_SANITIZER|ADDRESS_SANITIZER_USE_AFTER_RETURN|ARGUMENTS|DISABLE_MAIN_THREAD_CHECKER|DYNAMIC_LIBRARY_LOADS|DYNAMIC_LINKER_API_USAGE|ENVIRONMENT|EXECUTABLE|GUARD_MALLOC|MAIN_THREAD_CHECKER_STOP|MALLOC_GUARD_EDGES|MALLOC_SCRIBBLE|MALLOC_STACK|THREAD_SANITIZER(?:_STOP)?|UNDEFINED_BEHAVIOUR_SANITIZER(?:_STOP)?|ZOMBIE_OBJECTS))|XCTEST)\b/,
  "keyword": /\b(?:add_compile_definitions|add_compile_options|add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_link_options|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_host_system_information|cmake_minimum_required|cmake_parse_arguments|cmake_policy|configure_file|continue|create_test_sourcelist|ctest_build|ctest_configure|ctest_coverage|ctest_empty_binary_directory|ctest_memcheck|ctest_read_custom_files|ctest_run_script|ctest_sleep|ctest_start|ctest_submit|ctest_test|ctest_update|ctest_upload|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|get_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_guard|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_property|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_compile_definitions|target_compile_features|target_compile_options|target_include_directories|target_link_directories|target_link_libraries|target_link_options|target_sources|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)(?=\s*\()\b/,
  "boolean": /\b(?:FALSE|OFF|ON|TRUE)\b/,
  "namespace": /\b(?:INTERFACE|PRIVATE|PROPERTIES|PUBLIC|SHARED|STATIC|TARGET_OBJECTS)\b/,
  "operator": /\b(?:AND|DEFINED|EQUAL|GREATER|LESS|MATCHES|NOT|OR|STREQUAL|STRGREATER|STRLESS|VERSION_EQUAL|VERSION_GREATER|VERSION_LESS)\b/,
  "inserted": {
    pattern: /\b\w+::\w+\b/,
    alias: "class-name"
  },
  "number": /\b\d+(?:\.\d+)*\b/,
  "function": /\b[a-z_]\w*(?=\s*\()\b/i,
  "punctuation": /[()>}]|\$[<{]/
};

// node_modules/prismjs/components/prism-docker.js
(function(Prism3) {
  var spaceAfterBackSlash = /\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source;
  var space = /(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source.replace(/<SP_BS>/g, function() {
    return spaceAfterBackSlash;
  });
  var string = /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source;
  var option = /--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(/<STR>/g, function() {
    return string;
  });
  var stringRule = {
    pattern: RegExp(string),
    greedy: true
  };
  var commentRule = {
    pattern: /(^[ \t]*)#.*/m,
    lookbehind: true,
    greedy: true
  };
  function re(source, flags) {
    source = source.replace(/<OPT>/g, function() {
      return option;
    }).replace(/<SP>/g, function() {
      return space;
    });
    return RegExp(source, flags);
  }
  Prism3.languages.docker = {
    "instruction": {
      pattern: /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
      lookbehind: true,
      greedy: true,
      inside: {
        "options": {
          pattern: re(/(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source, "i"),
          lookbehind: true,
          greedy: true,
          inside: {
            "property": {
              pattern: /(^|\s)--[\w-]+/,
              lookbehind: true
            },
            "string": [
              stringRule,
              {
                pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/,
                lookbehind: true
              }
            ],
            "operator": /\\$/m,
            "punctuation": /=/
          }
        },
        "keyword": [
          {
            // https://docs.docker.com/engine/reference/builder/#healthcheck
            pattern: re(/(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source, "i"),
            lookbehind: true,
            greedy: true
          },
          {
            // https://docs.docker.com/engine/reference/builder/#from
            pattern: re(/(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source, "i"),
            lookbehind: true,
            greedy: true
          },
          {
            // https://docs.docker.com/engine/reference/builder/#onbuild
            pattern: re(/(^ONBUILD<SP>)\w+/.source, "i"),
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /^\w+/,
            greedy: true
          }
        ],
        "comment": commentRule,
        "string": stringRule,
        "variable": /\$(?:\w+|\{[^{}"'\\]*\})/,
        "operator": /\\$/m
      }
    },
    "comment": commentRule
  };
  Prism3.languages.dockerfile = Prism3.languages.docker;
})(Prism);

// node_modules/prismjs/components/prism-css.js
(function(Prism3) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism3.languages.css = {
    "comment": /\/\*[\s\S]*?\*\//,
    "atrule": {
      pattern: RegExp("@[\\w-](?:" + /[^;{\s"']|\s+(?!\s)/.source + "|" + string.source + ")*?" + /(?:;|(?=\s*\{))/.source),
      inside: {
        "rule": /^@[\w-]+/,
        "selector-function-argument": {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: "selector"
        },
        "keyword": {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
        // See rest below
      }
    },
    "url": {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
      greedy: true,
      inside: {
        "function": /^url/i,
        "punctuation": /^\(|\)$/,
        "string": {
          pattern: RegExp("^" + string.source + "$"),
          alias: "url"
        }
      }
    },
    "selector": {
      pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
      lookbehind: true
    },
    "string": {
      pattern: string,
      greedy: true
    },
    "property": {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    "important": /!important\b/i,
    "function": {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    "punctuation": /[(){};:,]/
  };
  Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
  var markup = Prism3.languages.markup;
  if (markup) {
    markup.tag.addInlined("style", "css");
    markup.tag.addAttribute("style", "css");
  }
})(Prism);

// node_modules/prismjs/components/prism-scss.js
Prism.languages.scss = Prism.languages.extend("css", {
  "comment": {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  },
  "atrule": {
    pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
    inside: {
      "rule": /@[\w-]+/
      // See rest below
    }
  },
  // url, compassified
  "url": /(?:[-a-z]+-)?url(?=\()/i,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was hard to do, so please be careful if you edit this one :)
  "selector": {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
    inside: {
      "parent": {
        pattern: /&/,
        alias: "important"
      },
      "placeholder": /%[-\w]+/,
      "variable": /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  "property": {
    pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: {
      "variable": /\$[-\w]+|#\{\$[-\w]+\}/
    }
  }
});
Prism.languages.insertBefore("scss", "atrule", {
  "keyword": [
    /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
    {
      pattern: /( )(?:from|through)(?= )/,
      lookbehind: true
    }
  ]
});
Prism.languages.insertBefore("scss", "important", {
  // var and interpolated vars
  "variable": /\$[-\w]+|#\{\$[-\w]+\}/
});
Prism.languages.insertBefore("scss", "function", {
  "module-modifier": {
    pattern: /\b(?:as|hide|show|with)\b/i,
    alias: "keyword"
  },
  "placeholder": {
    pattern: /%[-\w]+/,
    alias: "selector"
  },
  "statement": {
    pattern: /\B!(?:default|optional)\b/i,
    alias: "keyword"
  },
  "boolean": /\b(?:false|true)\b/,
  "null": {
    pattern: /\bnull\b/,
    alias: "keyword"
  },
  "operator": {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
    lookbehind: true
  }
});
Prism.languages.scss["atrule"].inside.rest = Prism.languages.scss;

// node_modules/prismjs/components/prism-less.js
Prism.languages.less = Prism.languages.extend("css", {
  "comment": [
    /\/\*[\s\S]*?\*\//,
    {
      pattern: /(^|[^\\])\/\/.*/,
      lookbehind: true
    }
  ],
  "atrule": {
    pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: {
      "punctuation": /[:()]/
    }
  },
  // selectors and mixins are considered the same
  "selector": {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: {
      // mixin parameters
      "variable": /@+[\w-]+/
    }
  },
  "property": /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
  "operator": /[+\-*\/]/
});
Prism.languages.insertBefore("less", "property", {
  "variable": [
    // Variable declaration (the colon must be consumed!)
    {
      pattern: /@[\w-]+\s*:/,
      inside: {
        "punctuation": /:/
      }
    },
    // Variable usage
    /@@?[\w-]+/
  ],
  "mixin-usage": {
    pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
    lookbehind: true,
    alias: "function"
  }
});

// src/prism.ts
if (import_prismjs.default.languages.python && !import_prismjs.default.languages.gdscript) {
  import_prismjs.default.languages.gdscript = import_prismjs.default.languages.extend("python", {
    keyword: /\b(?:and|as|assert|await|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|for|func|if|in|is|master|mastersync|match|not|null|onready|or|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|void|while|yield)\b/,
    "builtin": /\b(?:Vector2|Vector3|Color|Rect2|Transform|Transform2D|Basis|Quat|AABB|Plane|NodePath|RID|Dictionary|Array|PoolByteArray|PoolIntArray|PoolRealArray|PoolStringArray|PoolVector2Array|PoolVector3Array|PoolColorArray|bool|int|float|String)\b/
  });
}
var prism_default = import_prismjs.default;

// src/main.ts
var DEFAULT_SETTINGS = {
  extensions: "py,ps1,psm1,sh,bash,zsh,fish,ts,tsx,js,jsx,mjs,cjs,cs,cpp,cc,c,h,hpp,sql,yml,yaml,toml,rs,go,lua,gd,gdshader,bat,cmd,rb,php,pl,r,dart,kt,swift,vue,svelte,ini,conf,env,xml,html,css,scss,less,json5,jsonc,tf,tfvars,hcl,proto,graphql,gql",
  showLineNumbers: true,
  maxFileSizeKb: 2048
};
var VIEW_TYPE_CODE = "code-view";
var EXT_TO_LANG = {
  py: "python",
  ps1: "powershell",
  psm1: "powershell",
  sh: "bash",
  bash: "bash",
  zsh: "bash",
  fish: "bash",
  ts: "typescript",
  tsx: "tsx",
  js: "javascript",
  jsx: "jsx",
  mjs: "javascript",
  cjs: "javascript",
  cs: "csharp",
  cpp: "cpp",
  cc: "cpp",
  c: "c",
  h: "c",
  hpp: "cpp",
  sql: "sql",
  yml: "yaml",
  yaml: "yaml",
  toml: "toml",
  rs: "rust",
  go: "go",
  lua: "lua",
  gd: "gdscript",
  gdshader: "glsl",
  bat: "batch",
  cmd: "batch",
  rb: "ruby",
  php: "php",
  pl: "perl",
  r: "r",
  dart: "dart",
  kt: "kotlin",
  swift: "swift",
  vue: "markup",
  svelte: "markup",
  ini: "ini",
  conf: "ini",
  env: "bash",
  dockerfile: "docker",
  makefile: "makefile",
  cmake: "cmake",
  xml: "markup",
  html: "markup",
  css: "css",
  scss: "scss",
  less: "less",
  json: "json",
  json5: "json5",
  jsonc: "json",
  tf: "hcl",
  tfvars: "hcl",
  hcl: "hcl",
  proto: "protobuf",
  graphql: "graphql",
  gql: "graphql"
};
function languageFor(ext) {
  return EXT_TO_LANG[ext.toLowerCase()] ?? "text";
}
function parseExtensions(raw) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const part of raw.split(/[\s,]+/)) {
    const trimmed = part.trim().toLowerCase().replace(/^\./, "");
    if (!trimmed || trimmed === "md" || seen.has(trimmed)) continue;
    seen.add(trimmed);
    out.push(trimmed);
  }
  return out;
}
function renderTokens(parent, tokens) {
  for (const token of tokens) {
    if (typeof token === "string") {
      parent.appendText(token);
      continue;
    }
    const aliasPart = token.alias ? ` ${Array.isArray(token.alias) ? token.alias.join(" ") : token.alias}` : "";
    const span = parent.createSpan({ cls: `token ${token.type}${aliasPart}` });
    const content = token.content;
    if (typeof content === "string") {
      span.appendText(content);
    } else if (Array.isArray(content)) {
      renderTokens(span, content);
    } else {
      renderTokens(span, [content]);
    }
  }
}
var CodeView = class extends import_obsidian.TextFileView {
  constructor(leaf, plugin) {
    super(leaf);
    this.codeRoot = null;
    this.headerEl = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE_CODE;
  }
  getDisplayText() {
    return this.file?.basename ?? "Code";
  }
  getIcon() {
    return "file-code-2";
  }
  getViewData() {
    return this.data;
  }
  setViewData(data, _clear) {
    this.data = data;
    this.render();
  }
  clear() {
    this.data = "";
    if (this.codeRoot) this.codeRoot.empty();
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("code-view-host");
    this.headerEl = this.contentEl.createDiv({ cls: "code-view-header" });
    this.codeRoot = this.contentEl.createDiv({ cls: "code-view-container" });
    return Promise.resolve();
  }
  render() {
    if (!this.codeRoot || !this.headerEl) return;
    this.codeRoot.empty();
    this.headerEl.empty();
    const ext = this.file?.extension ?? "txt";
    const lang = languageFor(ext);
    this.headerEl.createSpan({
      cls: "code-view-lang",
      text: `${lang} \xB7 .${ext}`
    });
    this.headerEl.createSpan({
      cls: "code-view-readonly-badge",
      text: "read-only"
    });
    const sizeKb = (this.data?.length ?? 0) / 1024;
    if (sizeKb > this.plugin.settings.maxFileSizeKb) {
      this.codeRoot.createEl("p", {
        text: `File is ${sizeKb.toFixed(0)} KB \u2014 exceeds limit (${this.plugin.settings.maxFileSizeKb} KB). Open in an external editor or raise the limit in plugin settings.`
      });
      return;
    }
    const wrap = this.codeRoot.createDiv({ cls: "code-view-wrap" });
    const lines = this.data.split("\n");
    if (this.plugin.settings.showLineNumbers) {
      const gutter = wrap.createDiv({ cls: "code-view-gutter" });
      const width = String(lines.length).length;
      for (let i = 1; i <= lines.length; i++) {
        gutter.createDiv({ text: String(i).padStart(width, " ") });
      }
    }
    const pre = wrap.createEl("pre", { cls: `language-${lang}` });
    const code = pre.createEl("code", { cls: `language-${lang}` });
    const grammar = prism_default.languages[lang];
    if (grammar) {
      try {
        renderTokens(code, prism_default.tokenize(this.data, grammar));
      } catch {
        code.empty();
        code.setText(this.data);
      }
    } else {
      code.setText(this.data);
    }
  }
};
var CodeViewPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
  }
  async onload() {
    await this.loadSettings();
    this.registerView(
      VIEW_TYPE_CODE,
      (leaf) => new CodeView(leaf, this)
    );
    this.registerExtensionsSafe(parseExtensions(this.settings.extensions));
    this.addSettingTab(new CodeViewSettingTab(this.app, this));
  }
  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...loaded ?? {} };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  // Register one extension at a time so a single conflict (extension already
  // claimed by core or another plugin) does not skip the rest.
  registerExtensionsSafe(exts) {
    const failed = [];
    for (const ext of exts) {
      try {
        this.registerExtensions([ext], VIEW_TYPE_CODE);
      } catch {
        failed.push(ext);
      }
    }
    if (failed.length) {
      console.warn(
        `[code-view] could not register: ${failed.join(", ")} (already claimed by core or another plugin)`
      );
    }
  }
  // Obsidian's public API has no unregister hook for registerExtensions, so a
  // settings change cannot be applied live — surface a reload prompt instead.
  notifyReloadRequired() {
    new import_obsidian.Notice(
      "Code View: extension list changed. Reload Obsidian (Ctrl+R) to apply.",
      5e3
    );
  }
};
var CodeViewSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian.Setting(containerEl).setName("File extensions").setDesc(
      "Comma- or whitespace-separated list of file extensions to open with code view. Leading dots optional. Reload Obsidian after changing."
    ).addTextArea((text) => {
      text.setValue(this.plugin.settings.extensions).onChange(async (value) => {
        this.plugin.settings.extensions = value;
        await this.plugin.saveSettings();
        this.plugin.notifyReloadRequired();
      });
      text.inputEl.rows = 6;
      text.inputEl.cols = 60;
    });
    new import_obsidian.Setting(containerEl).setName("Show line numbers").setDesc("Render a gutter with line numbers next to the code.").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.showLineNumbers).onChange(async (value) => {
        this.plugin.settings.showLineNumbers = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Max file size (kb)").setDesc(
      "Files above this size show a warning instead of rendering. Prism highlighting is expensive on very large files."
    ).addText(
      (text) => text.setValue(String(this.plugin.settings.maxFileSizeKb)).onChange(async (value) => {
        const n = Number(value);
        if (!Number.isFinite(n) || n <= 0) return;
        this.plugin.settings.maxFileSizeKb = Math.floor(n);
        await this.plugin.saveSettings();
      })
    );
  }
};
/*! Bundled license information:

prismjs/prism.js:
  (**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   *)
*/

/* nosourcemap */