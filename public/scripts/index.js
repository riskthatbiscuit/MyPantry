const mealForm = document.getElementById('meal-form');
const mealContainer = document.getElementById('meal-container');

const createCard = (meal) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'mb-3');

    const cardHeaderEl = document.createElement('h4');
    cardHeaderEl.classList.add(
        'card-header',
        'bg-primary',
        'text-light',
        'p-2',
        'm-0'
    );
    cardHeaderEl.innerHTML = `${meal.title} </br>`;

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
    cardBodyEl.innerHTML = `Description`
    

    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);
    mealContainer.appendChild(cardEl);
};

const getMeal = () =>
    fetch("api/meal", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
        console.error('Error:', error);
    });

    
const postMeal = (meal) =>
    fetch('api/meal', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(meal),
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data);
        createCard(meal);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    
getMeal().then((data) => data.forEach((meal) => createCard(meal)));

const handleMealSubmit = (e) => {
    console.log('Form submit invoked');
    e.preventDefault();

    const title = document.getElementById('mealName').value.trim();

    const newMealItem = {
        title,
    };
    console.log(newMealItem)
    postMeal(newMealItem);
}

mealForm.addEventListener('submit',handleMealSubmit);