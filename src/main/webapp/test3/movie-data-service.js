export function MovieDataService() {
}

MovieDataService.prototype = {
    getAll: function () {
        return $.get('../marvel/movies');
    }
}

export default MovieDataService;