homeRequest = () => {
  const htmlContent = `
  <main class="container">
    <section id="root"></section>
</main>
  `;
 
  function fetchJsonUrl(url) {
    return fetch(url).then(res => res.json());
 }
 
  document.body.innerHTML = htmlContent;
  const root = document.getElementById('root');
  
    Promise.all([fetchJsonUrl('/meals'), fetchJsonUrl('/reviews')])
   .then(mealsReviewsData => {
     let meals = mealsReviewsData[0];
     let reviews = mealsReviewsData[1];
     //console.log(mealsReviewsData);
     //console.log(meals);
     //console.log(reviews);
    meals.map(meal => {
      const mealDataCopy = Object.assign({}, meal);
            mealDataCopy.review = reviews.filter(review => review.meal_id === meal.id)
            const div = document.createElement('div');
				div.classList.add('card');
			
            let starTotal = 5;
            let ratings;
            let sum = 0;
            let starPercentage;
            let starPercentageRounded;
            if((mealDataCopy.review).length > 1){
               for(let i = 0; i < (mealDataCopy.review).length; i++){
                   sum += mealDataCopy.review[i].stars;
                  }
               ratings = sum / (mealDataCopy.review).length;
               starPercentage = ratings/starTotal * 31.25;
               starPercentageRounded = `${Math.round(starPercentage)}%`
            } else if((mealDataCopy.review).length === 0 ){
               starPercentageRounded = 0
               ratings = `no ratings`
            } else {
               ratings = mealDataCopy.review[0].stars;
               starPercentage = ratings/starTotal * 31.25;
               starPercentageRounded = `${Math.round(starPercentage)}%`

            }
    
    div.innerHTML =`
    <img class="card-img-top" src="${meal.image}" alt="mealImg">
    <h3 class="card-title">${meal.title}</h3>
    <p class="card-text">${meal.description}</p>
    <div class="stars-outer">
    <span class="number-rating">rating: ${ratings}</span>
    </div>
    <p class="card-text">
    <span class="mealIconText"><i class="fas fa-map-marker-alt"></i>${meal.location}</span>
    <span class="mealIconText"><i class="fas fa-money-bill-wave"></i>${parseInt(meal.price).toFixed(2)}Dkk</span>
    </p>
   <a href="meal/${meal.id}" data-navigo class=" btn btn-primary">Reserve</a>
    `
    root.appendChild(div);
    });


  });

  router.updatePageLinks()
};
