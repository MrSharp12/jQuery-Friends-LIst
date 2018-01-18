//Runs when code loads
$(document).ready(function(){
//sends an ajax request to GET friends stored in the database
    $.ajax({
        url: 'http://rest.learncode.academy/api/1150/friends',
        type: 'GET'
    }).done( (data) => {
        data.forEach((eachFriend) => {
            let name = eachFriend.firstName + " " + eachFriend.lastName;//sets name
            let newElement = createFriend(name, eachFriend.id);//calls createFriend function with name/id number
            $('#friend-list').append(newElement);//prints to the DOM
        })
    }).fail( () => {
        alert('AJAX call failed, unable to retrieve friends.');
    })
//onclick function
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
            let newElement = createFriend(newFriend, data.id);//adds id number to typed input
            $('#friend-list').append(newElement);
            $('#input').val('');//clear the input field
        }).fail( () => {
            alert('AJAX call failed, unable to POST new friend.');
        })
        
    }));
//constructs an ajax request to DELETE friends from server
    $('#friend-list').on('click', 'li', function(e) {
        $.ajax({
            url: `http://rest.learncode.academy/api/1150/friends/${e.target.id}`,//adds target id 
            type: 'DELETE'
        }).done( () => {
            $(this).remove();
        }).fail( () => {
            alert('AJAX call failed, unable to DELETE friend.');
        })
    })
       

//creates <li> HTML and id for friend
//adds CSS
    function createFriend(name, id) {
        return $(`<li>${name}</li>`).addClass('list-group-item list-group-item-action list-group-item-dark').attr('id', id);    
    }


});