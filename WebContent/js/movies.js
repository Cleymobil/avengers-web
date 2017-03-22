import { MovieListComponent } from "./movies/movieListComponent";
import { HeroListComponent } from "./heroes/heroListComponent";

let component;

function movieApplication() {
    // now jQuery is ready
    component = new MovieListComponent();
    component.fetchAll().then(function(movies) {
        component.render(movies);
        component.renderList(movies);
    })
    let heroListComponent = new HeroListComponent();
    heroListComponent.fetchAll().then(function(heroes) {
        heroListComponent.renderCheckedList(heroes);
    })
}
// after 25ms
$(window).on("load", function() {
    movieApplication();
});