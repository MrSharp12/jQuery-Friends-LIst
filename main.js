$(document).ready(function(){

    $.ajax({
        url: 'http://rest.learncode.academy/api/1150/friends',
        type: 'GET'
    }).done( (data) => {
        data.forEach((eachFriend) => {
            let name = eachFriend.firstName + " " + eachFriend.lastName;
            let newElement = createFriend(name);
            $('#friend-list').append(newElement);
        })
    }).fail( () => {
        alert('AJAX call failed, unable to retrieve friends.');
    })

    $('#friend-form').submit( (e => {
        e.preventDefault();
        let newFriend = $('#input').val();
        //Split the name based on the first space we find
        let firstName = newFriend.substr(0, newFriend.indexOf(' '));
        let lastName = newFriend.substr(newFriend.indexOf(' ')+1);
        //construct the ajax request
        $.ajax({
            url: 'http://rest.learncode.academy/api/1150/friends',
            type: 'POST',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: `${firstName}@${lastName}.com`
            }
        }).done( (data) => {
            console.log(data);
        }).fail( () => {
            alert('AJAX call failed, unable to post new friend.');
        })
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