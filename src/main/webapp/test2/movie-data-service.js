export function MovieDataService() {

}

MovieDataService.prototype = {
    getAll: function() {
            return $.get("../marvel/movies");
        }
        /* upDate : function() {

    },
    create : function() {

    },
    delete : function() {

    }
*/
}
export default MovieDataService;