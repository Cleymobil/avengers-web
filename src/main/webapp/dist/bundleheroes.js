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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heroItem__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = HeroListComponent;
 

 function HeroListComponent() {
     $('button.create').on('click', event => this.createHero())

 }
 HeroListComponent.prototype = {
     fetchAll: function() {
         return $.get('marvel/heroes')
             .then(json => {
                 this.collection = [];
                 json.forEach(data => {
                     const hero = new __WEBPACK_IMPORTED_MODULE_0__heroItem__["a" /* HeroItem */](data, this);
                     this.collection.push(hero);
                 });
                 return this.collection;
             });
     },
     render: function() {
         const template = `<div class = component>
			<h1>Hero List</h1> 
				<ul>
				</ul>
				<footer> Some html footer</footer>
			</div>`;
         //cached component jQueryified element
         this.$el = $(template);
         console.log(this.$el);
         //All is done in Memory
         this.collection.forEach(hero => this.$el.find('ul').append(hero.render()));
         //More efficient, if we put in the DOM later
         $('div.heroList').append(this.$el);
         return this.$el;
     },
     createHero() {

         const newHero = {
             name: $('input[name=name]').val(),
             likes: parseInt($('input[name=likes]').val()),
             dislikes: parseInt($('input[name=dislikes]').val()),
             team: $('input[name=team]').val()
         }
         const newHeroItem = new __WEBPACK_IMPORTED_MODULE_0__heroItem__["a" /* HeroItem */](newHero, this);
         const me = this;
         fetch('marvel/heroes', {
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 method: "POST",
                 body: JSON.stringify(newHero)
             })
             .then(response => {
                 response.json().then(json => {
                     console.log(json);
                     const character = new __WEBPACK_IMPORTED_MODULE_0__heroItem__["a" /* HeroItem */](json, me);
                     me.add(character);
                 })
             });
     },
     add: function(newHero) {
         console.log(newHero.id);
         this.collection.push(newHero);
         this.$el.find('ul').append(newHero.render());
         console.log(this.$el);
         return this.collection;
     },
     renderCheckedList: function() {
         const template = `<div class = component>
			<h3>Hero to add in the movie</h3> 
				<ul>
				</ul>
			</div>`;
         //cached component jQueryified element
         this.$el = $(template);
         console.log(this.$el);
         //All is done in Memory
         this.collection.forEach(hero => this.$el.find('ul').append(hero.renderCheck()));
         //More efficient, if we put in the DOM later
         $('#checkedHeroList').append(this.$el);
         return this.$el;
     },
 }

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heroes_heroListComponent__ = __webpack_require__(0);



let component;

function heroApplication() {
    // now jQuery is ready
    component = new __WEBPACK_IMPORTED_MODULE_0__heroes_heroListComponent__["a" /* HeroListComponent */]();
    component.fetchAll().then(function(heroes) {
        component.render(heroes);
    });
}
// after 25ms
$(document).ready(function() {
    heroApplication();
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__heroListComponent__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = HeroItem;


function HeroItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

HeroItem.prototype = {
    render() {

        const template = `<li>${this.name}&nbsp&nbsp<button class="delete">Delete ${this.name}</button>&nbsp&nbsp&nbsp&nbsp<button class="view">View ${this.name}</button></li>`;
        //Element jQueryfied
        this.$el = $(template);
        const li = $('<li>');
        //Catch the button without reading all DOM with find()
        const button = this.$el.find('button.delete').on('click', event => this.remove());
        const button2 = this.$el.find('button.view').on('click', event => this.viewHero());

        return this.$el;
    },
    viewHero: function() {
        return $.get('marvel/heroes/' + this.id)
            .then(Response => {
                $('div.component').remove();
                const template = `<div class="component"><h1>${this.name}</h1> <ul><li>Name:${this.name}</li><li>Id:${this.id}</li><li>Likes:${this.likes}</li></ul><h1></h1></div>`;
                this.$el2 = $(template);
                $('body').append(this.$el2);
                //this.viewHeroes();

            })
    },

    remove() {
        fetch('marvel/heroes/' + this.id, {
                method: 'delete'
            })
            .catch(error => heroApplication());
        //new state
        this.collection = this.collection.filter(h => h.id !== this.id);
        this.$el.remove();
    },
    renderCheck() {
        const template = `<li><input class="checkboxHero" type= "checkbox" name = ${this.id}>${this.name}</li>`;
        //Element jQueryfied
        this.$el = $(template);
        const li = $('<li>');
        return this.$el;
    }
}

/***/ })
/******/ ]);