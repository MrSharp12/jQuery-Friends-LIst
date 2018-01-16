$(document).ready(function(){
    $('#friend-form').submit( (e => {
        e.preventDefault();
        let newFriend = $('#input').val();
        let newElement = createFriend(newFriend);
        $('#friend-list').append(newElement);
        $('#input').val('');
    }));

    $('#friend-list').on('click', 'li', function(e) {
        $(this).remove();
    })

    function createFriend(name) {
        return $(`<li>${name}</li>`).addClass('list-group-item list-group-item-action list-group-item-dark');
    }


});