function MovieListComponent() {
    $('button.createMovie').on('click', event => this.createMovie());
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
    createMovie() {

        const movie = {
            name: $('input[name=movieName]').val(),
            gross: parseInt($('input[name=gross]').val()),
            budget: parseInt($('input[name=budget]').val()),
        }
        const newMovieItem = new MovieItem(newMovie, this);
        console.log(movie);
        fetch('marvel/movies/', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(movie)
        })//.then(json => {
        	//this.collection.push(newMovieItem);
        	//this.$el.find('ul').append(newMovieItem.render())
       // })

    }
}


function MovieItem(data, listComponent) {
    Object.assign(this, data);
    this.listComponent = listComponent;
    this.collection = listComponent.collection;
}

MovieItem.prototype = {
    render() {

        const template = `<li>${this.name}<button>Delete ${this.name}</button></li>`;
        //Element jQueryfied
        this.$el = $(template);
        const li = $('<li>');
        //Catch the button without reading all DOM with find()
        const button = this.$el.find('button').on('click', event => this.remove());
        return this.$el;
    },

    remove() {
        fetch('marvel/movies/' + this.id, { method: 'delete' })
            .catch(error => movieApplication());
        //new state
        component.collection = component.collection.filter(h => h.id !== this.id);
        this.$el.remove();
    }
}