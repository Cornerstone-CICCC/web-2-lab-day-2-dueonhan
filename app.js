$(function () {
  let currentUserId = 1;
  const maxUserId = 30;

  loadUserData(currentUserId);
  loadUserPosts(currentUserId);
  loadUserTodos(currentUserId);

  //user
  function loadUserData(userId) {
    $(document).ready(function () {
      $.ajax({
        url: `https://dummyjson.com/users/${userId}`,
        type: "GET",
        success: function (response) {
          console.log("response.users", response.users);
          buildUserList(response);
        },
        error: function (err) {
          console.error(err);
        },
      });
    });
  }

  function loadUserPosts(userId) {
    $(document).ready(function () {
      $.ajax({
        url: `https://dummyjson.com/users/${userId}/posts`,
        type: "GET",
        success: function (response) {
          console.log("posts", response.posts);
          buildPostList(response.posts);
        },
        error: function (err) {
          console.error(err);
        },
      });
    });
  }

  $(".posts ul").on("click", "a.post-link", function (e) {
    e.preventDefault();

    const post = {
      title: $(this).data("title"),
      body: $(this).data("body"),
      views: $(this).data("views"),
    };

    displayPostModal(post);
  });

  function loadUserTodos(userId) {
    $(document).ready(function () {
      $.ajax({
        url: `https://dummyjson.com/users/${userId}/todos`,
        type: "GET",
        success: function (response) {
          console.log("response", response);
          buildTodosList(response.todos);
        },
        error: function (err) {
          console.error(err);
        },
      });
    });
  }

  function buildUserList(arr) {
    let infoHtml = "";

    infoHtml = `
      <h2>${arr.firstName} ${arr.lastName}</h2>
      <p><span style="font-weight: bold;"> Age</span>: ${arr.age}</p>
      <p><span style="font-weight: bold;"> Email</span>: ${arr.email}</p>
      <p><span style="font-weight: bold;"> Phone</span>: ${arr.phone}</p>
    `;
    $(".info__image").find("img").attr("src", arr.image);
    $(".info__content").append(infoHtml);
    $(".posts").find("h3").append(`<h3>${arr.firstName}'S Posts</h3>`);
    $(".todos").find("h3").append(`<h3>${arr.firstName}'S To Dos</h3>`);
  }

  function buildPostList(arr) {
    let liHtml = "";
    if (!Array.isArray(arr)) {
      arr = [arr];
    }

    arr.forEach((el) => {
      liHtml += `
      <li>
        <a href="#" class="post-link" 
           data-title="${el.title}" 
           data-body="${el.body}" 
           data-views="${el.views || 0}">
          <span style="font-weight: bold; text-decoration: underline;">
            ${el.title}
          </span>
        </a>
        <p>${el.body}</p>
      </li>
    `;
    });

    $(".posts ul").append(liHtml);
  }

  function buildTodosList(arr) {
    let liHtml = "";

    arr.forEach((el) => {
      liHtml += `<li>${el.todo}</li>`;
    });

    $(".todos ul").append(liHtml);
  }

  $(".posts h3").on("click", function () {
    $(this).next("ul").toggle("slow");
  });

  $(".todos h3").on("click", function () {
    $(this).next("ul").toggle("slow");
  });

  function displayPostModal(post) {
    const button = $("<button>Close Modal</button>");
    button.on("click", function () {
      $(this).parent().hide();
    });

    $(".modal")
      .html(
        `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <p>Views: ${post.views}</p>
    `
      )
      .append(button)
      .fadeIn();
  }

  $("button:contains('Previous')").on("click", function () {
    currentUserId = currentUserId === 1 ? maxUserId : currentUserId - 1;
    clearContent();
    loadUserData(currentUserId);
    loadUserPosts(currentUserId);
    loadUserTodos(currentUserId);
  });

  $("button:contains('Next')").on("click", function () {
    currentUserId = currentUserId === maxUserId ? 1 : currentUserId + 1;
    clearContent();
    loadUserData(currentUserId);
    loadUserPosts(currentUserId);
    loadUserTodos(currentUserId);
  });

  function clearContent() {
    $(".info__content").empty();
    $(".info__image img").attr("src", "");
    $(".posts ul").empty();
    $(".posts h3").text("");
    $(".todos ul").empty();
    $(".todos h3").text("");
  }
});
