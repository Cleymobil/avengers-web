 import { HeroItem } from "./heroItem";

 export function HeroListComponent() {
     $('button.create').on('click', event => this.createHero())

 }
 HeroListComponent.prototype = {
     fetchAll: function() {
         return $.get('marvel/heroes')
             .then(json => {
                 this.collection = [];
                 json.forEach(data => {
                     const hero = new HeroItem(data, this);
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
         const newHeroItem = new HeroItem(newHero, this);
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
                     const character = new HeroItem(json, me);
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