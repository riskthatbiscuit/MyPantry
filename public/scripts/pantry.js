const pantryForm = document.getElementById('pantry-form');

pantryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let pantryItem = document.getElementById('pantryItem').value.trim();
    let pantryText = document.getElementById('pantryText').value.trim();

    const newPantryItem = {
        pantryItem,
        pantryText,
    };

    fetch('api/pantry', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(newPantryItem),
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.status);
        pantryText = '';
        pantryItem = '';
    })
})
.catch((error) => {
    console.error('Error:', error)
})