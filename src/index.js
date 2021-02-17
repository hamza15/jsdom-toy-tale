let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json()
  }) 
  .then(function(objects) {
    objects.forEach(addToys)
  })
});

function addToys(toy) {
  let toysCollection = document.getElementById("toy-collection")
  let toysDiv = document.createElement("div")
  toysDiv.setAttribute("class", "card")
  let header = document.createElement("h2")
  let image = document.createElement("img")
  image.setAttribute("class", "toy-avatar")
  let para = document.createElement("p")
  let button = document.createElement("button")
  button.setAttribute("class", "like-btn")
  button.setAttribute('id', toy.id)
  button.innerText = "like"
  header.innerText = toy.name
  image.src = toy.image
  para.innerText = toy.likes
  button.innerText = "Like"
  
  toysDiv.appendChild(header)
  toysDiv.appendChild(image)
  toysDiv.appendChild(para)
  toysDiv.appendChild(button)
  toysCollection.appendChild(toysDiv)
}

let submit = document.getElementById("new-toy-submit")
submit.addEventListener("click", function(event) {
  event.preventDefault();  
  let name = document.getElementsByClassName("input-text").name.value
  let image = document.getElementsByClassName("input-text").image.value
  createNewToy(name, image)})

  let buttons = document.getElementsByClassName("like-btn")

  buttons.forEach(addEventListener("click", function(e){
      console.log(e.target.dataset);
      likes(e)
    }))
  
  function likes(e) {
    e.preventDefault()
    let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
  
        },
        body: JSON.stringify({
          "likes": more
        })
      })
      .then(res => res.json())
      .then((like_obj => {
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  }