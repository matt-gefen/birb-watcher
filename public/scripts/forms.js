
const newSighting = document.querySelector("#add-sighting-container")
const showNewSighting = document.querySelector('#show-form')

function hideForm() {
  if (newSighting.hidden) {
    setTimeout(() => {newSighting.hidden = false}, 0)
    showNewSighting.innerText = '▼'
  } else {
    setTimeout(() => {newSighting.hidden = true}, 0)
    showNewSighting.innerText = '▶'
  }
} 


showNewSighting.addEventListener('click', hideForm)