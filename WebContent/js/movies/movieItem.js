 import { MovieListComponent } from "./movieListComponent";

 export function MovieItem(data, listComponent) {
     Object.assign(this, data);
     this.listComponent = listComponent;
     this.collection = listComponent.collection;
 }

 MovieItem.prototype = {
     render() {

         const template = `<li>${this.name}&nbsp&nbsp<button>Delete ${this.name}</button></li>`;
         //Element jQueryfied
         this.$el = $(template);
         const li = $('<li>');
         //Catch the button without reading all DOM with find()
         const button = this.$el.find('button').on('click', event => this.remove());
         return this.$el;
     },
     renderInList() {
         const template = `<option value="${this.name}">${this.name}</option>`;
         //Element jQueryfied
         this.$el2 = $(template);
         return this.$el2;
     },

     remove() {
         fetch('marvel/movies/' + this.id, { method: 'delete' })
             .catch(error => movieApplication());
         //new state
         this.collection = this.collection.filter(m => m.id !== this.id);
         this.$el.remove();
     },
     addHeroInMovie() {
         const heroes_id = [];
         $('input.check:checked').each(function() {
             heroes_id.push($(this).name());
         });
         const movie_name = $("#movieSelect").val().id;

     }
 }