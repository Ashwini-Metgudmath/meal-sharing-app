mealRequest = (params) =>{
    const htmlContent = `
    <main class="container mt-5">
  <section class="row singleMealPage">
    <section class="col-sm" id="getSingleMeal">
    </section>
    <section class="col-sm" id ="reservationForm">
    <p id="message"></p>
    <form>
    </form>
    </section>
  </section>
  <section class="addColorToText reviewSection" id="reviews">
  Reviews
 </section>
</main>`;
document.body.innerHTML = htmlContent;

function fetchJsonUrl(url) {
    return fetch(url).then(res => res.json());
 }

Promise.all([fetchJsonUrl(`/meals/${params.id}`),fetchJsonUrl(`/reservations/${params.id}`),fetchJsonUrl(`/reviews/${params.id}`)])
	.then(mealsData => {
  //console.log('mealdata:'+mealsData);
     let meal = mealsData[0];
     let reservations = mealsData[1];
     let reviews = mealsData[2];
     const singleMealdiv = document.getElementById('getSingleMeal');
    const singleMeal = document.createElement('div');
    singleMeal.classList.add('col-md');
    let sumOfReservations = 0;
    if(reservations.length > 1){
      for(let i = 0; i < reservations.length; i++){
        sumOfReservations += reservations[i].number_of_guests;
       }
    } else {
      sumOfReservations = 0;
    }
     let availableReservations;
     if(availableReservations <= 0) {
       availableReservations = 0;
     }else {
      availableReservations = meal[0].max_reservations -  sumOfReservations;
     }
     singleMeal.innerHTML = `
      <h1 class="addColorToText">${meal[0].title}</h1>
      <div class="card mb-3">
        <img src="${meal[0].image}" class="card-img-top" alt="Meal Image">
        <div class="card-body">
          <h5 class="card-title">${meal[0].description}</h5>
          <p class="card-text"><i class="far fa-user"></i>${availableReservations}</p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-money-bill-wave"></i>${parseInt(meal[0].price).toFixed(2)}</small></p>
          <p class="card-text"><small class="text-muted"><i class="fas fa-map-marker-alt"></i>${meal[0].location}</small></p>
       </div>
    </div>`
    singleMealdiv.appendChild(singleMeal);

    const reservationForm = document.querySelector('form');
    if(availableReservations <= 0 ){
      reservationForm.innerHTML = `Sorry!! there are no more available reservations for this meal`;
      availableReservations = 0;
    }else{
      reservationForm.innerHTML = `
      <h1 class="addColorToText">Reservation form</h1>
      <div class = "form-group">
      <label>Name</label>
      <input class="form-control" type="text" name="name" placeholder="Full Name" id="fullName" required>
      </div>
      <div class = "form-group">
      <label>email</label>
      <input class="form-control" type="email" name="email" placeholder="Email" id="email" required>
      </div>
      <div class = "form-group">
      <label>Phone Number</label>
      <input class="form-control" type="number" name="phoneNumber" placeholder="Phone Number" id="phoneNumber" required>
      </div>
      <div class = "form-group">
      <label>No. of guests</label>
      <input class="form-control" type="number" name="guests" placeholder="Number of guests" id="guests" required>
      </div>
      <button type="submit" id="btnSubmit" class="btn btn-primary">Reserve your seat</button>
      `
      const submitReserve = document.getElementById('btnSubmit');
      submitReserve.addEventListener( 'click', (e) =>{
       e.preventDefault();
       console.log('entered click');
        const meal_id = parseInt(params.id);
        const name = document.getElementById('fullName');
        console.log(`name: ${name.value}`)
        const phone = document.getElementById('phoneNumber');
        console.log(`phoneNumber: ${phone}`)
        const email = document.getElementById('email');
        console.log(`email: ${email}`)
        const number_of_guests = document.getElementById('guests');
        console.log(`number_of_guests: ${number_of_guests}`)
        const created_date = new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '') ;    // delete the dot and everything after
        console.log(`created_date: ${created_date}`)
        const reservation = {
          "name" : name.value,
          "email": email.value,
          "phone":phone.value,
          "number_of_guests":number_of_guests.value,
          "meal_id": meal_id,
          "created_date":created_date
        }

        fetch('/reservations/add-reservation', {
          method: "POST",
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservation)
          })
          .then(res => res.text())
          .then((result) => {
            
            const message = document.getElementById("message");
            message.innerHTML = result;
            name.value = '';
            phone.value = '';
            email.value = '';
            number_of_guests.value = '';
          })  
      })

    }

    const reviewSection = document.getElementById('reviews');
  const reviewlist = document.createElement('ul');
  reviewlist.innerHTML = '';
  if(reviews.length > 1){
    for(let i = 0; i < reviews.length; i++){
      console.log(reviews[i].description)
      reviewlist.innerHTML += 
      `<li> ${reviews[i].description}</li>
      `;
    }
  } else if (reviews.length === 0) {
    reviewlist.innerHTML = `<li>No reviews available</li>`
  } else {
    reviewlist.innerHTML = 
    `    <li> ${reviews[0].description}<li>
    `;
   }
  reviewSection.appendChild(reviewlist); 

})
router.updatePageLinks();

}

/*window.handleMealRequest = params => {
  document.body.innerHTML = `
  <h1>Meal with id ${params.id}</h1>`;
};*/