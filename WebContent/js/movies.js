//STATE of my application
let allMovies = [];

function application(){
	fetchMovies().then(function(movies){
		console.log('found movies', movies);
		
        //changed the state
		allMovies = movies;
        
        displayMovies(movies);
	});
}

function fetchMovies(){
	console.log(' fetching movies')
	return fetch('marvel/movies').then(resp => resp.json());
}

function displayMovies(movies){
	const ul = document.createElement('ul');
	document.getElementsByClassName("display").appendChild(ul);
    movies.forEach(movie =>displayMovie(movie));
}

function displayMovie(movie){
	console.log('movie', movie.name);
    
    //SEARCH ul
    const ul =document.querySelector('ul');

    // CREATE <li></li>
    const li = document.createElement('li');
	const text = document.createTextNode(movie.name);
	li.appendChild(text);
    ul.appendChild(li);

    //CREATE button
    const button = document.createElement('button');
    button.appendChild(document.createTextNode('delete '+movie.name));
    li.appendChild(button);

    button.addEventListener('click',function(event){
        console.log('event: ', event);
        removeMovie(movie);
    });
}

function removeMovie(movie){
    fetch('api/movies/'+movie.id, {method:'delete'})
        .catch(error => application() );
    //new state
    allMovies = allMovies.filter(u => movie.id !== u.id);
    // remove ul
    document.body.removeChild(document.querySelector('ul'));
    //replay
    displayMovies(allMovies);
}

application();
