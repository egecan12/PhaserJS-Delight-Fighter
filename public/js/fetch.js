fetch("/scores", {
  method: "get",
})
  .then(function (response) {
    response
      .json()
      .then((result) => {
        result.map((item) => {
          console.log(item);

          document.getElementById(
            "topScorers"
          ).innerHTML += `<p>${item.firstName} ${item.score} </p>`;
        });
      })
      .catch((err) => {
        console.err(err);
      });
  })
  .catch(function (err) {
    console.log("error");
  });
