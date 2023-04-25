const form = document.getElementById("signupForm")

form.addEventListener('submit',e =>{
    e.preventDefault()
    const data = new FormData(form)
    const obj= {}
    data.forEach((value,key)=> obj[key]= value)
    const url= '/users'
})