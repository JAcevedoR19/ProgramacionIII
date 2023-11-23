const app = new Vue({
    el: '#app',
    data: {
        completed: false,
        movie: {
            id: '',
            title: '',
            overview: '',
            poster_path: '',
            averageRating: '',
            genres: '',
        },
        lista: [],
        carouselImages: [],
        searchTerm: '',
        },
        mounted() {
            this.getMovies();
        },
    methods: {
        async getMovies() {
            const endPoint = 'https://api.themoviedb.org/3';
            const apiKey = 'eae71e9888ac9c5226c848e89f83ee1f';
            const API_URL = `${endPoint}/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

            try {
            const response = await fetch(API_URL);
            const data = await response.json();

            this.carouselImages = data.results.slice(0, 3).map(movie => ({
                src: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                alt: movie.title,
            }));

            this.lista = data.results;

            console.log(data);
            
            this.completed = true;
            } catch (error) {
            console.log(error);
            }

            
        },

        filterMovies() {
            this.lista = this.lista.filter(movie => {
                return movie.title.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        },

        openDescription(movie) {
            console.log(movie.id);
            window.location = `description.html?id=${movie.id}`;
        }
    },
});