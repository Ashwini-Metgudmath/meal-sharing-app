var root = document.location.origin;
var router = new Navigo(root);

// when no route specified it assumes the base route: "/"
router.on(homeRequest).resolve();
router.on("/meals", mealsRequest).resolve();
router.on("/meal/:id", mealRequest).resolve();