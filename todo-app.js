
(function() {

    let arrayItem = [],
    listName = ''

    function createAppTitle (title) {
        let appTitle = document.createElement('h2');
        appTitle.innerHTML = title;
        return appTitle;

    }
    function createTodoItemForm() {

        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWraper = document.createElement('div');
        let button = document.createElement('button');
        //

        form.classList.add('input-group','mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWraper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';
        //
        buttonWraper.append(button);


        form.append(input);
        form.append(buttonWraper);

        button.disabled = true;

        input.addEventListener("input", function() {
        button.disabled = !this.value;
        })

        return {
            form,
            input,
            button,
        };
    }

    function createTodoList() {
        let list = document.createElement ('ul');
        list.classList.add('list-group');
        return list;

    }

    function idForItem(arr) {
        let max = 0;
        for (const item of arr) {
            if (item.id > max){
                max = item.id
            }
        }
        return max + 1
    }

    function createTodoItem (obj) {

        let item = document.createElement('li');
        //

        item.textContent = obj.name
        item.classList.add('list-group-item','d-flex','justify-content-between','aling-item-center')




        //
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deliteButton = document.createElement('button');
        //
        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn','btn-success');
        doneButton.textContent = 'Готово';
        deliteButton.classList.add('btn','btn-danger');
        deliteButton.textContent = 'Удалить';
        //
        buttonGroup.append(doneButton);
        buttonGroup.append(deliteButton);
        item.append(buttonGroup);

        if(obj.done === true ) {
          item.classList.add('list-group-item-success')
        }

        doneButton.addEventListener('click', function(){
            item.classList.toggle('list-group-item-success');
            for (const allStatus of arrayItem) {
                if(allStatus.id === obj.id) {
                    allStatus.done = !allStatus.done
                }
            }
            saveList(arrayItem, listName)
            return
        });


       deliteButton.addEventListener('click', function(){
            if(confirm('Вы уверенны?')){
               item.remove();
            }
            for (let i = 0; i < arrayItem.length; i++) {
                if(arrayItem[i].id === obj.id) {
                    arrayItem.splice(i, 1)
                }
            }
            saveList(arrayItem, listName)

        });

        //
        return {
            item,
            doneButton,
            deliteButton,

        };

    }

    function saveList(arr, keyName) {
        localStorage.setItem(keyName, JSON.stringify(arr))
    }

    function createTodoApp(container, title = 'Список дел', keyName) {

        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = createTodoList();

        listName = keyName;



        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);



        let localData = localStorage.getItem(listName)

        if(localData !== null && localData !=='') {
          arrayItem = JSON.parse(localData)
        }


        for (const itemList of arrayItem) {
            let todoItem = createTodoItem(itemList);
            todoList.append(todoItem.item);
        }

        todoItemForm.form.addEventListener('submit', function(e){
            e.preventDefault();

            if(!todoItemForm.input.value){
                return
            }


            let obj = {
                id:idForItem(arrayItem),
                name:todoItemForm.input.value,
                done:false
            }

            let todoItem = createTodoItem(obj);
            arrayItem.push(obj);

            saveList(arrayItem, listName)

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';

        })
    }
        window.createTodoApp = createTodoApp;

})();



