package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import io.avengers.domain.Movie;
import io.avengers.service.MovieService;
import javax.ws.rs.core.MediaType;




@Path("movies")
@Produces(MediaType.APPLICATION_JSON)
public class MovieResource {
	@GET
	public Set<Movie> getAllMovies(){
		MovieService mService = new MovieService();
		return mService.findAll();
		
	}
	@Path("{term}")
	@GET
	public Set<Movie> getMoviesByName(@PathParam("term") String term){
		MovieService mService = new MovieService();
		return mService.findMoviesByName(term);
		
	}

}
