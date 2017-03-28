import { MovieDataService } from "./movie-data-service";
import { MovieListComponent } from "./movie-list-component";


$(function () {
    let movieDataService = new MovieDataService();
    let movieListComponent = new MovieListComponent(movieDataService);

    $('body').append(movieListComponent.rootNode())

    movieListComponent.start();
})