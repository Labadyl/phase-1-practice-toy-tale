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
  getToys()
  handleNewForm()
});

const handleNewForm = ()=>{
  const toyFrom = document.querySelector('.add-toy-form')
  toyFrom.addEventListener('submit',(e)=>{
    e.preventDefault()
    const toyFromName = e.target.name.value
    const toyFromInage = e.target.image.value
    const newToyObj = {
      name: toyFromName,
      image: toyFromInage,
      likes: 0,      
    }
    renderAToy(newToyObj)
  })

}


const getToys = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => renderAToy(toy))
  })
}

// renders
const renderAToy = (toy) => {
  const toyCard = document.createElement('div')
  toyCard.className ="card"

const toyName = document.createElement('h2')
  toyName.innerText = toy.name

const toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className ="toy-avatar"

const toyLikes = document.createElement('p')
  toyLikes.innerText = `${toy.likes} Likes`

const likeBtn = document.createElement('button')
  likeBtn.innerText =`Like`
  likeBtn.className ='like-btn'
  likeBtn.id =toy.id

likeBtn.addEventListener('click',(e) => {
  const currentLikestext = e.target.previousSibling.innerText
  const numberLikes = currentLikestext.split(" ")[0]

  e.target.previousSibling.innerText = `${parseInt(numberLikes) + 1} Likes`
})

  toyCard.append(toyName,toyImage,toyLikes,likeBtn)


const toyCollection = document.querySelector('#toy-collection')
  toyCollection.append(toyCard)
}