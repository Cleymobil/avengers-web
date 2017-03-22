 import { MovieItem } from "./movieItem";

 export function MovieListComponent() {
     $('button.createMovie').on('click', event => this.createMovie());
     $('button.createMovie2').on('click', event => this.createMovie2());
 }
 MovieListComponent.prototype = {
     fetchAll: function() {
         return $.get('marvel/movies')
             .then(json => {
                 this.collection = [];
                 json.forEach(data => {
                     const movie = new MovieItem(data, this);
                     this.collection.push(movie);
                 });
                 return this.collection;
             });
     },
     render: function() {
         const template = `<div class = component>
			<h1>Movie List</h1> 
				<ul>
				</ul>
				<footer> Some html footer</footer>
			</div>`;
         //cached component jQueryified element
         this.$el = $(template);
         console.log(this.$el);
         //All is done in Memory
         this.collection.forEach(movie => this.$el.find('ul').append(movie.render()));
         //More efficient, if we put in the DOM later
         $('div.movieList').append(this.$el);
         return this.$el;
     },
     renderList: function() {
         const template2 = `<p><select name="movieSelectName" id="movieSelect">
       </select><p/>`;
         //cached component jQueryified element
         this.$el2 = $(template2);
         console.log(this.$el2);
         //All is done in Memory
         this.collection.forEach(movie => this.$el2.find('#movieSelect').append(movie.renderInList()));
         //More efficient, if we put in the DOM later
         $('#movieSelectId').append(this.$el2);
         return this.$el2;
     },
     createMovie() {

         const newMovie = {
             name: $('input[name=movieName]').val(),
             gross: parseInt($('input[name=gross]').val()),
             budget: parseInt($('input[name=budget]').val())
         }
         const newMovieItem = new MovieItem(newMovie, this);
         console.log(newMovie);
         const me = this;
         fetch('marvel/movies', {
                 headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                 },
                 method: "POST",
                 body: JSON.stringify(newMovie)
             })
             .then(response => {
                 response.json().then(json => {
                     console.log(json);
                     const constMovie = new MovieItem(json, me);
                     me.add(constMovie);
                 })
             });
     },
     add: function(newMovie) {
         console.log(newMovie.id);
         this.collection.push(newMovie);
         this.$el.find('ul').append(newMovie.render());
         console.log(this.$el);
         return this.collection;
     },
     createMovie2() {

         let movie = {
             name: $('input[name=movieName2]').val(),
             gross: parseInt($('input[name=gross2]').val()),
             budget: parseInt($('input[name=budget2]').val()),
             history: $('input[name=history2]').val()
         }
         let newMovieItem = new MovieItem(movie, this);
         console.log(movie);
         fetch('marvel/movies/', {
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
             },
             method: "POST",
             body: JSON.stringify(movie)
         }).then(json => {
             this.collection.push(newMovieItem);
             this.$el.find('ul').append(newMovieItem.render())
         });
     }
 }