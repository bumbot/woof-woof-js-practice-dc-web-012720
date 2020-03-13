document.addEventListener("DOMContentLoaded", () => {
    console.log('connected')
    

    fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(dogArray => dogArray.forEach(
            dogObj => createDogBarElem(dogObj)
            ))
    
})


function createDogBarElem(object) {
    let name = object.name
    let status = object.isGoodDog
    let imageUrl = object.image
    object.dataset.id = object.id

    let dogBar = document.getElementById('dog-bar');
    let span = document.createElement('span')
        span.innerText = name

    dogBar.append(span)

    span.addEventListener("click", (event) => {
        event.preventDefault()        
        let dogDiv = document.getElementById('dog-info')
            dogDiv.innerText = ""

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
            event.

            if (status) {
                button.innerText = "Bad Dog!"
            } else {
                button.innerText = "Good Dog!"
            }
            debugger

            fetch(`http://localhost:3000/pups/${}`, {
                method: "PATCH",
                header: {"Content-Type": "application/json"},
            body: {isGoodDog: /*we will add something soon */}
            })

            

        })

    })

}