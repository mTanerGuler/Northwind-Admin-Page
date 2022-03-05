const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),
pField = form.querySelector(".password"), 
pInput = pField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); 
  (eInput.value == "") ? eField.classList.add("error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("error") : checkPass();

  function checkEmail(){ 

    if(eInput.value !=="andrewfuller")
    {
      eField.classList.add("error");

    }
  }

  function checkPass()
  {
    if(pInput.value!=="aistanbul")
    {
      pField.classList.add("error");
    }
  }

  
  if(eInput.value == "andrewfuller" && pInput.value == "aistanbul"){
    window.location.href = form.getAttribute("action"); 
  }
}