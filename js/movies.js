let moviesContainer = document.querySelector(".movies");
let selector = document.querySelector(".selector");
let search = document.getElementById('searchBox');
let movieDate = document.getElementById('date');
//Hämtar Alla API 
let img = "https://image.tmdb.org/t/p/original";
let api = {
    movie: "https://api.themoviedb.org/3/search/movie",
    series:"https://api.themoviedb.org/3/search/tv",
    id:"https://api.themoviedb.org/3/movie/5?api_key=e4684d37a732211173533d0ec685c6ae",
    idseries:"https://api.themoviedb.org/3/search/tv?api_key=e4684d37a732211173533d0ec685c6ae&query=",
    key: "api_key=0ec081e513d39d352a6980418b892e7b",
    movieYear:"https://api.themoviedb.org/3/discover/movie?primary_release_year=",
    seriesYear:"https://api.themoviedb.org/3/discover/tv?primary_release_year="
  };

//----------------------------------------------------------------------
let {movie,series,key,movieYear,seriesYear} = api;
//----------------------------------------------------------------------
// Fetch movie API för att hämta alla movie genom att klicka SÖKA på option och välja mellan movie eller series 
    selector.addEventListener('click', async (selected) =>{
            try {
                let select = selected.target.value;
                //Genom IF Stasten vi Väljer att söka series eller Filmer 
                if(select === 'movies'){
                    if(search.value.length != 0){
                        let movieUrl = `${movie}?${key}&query=${search.value}`;
                        let response = await fetch(movieUrl);
                        let data = await response.json();
                        console.log(data);
                        data.results.forEach(data =>{
                            processingMovies(data); // lägger hämtade datan till processingMovies functionen till movie
                        })
                    }
                    search.setAttribute("placeholder", "Search Movies"); 
                    // Genom .setAttribute() vi programmet ändrar placeholder in i sökfältet när vi väljer series eller movie från option
                }else if(select === "series"){     //Genom IF Stasten vi Väljer att söka series eller Filmer 
                    if(search.value.length != 0){
                        let seriesUrl = `${series}?${key}&query=${search.value}`;
                        let response = await fetch(seriesUrl);
                        let data = await response.json();
                        data.results.forEach(data =>{
                            console.log(data);
                        processingSeries(data); // lägger hämtade datan till processingMovies functionen till series
                    })
                }search.setAttribute('placeholder','Search Series');
                // Genom .setAttribute() vi programmet ändrar placeholder in i sökfältet när vi väljer series eller movie från option
            } 
        }catch (error) {
        throw new Error(error);
    }  
})

//----------------------------------------------------------------------
// addEventListener till sökfältet  
    search.addEventListener('keyup', async (event) => {
            try {
                let value = event.target.value;
                moviesContainer.innerHTML = "";
                if(search.value.length != 0){
                    if(selector.value === 'movies'){
                        let movieUrl = `${movie}?${key}&query=${value}`;
                        let response = await fetch(movieUrl);
                        let data = await response.json();
                        data.results.forEach(data => {
                        processingMovies(data);
                    })
                }else if(selector.value === "series"){
                    moviesContainer.innerHTML = "";
                    let seriesUrl = `${series}?${key}&query=${value}`;
                    let response = await fetch(seriesUrl);
                    let data = await response.json();
                    data.results.forEach(data => {
                        processingSeries(data);
                    })
                }
            } 
        } catch (error) {
        throw new Error(error);
    }   
});

//----------------------------------------------------------------------
//Att få år 
let date = new Date();
let currentYear = date.getFullYear();
let startYear = 1920;
let diff = currentYear - 1920;
console.log(diff)
for (let x = 0; x <= diff; x++) {
  let thisYear = `${startYear++}`;
  movieDate.innerHTML += `<option value="${thisYear}">${thisYear}</option>`;
  
}

//Sök movie elle series genom att välja år
// Fetch movie eller series år  
movieDate.addEventListener('change', async () => {
    if(selector.value === 'movies'){
        let YearSearch = `${movieYear}${movieDate.value}&${key}`;
        moviesContainer.innerHTML = "";
        let response = await fetch(YearSearch);
        let data = await response.json();
        data.results.forEach(year => {
            processingMovies(year);
        });
    }else if(selector.value === "series"){
        let YearSearch = `${seriesYear}${movieDate.value}&${key}`;
        moviesContainer.innerHTML = "";
        let response = await fetch(YearSearch);
        let data = await response.json();
        data.results.forEach(date => {
            processingSeries(date);
        });
    }
});

//----------------------------------------------------------------------
//skapa function så att lägga alla hämtade series till 
let processingSeries = (data)=>{
    let imgurl;
    if(data.backdrop_path ===null){ 
        imgurl = img + data.poster_path;
    }else{
        imgurl = img + data.backdrop_path;
    } 
//----------------------------------------------------------------------
let altimg = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
let htmlData = 
`<div class="card">
    <div class="hidden" style="background:url( ${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg:imgurl});
    background-size:cover; color:white;" alt="${data.original_title}"> ${data.overview}
    </div>
    <div class="card-head">
        <img src="${(imgurl=== "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }" alt="${data.original_title}">
    </div>
    <div class="card-body">
        <h3>${data.name}</h3>
        <p>${data.overview}</p>
        <div class="user">
            <small class="category category-2">${data.first_air_date}</small>
            <small class="category rating">Rating: ${data.vote_average}</small>
        </di>
    </div>
</div>`; ;
moviesContainer.innerHTML += htmlData;
};
//----------------------------------------------------------------------
//skapa function så att lägga alla hämtade movies till 
let processingMovies = (data)=>{
    let imgurl;
    if(data.backdrop_path ===null){
        imgurl = img + data.poster_path;
    }else{
        imgurl =  img + data.backdrop_path;
    }
let altimg = "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
let htmlData = 
`<div class="card">
    <div class="hidden" style="background:url( ${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }); background-size:cover; color:white; " alt="${data.original_title}"> ${data.overview} </div>
        <div class="card-head">
            <img src="${(imgurl === "https://image.tmdb.org/t/p/originalnull")? altimg: imgurl }" alt="${data.original_title}">
        </div>
        <div class="card-body">
            <h3>${data.original_title}</h3>
            <p>${data.overview}</p>  
        <div class="user">
            <small class="category category-2">${data.release_date}</small>
            <small class="category rating">Rating:${data.vote_average}</small>
        </div>
    </div>
</div>`;
moviesContainer.innerHTML += htmlData;
};
//----------------------------------------------------------------------
//bygg function:  genom att click på värje movie eller series då kommer visas baksidan av denna
moviesContainer.addEventListener("click", (e) => {
    let movieDiv = e.target.parentElement;
    if (movieDiv.style.transform == "rotateY(180deg)") {
       if (movieDiv.childNodes[1].classList[0] === "hidden") {
           movieDiv.style.transform = "rotateY(0deg)";
           // setTimeout för att värje div ska vända sig på 300 millisekund
           setTimeout(() => {
               movieDiv.childNodes[3].setAttribute("id", "anticard");
               movieDiv.childNodes[5].setAttribute("id", "anticard");
               movieDiv.childNodes[1].style.display = "none";
            }, 300);
        }
    }else{
        // Genom IF satsen man kan välja att vilken sidan av div eller movie&series ska visas  
        if (movieDiv.childNodes[1].classList[0] === "hidden") {
            movieDiv.style.transform = "rotateY(180deg)";
            movieDiv.childNodes[1].style.transform = "rotateY(180deg)";
            setTimeout(() => {
                movieDiv.childNodes[3].setAttribute("id", "card");
                movieDiv.childNodes[5].setAttribute("id", "card");
                movieDiv.childNodes[1].style.display = "block";
            }, 300);
        }
    }
});