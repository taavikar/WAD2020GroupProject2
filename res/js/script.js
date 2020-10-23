
//========== Task 1

function avatarFunction() {
    // var avatar_info = document.getElementById("avatar-info");
    // avatar_info.classList.toggle("avatar-info");
    $("#avatar-info").toggleClass("avatar-info");
}
function loadUserInfo() {
    return $.get(
        {
            url: 'https://private-anon-ae15723787-wad20postit.apiary-mock.com/users/1',
            success: function (response) {
                // console.log(response)
                return response;
            },
            error: function () {
                alert('Could not load user info')
            }
        }
    );
}

$(async function () {
    var user = await loadUserInfo()
    // console.log(user)
    $('#avatar-button').attr('src', user.avatar);
    $('#avatar-container #name').text(user.firstname + " " + user.lastname);
    $('#avatar-container #email').text(user.email );
});

//========== Task 2

function loadPosts() {
    return $.get(
        {
            url: "https://private-anon-a8e9e0cdbf-wad20postit.apiary-mock.com/posts",
            success: response => response,
            error: () => alert("Could not load posts")
        }
    );
}

function addPost(post) {
    const avatarURL = post.author.avatar;
    const authorName = post.author.firstname + " " + post.author.lastname;
    const date = post.createTime;
    let media = "";
    if (post.media != null ) {
        media = (post.media.type === "image") ?
            '<img src="' + post.media.url + '" alt="">' :
            '<video controls><source src="' + post.media.url + '" type="video/mp4">Your browser does not support the video tag.</video>'
    }
    const postTitle = (post.text != null) ? post.text : "";
    const likes = post.likes;

    let postHTML = '<div class="post">' +
        '             <div class="post-author">' +
        '               <span class="post-author-info">' +
        '                 <img src="' + avatarURL + '" alt="Post author">' +
        '                 <small>' + authorName + '</small>' +
        '               </span>' +
        '               <small>' + date + '</small>' +
        '             </div>' +
        '             <div class="post-image">'
                        + media +
        '             </div>' +
        '             <div class="post-title">' +
        '               <h3>' + postTitle + '</h3>' +
        '             </div>' +
        '             <div class="post-actions">' +
        '               <button type="button" name="like" class="like-button">' + likes + '</button>' +
        '             </div>' +
        '           </div>';

    $(".main-container").append(postHTML);
}

$(async function () {
    const posts = await loadPosts();
    posts.forEach(addPost);
});