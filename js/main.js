/// <reference types="../@types/jquery" />


$(document).ready(() => {



  $(".landing").fadeOut(1000)

})










let Width = $("#slidAnimate").outerWidth(true);
$(".side-Nav").animate({ left: `-${Width}px` }, 0)

function openn() {
  $("#close").removeClass("d-none")
  $("#open").addClass("d-none")

  if ($(".side-Nav").css('left') == "0px") {
    $(".side-Nav").animate({ left: `-${Width}px` }, 500)
    $(".links li").animate({ top: 5000 }, 500)
  }
  else {
    $(".side-Nav").animate({ left: "0px" }, 500)
    for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({ top: 0 }, (i + 5) * 100)
    }
  }


}

function cllose() {
  $("#open").removeClass("d-none")
  $("#close").addClass("d-none")
  $(".links li").animate({ top: 5000 }, 1500)

  if ($(".side-Nav").css('left') == "0px") {
    $(".side-Nav").animate({ left: `-${Width}px` }, 500)
  }
  else {
    $(".side-Nav").animate({ left: "0px" }, 500)

  }



}


$("#open").click(openn)

$("#close").click(cllose)




async function display() {
  $(".landing").fadeIn(800)


  let response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  response = await response.json()
  let meaals = response.meals
  console.log(meaals);
  displayMeals(meaals)
  $(".landing").fadeOut(600)

}

display()


function displayMeals(arr) {


  let temp = "";
  for (let i = 0; i < arr.length; i++) {
    temp += ` <div class="col-md-3  ">
    <div onclick="getMealDetails('${arr[i].idMeal}')"   class="meal  rounded-2  position-relative  overflow-hidden">
      <img src="${arr[i].strMealThumb}" class="w-100" alt="">
      <div id="meal-lay" class="meal-lay  d-flex align-items-center text-black p-2">
        <h2 class="">${arr[i].strMeal}</h2>

      </div>


    </div>

  </div>`
  }

  document.getElementById("MealRow").innerHTML = temp;






}







async function getCatego() {
  $(".landing").fadeIn(300)
  cllose()
  document.getElementById("MealRow").innerHTML = ""





  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  let mealsData = response.categories
  console.log(mealsData);
  displayCateog(mealsData)
  $(".landing").fadeOut(300)




}

function displayCateog(arr) {
  let Meals = ""
  for (let i = 0; i < arr.length; i++) {


    Meals += `  <div onclick="getCategoryDet('${arr[i].strCategory}')" class="col-md-3 mealscat position-relative overflow-hidden">
<div class="cat-img ">
  <img src="${arr[i].strCategoryThumb}" class="w-100" alt="">
</div>
<div class="laer-cat p-4  text-center text-black">
  <h3>${arr[i].strCategory}</h3>
  <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
</div>
</div>`



  }

  document.getElementById("MealRow").innerHTML = Meals;



}




async function getArea() {
  cllose()
  $(".landing").fadeIn(300)


  document.getElementById("MealRow").innerHTML = "";

  let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
  response = await response.json()
  let meals = response.meals
  console.log(meals);
  displayArea(meals)
  $(".landing").fadeOut(300)


}

function displayArea(area) {
  let temp = '';
  for (let i = 0; i < area.length; i++) {
    temp += ` 
      <div  class="col-md-3">
    <div onclick="getAreaMeals('${area[i].strArea}')" class="coont text-center">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3 class="mt-2">${area[i].strArea}</h3>
    </div>
  </div>
      `

  }
  document.getElementById("MealRow").innerHTML = temp;

}



async function getIngred() {
  $(".landing").fadeIn(300)
  cllose()
  document.getElementById("MealRow").innerHTML = '';




  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json()
  let Ingred = response.meals
  console.log(Ingred);
  displayIngred(Ingred.slice(0, 20))
  $(".landing").fadeOut(300)


}

function displayIngred(arr) {
  let temp = ''
  for (let i = 0; i < arr.length; i++) {
    temp += `<div class="col-md-3">
     <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="connt text-center">
       <i class="fa-solid fa-drumstick-bite fa-4x"></i>
      <h3 class="mt-2">${arr[i].strIngredient}</h3>
      <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
   </div>`

  }
  document.getElementById("MealRow").innerHTML = temp;

}


async function getCategoryDet(cat) {
  $(".landing").fadeIn(300)
  document.getElementById("MealRow").innerHTML = '';



  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  response = await response.json()


  displayMeals(response.meals.slice(0, 20))
  $(".landing").fadeOut(300)
}



async function getAreaMeals(area) {
  $(".landing").fadeIn(300)
  document.getElementById("MealRow").innerHTML = '';



  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()


  displayMeals(response.meals.slice(0, 20))
  $(".landing").fadeOut(300)
}


async function getIngredientsMeals(ingredients) {
  $(".landing").fadeIn(300)

  document.getElementById("MealRow").innerHTML = "";


  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()


  displayMeals(response.meals.slice(0, 20))
  $(".landing").fadeOut(300)
}




async function getMealDetails(ID) {
  $(".landing").fadeIn(200)


  document.getElementById("MealRow").innerHTML = '';
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
  response = await response.json()
  let detail = response.meals[0]
  console.log(detail);

  displayDetails(detail)
  $(".landing").fadeOut(300)

}

function displayDetails(mealDetails) {
  document.getElementById("MealRow").innerHTML = '';



  let ingredients = ``

  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]}</li>`
    }
  }
  let tags = mealDetails.strTags?.split(",")

  if (!tags) {
    tags = [];
  }



  let tagsStr = ''
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
  }






  let temp = `    <div class="col-md-4 col-sm-6">
        <div class="cont-img">
          <img src="${mealDetails.strMealThumb}" class="w-100 rounded-2" alt="">
          <h3 class="my-2">${mealDetails.strMeal}</h3>
        </div>
      </div>
      <div class="col-md-8">
        <div  class="cont ">
          <i id="cont" onclick ="display()" class="fa-solid fa-xmark fa-2x  position-relative "></i>
          <h2>Instructions :</h2>
          <p>${mealDetails.strInstructions}</p>
          <h3>Area : <span>${mealDetails.strArea}</span></h3>
          <h3><span class="fw-bolder">Category : </span>${mealDetails.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap ">
          ${ingredients}
          </ul>
          <h3 class="py-3">Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
          ${tagsStr}
      </ul>

          <a target="_blank" href="${mealDetails.strSource}"
            class="btn btn-success">Source</a>
          <a target="_blank" href="${mealDetails.strYoutube}" class="btn btn-danger">Youtube</a>

        </div>
      </div>`

  document.getElementById("MealRow").innerHTML = temp;


}



function search() {
  cllose()
  $(".landing").fadeIn(300)


  let temp = `<div id="searchInppput" class="row py-5">
      <div class="col-md-6">
  <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
</div>
<div class="col-md-6">
  <input onkeyup="searchByFLetter(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
</div>
  </div>`

  document.getElementById("SearchCont").innerHTML = temp;
  document.getElementById("MealRow").innerHTML = ''
  $(".landing").fadeOut(300)


}

async function searchByName(el) {
  $(".landing").fadeIn(200)
  document.getElementById("MealRow").innerHTML = ''



  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${el}`)
  response = await response.json()

  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }

  $(".landing").fadeOut(300)
}

async function searchByFLetter(ell) {
  $(".landing").fadeIn(100)
  document.getElementById("MealRow").innerHTML = ''




  ell == "" ? ell = "a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${ell}`)
  response = await response.json()

  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
  $(".landing").fadeOut(100)
}




function contact() {

  cllose()
  document.getElementById("MealRow").innerHTML = "";

  let tempo = `<div class="container">
  <div class="row py-5 g-4 " id="rowData"><div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
<div class="row g-4">
  <div class="col-md-6">
      <input id="InputName" onkeyup="inputsValidation()"  type="text" class="form-control" placeholder="Enter Your Name">
      <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
          Special characters and numbers not allowed
      </div>
  </div>
  <div class="col-md-6">
      <input id="InputEmail" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
      <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
          Email not valid *example123@example.com
      </div>
  </div>
  <div class="col-md-6">
      <input id="InputPhone" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
      <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid Phone Number
      </div>
  </div>
  <div class="col-md-6">
      <input id="InputAge" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
      <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid age
      </div>
  </div>
  <div class="col-md-6">
      <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
      <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid password *Minimum eight characters, at least one letter and one number:*
      </div>
  </div>
  <div class="col-md-6">
      <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
      <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
          Enter valid repassword 
      </div>
  </div>
</div>
<button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div> </div>
</div>`


  document.getElementById("MealRow").innerHTML = tempo;


  submitBtn = document.getElementById("submitBtn")


  document.getElementById("InputName").addEventListener("focus", () => {
    InputNameTouched = true
  })

  document.getElementById("InputEmail").addEventListener("focus", () => {
    InputEmailTouched = true
  })

  document.getElementById("InputPhone").addEventListener("focus", () => {
    InputPhoneTouched = true
  })

  document.getElementById("InputAge").addEventListener("focus", () => {
    InputAgeTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
  })


}





let InputNameTouched = false;
let InputEmailTouched = false;
let InputPhoneTouched = false;
let InputAgeTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
  if (InputNameTouched) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none")

    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block")

    }
  }
  if (InputEmailTouched) {

    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block")

    }
  }

  if (InputPhoneTouched) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

    }
  }

  if (InputAgeTouched) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block")

    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
    } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

    }
  }


  if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  } else {
    submitBtn.setAttribute("disabled", true)
  }
}

function nameValidation() {
  return (/^[a-zA-Z ]+$/.test(document.getElementById("InputName").value))
}

function emailValidation() {
  return (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(document.getElementById("InputEmail").value))
}

function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("InputPhone").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("InputAge").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
  return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}