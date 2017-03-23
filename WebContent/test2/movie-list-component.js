import MovieItemComponent from "./movie-item-component";

export function MovieListComponent(movieDataService) {
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
                    let movieItemComponent = new MovieItemComponent();
                    movieItemComponent.setMovie(movie);
                    this.el.append(movieItemComponent.rootNode());
                }
            });
    }
}

export default MovieListComponent;