const pantryForm = document.getElementById('pantry-form');
const pantryContainer = document.getElementById("pantry-container");

const createCard = (pantry) => {
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
    cardHeaderEl.innerHTML = `${pantry.title} </br>`;

    const cardBodyEl = document.createElement('div');
    cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
    cardBodyEl.innerHTML = `<p>${pantry.text}</p>`;

    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);

    pantryContainer.appendChild(cardEl);
};

const getPantry = () =>
    fetch("api/pantry", {
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

    
const postPantry = (pantry) =>
    fetch('api/pantry', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pantry),
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data);
        createCard(pantry);
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    
getPantry().then((data) => data.forEach((pantry) => createCard(pantry)));

const handlePantrySubmit = (e) => {
    e.preventDefault();
    console.log('Form submit invoked');

    const pantryItem = document.getElementById('pantryItem').value.trim();
    const pantryText = document.getElementById('pantryText').value.trim();

    const newPantryItem = {
      pantryItem,
      pantryText,
    };
    console.log(newPantryItem)
    postPantry(newPantryItem);
}

pantryForm.addEventListener('submit',handlePantrySubmit);