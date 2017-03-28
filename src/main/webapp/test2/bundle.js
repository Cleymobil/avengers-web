/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MovieDataService */
function MovieDataService() {

}

MovieDataService.prototype = {
    getAll: function() {
            return $.get("../marvel/movies");
        }
        /* upDate : function() {

    },
    create : function() {

    },
    delete : function() {

    }
*/
}
/* harmony default export */ __webpack_exports__["a"] = (MovieDataService);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__movie_item_component__ = __webpack_require__(3);
/* unused harmony export MovieListComponent */


function MovieListComponent(movieDataService) {
    this.movieDataService = movieDataService;
    this.el = $(`<div>Bonjour toto</div>`)

}
MovieListComponent.prototype = {
    rootNode: function() {
        return this.el;
    },
    start: function() {
        this.movieDataService.getAll()
            .then(movies => {
                for (let movie of movies) {
                    let movieItemComponent = new __WEBPACK_IMPORTED_MODULE_0__movie_item_component__["a" /* default */]();
                    movieItemComponent.setMovie(movie);
                    this.el.append(movieItemComponent.rootNode());
                }
            });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (MovieListComponent);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__movie_data_service__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__movie_list_component__ = __webpack_require__(1);



$(function() {

    const movieDataService = new __WEBPACK_IMPORTED_MODULE_0__movie_data_service__["a" /* default */]();
    const movieListComponent = new __WEBPACK_IMPORTED_MODULE_1__movie_list_component__["a" /* default */](movieDataService);

    $('body').append(movieListComponent.rootNode());

    movieListComponent.start();
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export MovieItemComponent */
function MovieItemComponent() {
    this.el = $(`
        <div>
            <span class = "id"></span>
            <span class = "name"></span>
        </div>
        `)
}
MovieItemComponent.prototype = {
    rootNode: function() {
        return this.el;
    },
    setMovie: function(movie) {
        this.el.find('.id').text(movie.id);
        this.el.find('.name').text(movie.name);
    }
}
/* harmony default export */ __webpack_exports__["a"] = (MovieItemComponent);

/***/ })
/******/ ]);