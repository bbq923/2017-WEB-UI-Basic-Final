$( function() {
    var pageNavigation = new PageNavigation();
    var todoList = $( ".todo-list" );

    pageNavigation.on( "move", function( todos ) {
        var url = "http://128.199.76.9:8002/bbq9234/todo/page?start=" + todos[ 2 ] + "&limit=" + todos[ 3 ];
        console.log( url );
        $.ajax( {
            method: "GET",
            url: url
        } ).done( function( data, status ) {
            console.log( data );
            var todoElements = $( TEMPLATE.template( {
                "tasks": data
            } ) );
            todoList.children().remove();
            todoElements.appendTo( todoList );
        } ).fail( function( jQueryXhr, status ) {
            alert( "failed to get tasks from server." );
        } );
    } );
} );
