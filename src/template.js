var TEMPLATE = (function() {
    var source = $("#entry-template").html();
    Handlebars.registerPartial("task", $("#task-partial").html());
    var template = Handlebars.compile(source);

    return {
        template: template
    };
})();