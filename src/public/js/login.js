const form = document.getElementById('loginForm')
const mensaje = document.getElementById('mensaje')

form.addEventListener('submit', e => {
    e.preventDefault()
    mensaje.innerText =  ""
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)
    const url = '/auth'

    const headers = {
        'Content-Type': 'application/json',
    }
    const method = 'POST'
    const body = JSON.stringify(obj)

    fetch(url, {
        headers,
        method,
        body
    })
        .then(response => response.json())
        .then(data => {
            if (data.status !== "error") {
                window.location.href = 'http://localhost:8080/products'
            }
            mensaje.innerText = data.error || "Sesion Iniciada!"
        })
        .catch(error => console.log(error))
})