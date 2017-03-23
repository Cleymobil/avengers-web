import MovieDataService from "./movie-data-service";
import MovieListComponent from "./movie-list-component";

$(function() {

    const movieDataService = new MovieDataService();
    const movieListComponent = new MovieListComponent(movieDataService);

    $('body').append(movieListComponent.rootNode());

    movieListComponent.start();
});