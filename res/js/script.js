
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

$(async function () {
    // Load posts from PostIt API
    const posts = await loadPosts();
    // Add a div.post element to html for each post (type JSON object)
    posts.forEach(addPost);
    // Add listener for each like button. (didn't find a good JQuery way for this tough)
    let temp = document.getElementsByClassName("like-button");
    for (let i = 0; i < temp.length; i++) {
        temp[i].addEventListener("click", function () {
            this.classList.toggle("liked");
        });
    }
});

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

    // Data for post

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

    // Filling the div elements

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
        '               <button type="button" id="like-button' + post.id + '" ' +
        '                                                                name="like" class="like-button">'
                          + likes +
        '               </button>' +
        '             </div>' +
        '           </div>';

    $(".main-container").append(postHTML);
}