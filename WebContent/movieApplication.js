let component;

function movieApplication() {
    // now jQuery is ready
    component = new MovieListComponent();
    component.fetchAll().then(function(movies) {
        component.render(movies);
        component.renderList(movies);
    })
    heroListComponent = new HeroListComponent();
    heroListComponent.fetchAll().then(function(heroes) {
        heroListComponent.renderCheckedList(heroes);
    })
}
// after 25ms
$(document).ready(function() {
    movieApplication();
});