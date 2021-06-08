// See the first dish's details, including its name, image, description, and reviews, when the page loads
// Change the dish's description and still see that change when reloading the page
// Add a review for the dish (no persistence needed)

document.addEventListener("DOMContentLoaded", function(){
    const url = "http://localhost:3000/dishes"
    const descriptionForm = document.querySelector(".description")
    const reviews = document.querySelector(".reviews")
    const reviewForm = document.querySelector(".review-form")
    fetch(url) 
    .then(resp => resp.json())
    .then(data => {
        dishDetails(data[0])
    })
    function dishDetails(dish){
        const h2 = document.querySelector("h2")
        h2.innerText = dish.name

        const img = document.querySelector("img")
        img.src = dish.image_url

        descriptionForm.querySelector("textArea").innerText = dish.description
        
        reviews.innerHTML = ""

        dish.reviews.forEach(review => {
            const li = document.createElement("li")
            reviews.append(li)
            li.innerHTML = review
        })
    }
    const url2 = "http://localhost:3000/dishes/1"
    descriptionForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const updateText = descriptionForm.querySelector("textArea").value
        const configurationObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                description: updateText,
            })
        }
        fetch(url2, configurationObject)
    })
    reviewForm.addEventListener("submit", (event) => {
        event.preventDefault()
        const li = document.createElement("li")
        li.innerHTML = reviewForm.querySelector("textArea").value
        reviews.append(li)
        reviewForm.querySelector("textArea").value = ""
    })
    // send a patch
    // user makes changes to the description box
    // still be able to see the change when page reloads (prevent default)
    // event listener for description submit button
    // grab the value out of the text area 
    // send that change to the server 
})





//const reviewForm = document.querySelector(".review-form")