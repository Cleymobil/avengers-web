 import { TeamListComponent } from "./teamListComponent";

 export function TeamItem(data, listComponent) {
     Object.assign(this, data);
     this.listComponent = listComponent;
     this.collection = listComponent.collection;
 }

 TeamItem.prototype = {

     render: function() {
         const template = `<li>${this.name}<button class="delete">Delete ${this.name}</button><button class="view">View ${this.name}</button></li></ul></div>`;
         this.$el = $(template);

         const button = this.$el.find('button.delete').on('click', event => this.remove());
         const button2 = this.$el.find('button.view').on('click', event => this.viewTeam());
         return this.$el;

     },

     renderInList: function() {
         const template = `<option value="${this.name}">${this.name}</option>`;
         //Element jQueryfied
         this.$el2 = $(template);
         return this.$el2;
     },

     remove: function() {
         console.log("removing " + this.name + " " + "id: " + this.id)
         fetch('marvel/teams/' + this.id, { method: 'delete' })
             .catch(error => application());
         //new state
         this.collection = this.collection.filter(team => team.id !== this.id);
         this.$el.remove()

     },

     viewTeam: function() {
         return $.get('marvel/teams/' + this.id)

         .then(Response => {
             $('div.component').remove();
             const template = `<div class="component"><h1>${this.name}</h1> <ul><li>Name:${this.name}</li><li>Id:${this.id}</li><li>History:${this.history}</li></ul><h1><button class="viewTeams">View teams</button></h1></div>`;
             this.$el = $(template);
             const button3 = this.$el.find('button.viewTeams').on('click', event => this.home());
             $('body').append(this.$el);
             this.viewHeroes();

         })
     },

     fetchHeroes: function() {

         return $.get('marvel/teams/' + this.id + '/heroes')

         .then(json => {
             this.heroes = [];

             json.forEach(data => {

                 this.heroes.push(data)

             })
             console.log(this.heroes);
             return this.heroes;
         });

     },

     viewHeroes: function() {

         const template = '<li>Team heroes<ul></ul></li>';
         this.$el = $(template);

         return this.fetchHeroes()
             .then(heroes => {
                 if (heroes.length !== 0) {
                     heroes.forEach(hero => {
                         console.log("heroName " + hero.name);
                         this.$el.find('ul').append('<li>' + hero.name + '</li>')
                     });
                 } else { this.$el.find('ul').append("<li>There are no heroes in the team</li>") };
                 $('body div.component ul').append(this.$el)
                 return this.$el;

             });
     },

     home: function() {

         $('div.component').remove();

         this.listComponent.render();
     }
 }