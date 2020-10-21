

function avatarFunction() {
    var avatar_info = document.getElementById("avatar-info");
    avatar_info.classList.toggle("avatar-info");
}
function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-ae15723787-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                console.log(response)
                return response;
            },
            error: function () {
                alert('error')
            }
        }
    );
}

$(async function () {

    var user = await loadUserInfo()
    console.log(user)
    document.getElementById("avatar-button").src = user.avatar ;
    $('#avatar-container #name').text(user.firstname + " " + user.lastname);
    $('#avatar-container #email').text(user.email );
    
        
    
});