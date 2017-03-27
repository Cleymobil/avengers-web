import { MovieItemComponent } from "./movie-item-component";

export function MovieListComponent(movieDataService) {

    this.el = $(`<div>bonjour</div>`);

    this.movieDataService = movieDataService;


}

MovieListComponent.prototype = {
    rootNode: function () {
        return this.el;

    },

    start: function () {

        this.movieDataService.getAll()
            .then(movies => {
                for (let movie of movies) {
                    let movieItemComponent = new MovieItemComponent();
                    movieItemComponent.setMovie(movie);
                    this.el.append(movieItemComponent.rootNode());
                }
            })
    }
}

export default MovieListComponent