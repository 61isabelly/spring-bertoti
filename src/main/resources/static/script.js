document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "http://localhost:8080/searches";

    function fetchSearches() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const catalogContainer = document.querySelector(".catalog-container");
                catalogContainer.innerHTML = "";

                data.forEach(search => {
                    const card = createCard(search);
                    catalogContainer.appendChild(card);
                });
            })
            .catch(error => console.error("Error fetching data:", error));
    }

    function createCard(search) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${search.name}</h3>
            <p>${search.description}</p>
            <p>${search.category}</p>
            <div class="card-buttons">
                <button class="edit-button" data-id="${search.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-button" data-id="${search.id}"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;

        card.querySelector(".edit-button").addEventListener("click", function () {
            const id = this.dataset.id;
            const newName = prompt("Enter new name:");
            const newDescription = prompt("Enter new description:");
            const newCategory = prompt("Enter new category:");

            const updatedSearch = {
                name: newName,
                description: newDescription,
                category: newCategory
            };

            updateSearch(id, updatedSearch);
        });

        card.querySelector(".delete-button").addEventListener("click", function () {
            const id = this.dataset.id;
            deleteSearch(id);
        });

        return card;
    }

    function deleteSearch(id) {
        fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        })
            .then(() => fetchSearches())
            .catch(error => console.error("Error deleting search:", error));
    }

    function updateSearch(id, updatedSearch) {
        fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedSearch)
        })
            .then(() => fetchSearches())
            .catch(error => console.error("Error updating search:", error));
    }

    document.querySelector(".add-button").addEventListener("click", function () {
        const newSearch = {
            name: "New Search",
            description: "Description of the new search",
            category: "Category of the search"
        };

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSearch)
        })
            .then(() => fetchSearches())
            .catch(error => console.error("Error adding search:", error));
    });

    fetchSearches();

    // Funcionalidade de busca
    const searchInput = document.querySelector(".search_input");
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            const description = card.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
            const category = card.querySelector("p:nth-of-type(2)").textContent.toLowerCase();

            const matches = name.includes(query) || description.includes(query) || category.includes(query);
            card.style.display = matches ? "block" : "none";
        });
    });
});
