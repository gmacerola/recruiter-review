function getUserRepos(searchTerm) {
  let searchURL = "https://api.github.com/users/" + `${searchTerm}/repos`;
  console.log(searchURL);
  fetch(searchURL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayRepos(responseJson))
    .catch((err) => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
      $("#js-form").addClass("hidden");
      $("#restart").removeClass("hidden");
      restart();
    });
}

function displayRepos(responseJson) {
  console.log(responseJson);
  $("#results-list").empty();
  $("#js-form").addClass("hidden");
  let length = responseJson.length;
  $("#results").removeClass("hidden");
  console.log(responseJson[0].name);
  for (let i = 0; i < length; i++) {
    console.log("Really Testing");
    $("#results-list").append(
      `<li><h3>${responseJson[i].name}</h3>
        <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</p>
        </li>`
    );
  }
  restart();
}

function restart() {
  $("#restart").removeClass("hidden");
  $(".restart").click((event) => {
    $("#results-list").empty();
    $("#results").addClass("hidden");
    $("#js-form").removeClass("hidden");
    $("#restart").addClass("hidden");
    $("#js-error-message").text("");
  });
}

function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    const username = $("#js-search-term").val();
    getUserRepos(username);
  });
}

$(watchForm());
