// LOAD TODO
$(document).ready(function() {
    loadToDo();

// new TODO
$("#newBtn").on("click", function() {
    console.log('hello')
    const todoText = prompt("Enter your TO DO:").trim();
    if (todoText) {
        addToDo(todoText);
        saveToDo();
    }
});

// To do to DOM
function addToDo(text) {
    const $toDoDiv = $("<div>").text(text).on("click", function() {
        deleteToDo($(this));
    });
    const $list = $("#ft_list");

    /// add to the top of the list
    if ($list.children().length > 0) {
        $list.prepend($toDoDiv);
    } else {
        $list.append($toDoDiv);
    }

}

// remove todo
function deleteToDo($toDoDiv) {
    if (confirm("Do you really want to delete this TO DO?")) {
        $toDoDiv.remove();
        saveToDo();
    }
}

// ฟังก์ชันบันทึก To-Do List ลงคุกกี้
function saveToDo() {
    const toDoArray = [];
    $("#ft_list div").each(function() {
        toDoArray.push($(this).text());
    });
    document.cookie = "todo=" + encodeURIComponent(JSON.stringify(toDoArray)) 
            + ";max-age=" + (7 + 24 + 60 + 60)  + ";path=/";
}

// ฟังก์ชันโหลด To-Do จากคุกกี้
function loadToDo() {
    const cookie = document.cookie.split("; ").find(row => row.startsWith("todo="));
    console.log("find cookie")
    if (cookie) {
        console.log("got cookie")
        console.log(decodeURIComponent(cookie.split("=")[1]))
        const toDoArray = JSON.parse(decodeURIComponent(cookie.split("=")[1]));

        toDoArray.reverse().forEach(item => addToDo(item));
    }
}
});