const appDescription = new Vue({
    el: '#appDescription',
    data: {
        id: '',
        movie: {},
        title: '',
        overview: '',
        poster_path: '',
        peliculasFavoritas: [],
        genres: '',
        successMessage: '', // Nuevo para mensajes de éxito
        errorMessage: '', // Nuevo para mensajes de error
    },
    methods: {
        getMovie() {
            const movieId = this.id;

            if (!isNaN(movieId)) {
                fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=eae71e9888ac9c5226c848e89f83ee1f`)
                    .then(response => response.json())
                    .then(data => {
                        this.movie = data;
                        this.title = data.title;
                        this.overview = data.overview;
                        this.poster_path = data.poster_path;
                        this.movie.averageRating = data.vote_average.toFixed(1);
                        this.movie.runtime = data.runtime;

                        const genreIds = data.genres.map(genre => genre.id);
                        if (genreIds) {
                            fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=eae71e9888ac9c5226c848e89f83ee1f&language=es`)
                                .then(response => response.json())
                                .then(genresData => {
                                    const genres = genresData.genres;
                                    const movieGenres = genres.filter(genre => genreIds.includes(genre.id));
                                    this.movie.genres = movieGenres;
                                });
                        }

                        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=eae71e9888ac9c5226c848e89f83ee1f`)
                            .then(response => response.json())
                            .then(reviewsData => {
                                const reviews = reviewsData.results;
                                if (reviews && reviews.length > 0) {
                                    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
                                    this.movie.averageRating = averageRating.toFixed(2);
                                }
                            });
                    })
                    .catch(error => {
                        console.error('Error al obtener datos de la película:', error);
                    });
            }
        },

        addMovieToFavorites() {
            const storedMovies = JSON.parse(localStorage.getItem("peliculasFavoritas")) || [];
            const exists = storedMovies.some(favoriteMovie => favoriteMovie.id === this.movie.id);
        
            if (!exists) {
                storedMovies.push(this.movie);
                localStorage.setItem("peliculasFavoritas", JSON.stringify(storedMovies));
                this.peliculasFavoritas = storedMovies;
                this.successMessage = 'Película añadida a favoritos';
                this.errorMessage = '';
                this.clearMessage();
            } else {
                this.errorMessage = 'La película ya se encuentra en sus favoritos';
                this.successMessage = '';
                this.clearMessage();
            }
        },
        clearMessage() {
            setTimeout(() => {
                this.successMessage = '';
                this.errorMessage = '';
            }, 3000);
        },
    },
    mounted() {
        const urlParams = new URLSearchParams(window.location.search);
        this.id = parseInt(urlParams.get('id'), 10);

        this.getMovie();
    }
});
