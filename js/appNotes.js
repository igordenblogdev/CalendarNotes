// ? Переменные 
const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");
// Id всплывающего окна
const windowNotes = document.getElementById("windowNotes")
// id кнопки закрыть окно
const closeWindowNotes = document.getElementById("closeWindowNotes");

// переменная input для создания заметки
const inputNote = document.getElementById('titleNote');
// переменная кнопки, добавления в LocalStorage
const createBtn = document.getElementById('createBtn');
// переменная ul
const ulListNotes = document.getElementById('listNotes');


// ! получение новой даты, текущего года и месяца
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// ? Массив с месяцами
const months = 
[
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

// ? Массив с месяцами для заголвка
const monthsTitle = 
[
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
]

// Функция закрытия всплывающего окна списка дел
closeWindowNotes.onclick = function() {
    windowNotes.style.left = '-150%';
    renderCalenar()
}

// ? Функция получения календаря
function renderCalenar() {
    // Конечная дата текущего месяца
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();

    // Конечная дата прошлого месяца
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    
    // номер дня первого числа текущего месяца
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay();
    
    // номер дня конечной даты текущего месяца
    let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay();
    
    let liTag = "";

    // Цикл передает последние числа предыдущего месяца
    for(let i = firstDayOfMonth; i > 0; i--) {
        let dateOfThePreviousMonth = lastDateofLastMonth - i + 1;
        // корректировка при начальном месяце
        if(months[currMonth] === 'Январь') {
            // Проверяем существует ли массив в LocalStorage
            if(localStorage.getItem(dateOfThePreviousMonth + " " + "Декабрь" + " " + Number(currYear - 1)) === null) {
                // показываем, что нет записей
                liTag +=`<li class="noActive NoNotes" data-index="${dateOfThePreviousMonth + " " + "Декабрь" + " " + Number(currYear - 1)}">${dateOfThePreviousMonth}</li>`;
            } else {
                // Усли есть массив в LocalStorage, но пустой, тоже показываем, что нет записей
                if(JSON.parse(localStorage.getItem(dateOfThePreviousMonth + " " + "Декабрь" + " " + Number(currYear - 1))).length === 0) {
                    liTag +=`<li class="noActive NoNotes" data-index="${dateOfThePreviousMonth + " " + "Декабрь" + " " + Number(currYear - 1)}">${dateOfThePreviousMonth}</li>`;
                } else {
                    // Если есть записи, отмечаем данную дату другим цветом
                    liTag +=`<li class="noActive YesNotes" data-index="${dateOfThePreviousMonth + " " + "Декабрь" + " " + Number(currYear - 1)}">${dateOfThePreviousMonth}</li>`;
                }
               
            }
            // Для всех других месяцев
        } else {
             // Проверяем существует ли массив в LocalStorage
            if(localStorage.getItem(dateOfThePreviousMonth + " " + monthsTitle[currMonth - 1] + " " + currYear) === null) {
                // показываем, что нет записей
                liTag +=`<li class="noActive NoNotes" data-index="${dateOfThePreviousMonth + " " + monthsTitle[currMonth - 1] + " " + currYear}">${dateOfThePreviousMonth}</li>`;
            } else {
                // Усли есть массив в LocalStorage, но пустой, тоже показываем, что нет записей
                if(JSON.parse(localStorage.getItem(dateOfThePreviousMonth + " " + monthsTitle[currMonth - 1] + " " + currYear)).length === 0) {
                    liTag +=`<li class="noActive NoNotes" data-index="${dateOfThePreviousMonth + " " + monthsTitle[currMonth - 1] + " " + currYear}">${dateOfThePreviousMonth}</li>`;
                } else {
                    // Если есть записи, отмечаем данную дату другим цветом
                    liTag +=`<li class="noActive YesNotes" data-index="${dateOfThePreviousMonth + " " + monthsTitle[currMonth - 1] + " " + currYear}">${dateOfThePreviousMonth}</li>`;
                }
               
            }
        }
    }

    // Цикл передает сам месяц
    for(i = 1; i <= lastDateOfMonth; i++) {
        // Проверяем существует ли массив в LocalStorage
        if(localStorage.getItem(i + " " + monthsTitle[currMonth] + " " + currYear) === null) {
            // Проверяется на сегоднейшую дату
            let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active NoNotes" : "NoNotes";
            liTag +=`<li class="${isToday}" data-index="${i + " " + monthsTitle[currMonth] + " " + currYear}">${i}</li>`;
        } else {
            if(JSON.parse(localStorage.getItem(i + " " + monthsTitle[currMonth] + " " + currYear)).length === 0) {
                let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? "active NoNotes" : "NoNotes";
                liTag +=`<li class="${isToday}" data-index="${i + " " + monthsTitle[currMonth] + " " + currYear}">${i}</li>`;
            } else {
                let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? "active YesNotes" : "YesNotes";
                liTag +=`<li class="${isToday}" data-index="${i + " " + monthsTitle[currMonth] + " " + currYear}">${i}</li>`;
            }
        }
    }

    // Цикл передает первые числа следующего месяца
    for(let i = lastDayOfMonth; i < 6; i++) {
        let nextMonthDate = i - lastDayOfMonth + 1;
        if(months[currMonth] === 'Декабрь') {
            if(localStorage.getItem(nextMonthDate + " " + "Январь" + " " +  Number(currYear + 1)) === null) {
                liTag += `<li class="noActive NoNotes" data-index="${nextMonthDate + " " + "Январь" + " " +  Number(currYear + 1)}">${nextMonthDate}</li>`;
            } else {
                if(JSON.parse(localStorage.getItem(nextMonthDate + " " + "Январь" + " " +  Number(currYear + 1))).length === 0) {
                    liTag += `<li class="noActive NoNotes" data-index="${nextMonthDate + " " + "Январь" + " " +  Number(currYear + 1)}">${nextMonthDate}</li>`;
                } else {
                    liTag += `<li class="noActive YesNotes" data-index="${nextMonthDate + " " + "Январь" + " " +  Number(currYear + 1)}">${nextMonthDate}</li>`;
                }
                
            }
        } else {
            if(localStorage.getItem(nextMonthDate + " " + monthsTitle[currMonth + 1] + " " + currYear) === null) {
                liTag += `<li class="noActive NoNotes" data-index="${nextMonthDate + " " + monthsTitle[currMonth + 1] + " " + currYear}">${nextMonthDate}</li>`;
            } else {
                if(JSON.parse(localStorage.getItem(nextMonthDate + " " + monthsTitle[currMonth + 1] + " " + currYear)).length === 0) {
                    liTag += `<li class="noActive NoNotes" data-index="${nextMonthDate + " " + monthsTitle[currMonth + 1] + " " + currYear}">${nextMonthDate}</li>`;
                } else {
                    liTag += `<li class="noActive YesNotes" data-index="${nextMonthDate + " " + monthsTitle[currMonth + 1] + " " + currYear}">${nextMonthDate}</li>`;
                }
               
            }
           
        }
        
    }
    // получение ноябрь 2023
    currentDate.innerHTML = `${months[currMonth] }  ${currYear}`;
    // получение всех дат месяца
    daysTag.innerHTML = liTag;
}
renderCalenar()


// Функция клика по числам
function clickSelectDateForNotes() {
    daysTag.onclick = function(event) {
        // переменная названия ключа LocalStorage
        const keyDateLocalStorage = event.target.getAttribute("data-index");
        // Проверка условия, есть ли именно такой localStorage
        if(localStorage.getItem(keyDateLocalStorage) === null) {
            localStorage.setItem(keyDateLocalStorage, JSON.stringify([]));
        }
        // Открытие окна со списком дел на определенную дату
        windowNotes.style.left = '50%';
        // Заголовок списка дел на текущую дату
        document.querySelector(".titleTextDate").innerHTML = `<p>список дел на</br>${event.target.getAttribute("data-index")}</p>`;
        // Функция записи в LocalStorage на определенную дату
        createNote(keyDateLocalStorage)
        //Функция показа списка дел на определенную дату
        getNotes(keyDateLocalStorage)
        activesBtn(keyDateLocalStorage)
    }
}
clickSelectDateForNotes();

// Функция исполнения заметки (кнопка check)
function activesBtn(keyLocalStorage) {
    ulListNotes.onclick = function (event) {
        if (event.target.dataset.index) {
            const index = Number(event.target.dataset.index);
            const type = event.target.dataset.type;
            if (type === 'check') {
                // выбираем из LocalStorage по индексу определенную покупки и проверяем на завершенность
                if (JSON.parse(localStorage.getItem(keyLocalStorage))[index].completed === false) {
                    // создаем новый массив из LocalStorage
                    const newArrayNote = JSON.parse(localStorage.getItem(keyLocalStorage));
                    // Меняем выполненность на противоположную
                    newArrayNote[index].completed = true
                    // сохроняем в LocalStorage
                    localStorage.setItem(keyLocalStorage, JSON.stringify(newArrayNote))
                } else if (JSON.parse(localStorage.getItem(keyLocalStorage))[index].completed === true) {
                    const newArrayNote = JSON.parse(localStorage.getItem(keyLocalStorage));
                    newArrayNote[index].completed = false
                    localStorage.setItem(keyLocalStorage, JSON.stringify(newArrayNote))
                }
                getNotes(keyLocalStorage)
            }
            // проверяем условие на нажатие кнопки удаления покупки
            if (type === 'remove') {
                const newArrayNote = JSON.parse(localStorage.getItem(keyLocalStorage));
                // удаляем запись из массива
                newArrayNote.splice(index, 1);
                localStorage.setItem(keyLocalStorage, JSON.stringify(newArrayNote));
                getNotes(keyLocalStorage);
            }
        }
    }
}




// Функция записи в LocalStorage
function createNote(keyLocalStorage) {
    createBtn.onclick = function () {
         if(inputNote.value.length === 0 ) {
            return
        }
        // Создаем новый обьект заметки
        const newNote = {
            titleNote: inputNote.value,
            completed: false
        }
        // новый массив
        notes = JSON.parse(localStorage.getItem(keyLocalStorage));
        // добовляем запись
        notes.push(newNote);
        // сохроняем в LocalStorage
        localStorage.setItem(keyLocalStorage, JSON.stringify(notes));
        // Очищаем инпут после ввода
        inputNote.value = '';
        // Обновляем список
        getNotes(keyLocalStorage)
    }
}


// Функция показа списка дел
function getNotes(keyLocalStorage) {
    ulListNotes.innerHTML = '';
    if (JSON.parse(localStorage.getItem(keyLocalStorage)).length === 0) {
        ulListNotes.innerHTML = `
        <li id="note" style="background: rgb(250, 236, 128); ">
            <div id="text">
                <span style="justify-content: center; text-transform: uppercase; color: rgb(5, 45, 131)">
                    Дела не запланированы
                </span>
            </div>
        </li>
        `
    }
    for (i = 0; i < JSON.parse(localStorage.getItem(keyLocalStorage)).length; i++) {
        ulListNotes.insertAdjacentHTML(
            'beforeend', getNoteTemplate(
                JSON.parse(localStorage.getItem(keyLocalStorage))[i].titleNote,
                JSON.parse(localStorage.getItem(keyLocalStorage))[i].completed,
                i
            )
        );
    }
}


// шаблон вывода списка дел 
function getNoteTemplate(titleNote, completedNotes, indexNotes) {
    
    function checkExecutionCompleted() {
        if (completedNotes === true) {
            return `<div class="check">
                        <button
                            id="checkBtn"
                            data-index = "${indexNotes}"
                            data-type="check"
                            style="
                                border:none;
                                background: rgb(23, 138, 23);
                            "
                        >
                            <i
                                class="bx bx-check"
                                data-index = "${indexNotes}"
                                data-type="check"
                            >
                            </i>
                        </button>
                    </div>`
        } else {
            return `<div class="check">
                        <button
                            id="checkBtn"
                            data-index="${indexNotes}"
                            data-type="check"
                        >

                        </button>
                    </div>`
        }
    }
    return ` 
        <li id="note" style="${completedNotes ? ' background: rgb(176, 233, 176);' : ''}">
            ${checkExecutionCompleted()}
            <div id="text" style="${completedNotes ? 'text-decoration: line-through;' : ''}">
                <span>${titleNote}</span>
            </div>
            <div class="actionBtn">
                <button id="deleteBtn" style="border: none">
                    <i
                        class='bx bxs-trash'
                        data-index = "${indexNotes}"
                        data-type="remove"
                    >
                    </i>
                </button>
            </div>
        </li>
    `
}

prevNextIcon.forEach(icon => {
    icon.addEventListener('click', (event) => { //добавление события клика на обе иконки
        //если выбранный значок является предыдущим значком, уменьшите текущий месяц на 1, иначе увеличьте его на 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1; 
        if(currMonth < 0 || currMonth > 11) { //если текущий месяц меньше 0 или больше 11
            date = new Date(currYear, currMonth); 
            currYear = date.getFullYear(); //обновление текущего года с новой датой года
            currMonth = date.getMonth(); //обновление текущего месяца с новой датой месяца
        } else { //иначе передайте новую дату как значение даты
            date = new Date();
        }
        renderCalenar()
    })
})





