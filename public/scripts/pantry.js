const pantryForm = document.getElementById('pantry-form');
const pantryContainer = document.getElementById('pantry-container');

const createCard = (pantryItem) => {
    console.log(pantryItem)
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'mb-3','col-3');

    const cardHeaderEl = document.createElement('h4');
    cardHeaderEl.classList.add('card-header','bg-primary','text-light','p-2','m-0');
    cardHeaderEl.innerHTML = `${pantryItem.title}`

    const cardBodyEl = document.createElement("div");
    cardBodyEl.classList.add("card-body", "bg-light", "p-2", "flex-row", "justify-space-between");
    cardBodyEl.innerHTML = `${pantryItem.text}`

    const delBtn = document.createElement('button');
    delBtn.classList.add("btn", "btn-danger", "p-2");
    delBtn.textContent = "Delete"
    delBtn.setAttribute('id',`${pantryItem.id}`)
    delBtn.addEventListener('click', handlePantryDelete)
    cardBodyEl.appendChild(delBtn)

    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);
    pantryContainer.appendChild(cardEl);
}

const getPantry = () => fetch('api/pantry', {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
        },
    })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error("Error:", error)
)

const postPantry = (pantry) =>
    fetch("api/pantry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(pantry),
    })
    .then((res) => res.json())
    .then((data) => {
        // alert(data);
        createCard(pantry);
    })
    .catch((error) => console.error("Error:", error)
    )

const removePantry = (id) =>fetch(`api/pantry/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
})

getPantry().then((data) => data.forEach((pantryItem) => createCard(pantryItem)))

const handlePantrySubmit = (e) => {
    console.log('Form submit invoked');
    e.preventDefault();

    let title = document.getElementById("pantryItem").value.trim();
    let text = document.getElementById("pantryText").value.trim();

    const newPantryItem = {
        title,
        text,
    };

    console.log(newPantryItem);
    postPantry(newPantryItem);
}

const handlePantryDelete = (e) => {
    e.preventDefault();

    const pantryId = e.target.getAttribute('id');
    removePantry(pantryId).then(() => {
        const cardEl = e.target.closest('.card');
        if (cardEl) {
            cardEl.remove();
        }
    }).catch((error) => console.error("Error:", error));
};

pantryForm.addEventListener('submit', handlePantrySubmit);

