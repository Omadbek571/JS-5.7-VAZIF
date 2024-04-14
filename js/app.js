const darkmodeBtn = document.querySelector("#darkmodeBtn");
const searchInp = document.getElementById("searchInp");
const productsListt = document.getElementById("productsListt");
const todoForm = document.getElementById("todoForm");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector("#modal");
const editForm = document.querySelector("#editForm");
const editInp = document.querySelector("#editInp");

// Dark mode tugmasi bosilganda ishga tushadi
darkmodeBtn.addEventListener('click', () => {
    if (document.body.classList.contains("light")) {
        document.body.classList.remove("light");
        darkmodeBtn.textContent = "Dark";
    } else {
        document.body.classList.add("light");
        darkmodeBtn.textContent = "Light";
    }
});

// Modalni ochish funksiyasi
function openModal() {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// Modalni yopish funksiyasi
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Modalga chiqib ketish
overlay.addEventListener('click', () => {
    closeModal();
});

// Todo qo'shish
let todoArr = [];
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let date = new Date();

    let todo = {
        id: Math.floor(Math.random() * 100),
        text: searchInp.value,
        time: date.toLocaleString("uz-Uz", {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
    };

    todoArr.push(todo);
    searchInp.value = "";
    createTodos(todoArr);
});

// Todo lar ro'yxatini yaratish
function createTodos(data = todoArr) {
    
    productsListt.innerHTML = "";

    data.forEach(({ id, text, time }) => {
        const li = document.createElement("li");
        li.classList.add("list-item");

        li.innerHTML = `
        <p>${text}</p>
        <p>${time}</p>
        <div class="list" style="gap: 5px;">
            <i class="fa-solid fa-pen-to-square" onclick="updateTodo(${id})"></i>
            <i class="fa-solid fa-trash" onclick="deleteTodo(${id})"></i>
        </div>`;

        productsListt.appendChild(li);
    });
}

// Todo ni o'chirish
function deleteTodo(itemId) {
    let index = todoArr.findIndex(item => item.id === itemId);

    if (index !== -1) {
        todoArr.splice(index, 1);
        createTodos(todoArr);
    }
}

// Todo ni yangilash
function updateTodo(itemId) {
    openModal();

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        todoArr = todoArr.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    text: editInp.value,
                };
            }
            return item;
        });

        closeModal();
        createTodos();
    });
}
