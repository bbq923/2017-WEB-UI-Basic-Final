$(function() {
    var pageNavigation = new PageNavigation();

    pageNavigation.on("move", function(todos) {
        console.log(todos);
        var todos = {
            index: 0,
            max: 3
        }
        var url = "http://128.199.76.9:8002/bbq9234/todo/page?start=" + todos.index + "&limit=" + todos.max;
        console.log(url);
        $.ajax({
            method: "GET",
            url: url
        }).done(function(data, status) {
            console.log(data);
            var todoElements = $(TEMPLATE.template({
                "tasks": data
            }));
            todoList.children().remove();
            todoElements.appendTo(todoList);
        }).fail(function(jQueryXhr, status) {
            alert("failed to get tasks from server.");
        });
    })
});
