let component;
function movieApplication() {
    // now jQuery is ready
	component = new MovieListComponent();
    component.fetchAll().then(function (movies) {
        component.render(movies);
    });
}
// after 25ms
$(document).ready(function(){
	movieApplication();
});
