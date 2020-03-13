document.addEventListener("DOMContentLoaded", () => {
    console.log('connected')
    

    fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(dogArray => dogArray.forEach(
            dogObj => createDogBarElem(dogObj)
            ))
    
})

/*
        helper functions
*/

function createDogBarElem(object) {
    let name = object.name
    let status = object.isGoodDog
    let imageUrl = object.image

    let dogBar = document.getElementById('dog-bar');
    let span = document.createElement('span')
        span.innerText = name

    dogBar.append(span)

    span.addEventListener("click", (event) => {
        event.preventDefault()        
        let dogDiv = document.getElementById('dog-info')
            dogDiv.innerText = ""
            dogDiv.dataset.id = object.id

        let dogImg = document.createElement('img')
            dogImg.src = imageUrl
        let dogName = document.createElement('h2')
            dogName.innerText = name
        let button = document.createElement('button')
            if (status) {
                button.innerText = 'Good Dog!'
            } else {
                button.innerText = "Bad Dog!"
            }

        dogDiv.append(dogImg, dogName, button)

        button.addEventListener("click", (event) => {

            if (status) {
                object.isGoodDog = false
                button.innerText = "Bad Dog!"
            } else {
                object.isGoodDog = true
                button.innerText = "Good Dog!"
            }

            fetch(`http://localhost:3000/pups/${event.target.parentElement.dataset.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(object)
            })

        })

    })

}