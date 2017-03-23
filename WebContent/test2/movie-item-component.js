export function MovieItemComponent() {
    this.el = $(`
        <div>
            <span class = "id"></span>
            <span class = "name"></span>
        </div>
        `)
}
MovieItemComponent.prototype = {
    rootNode: function() {
        return this.el;
    },
    setMovie: function(movie) {
        this.el.find('.id').text(movie.id);
        this.el.find('.name').text(movie.name);
    }
}
export default MovieItemComponent;