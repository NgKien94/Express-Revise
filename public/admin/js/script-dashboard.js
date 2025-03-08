// Logic close alert message

const showAlert = document.querySelector('[show-alert]')
if(showAlert) {
    const time = showAlert.getAttribute('data-time')
    parseInt(time)

    setTimeout( ()=>{
        showAlert.classList.add('alert-hidden')
    },time)

    const closeAlert  = showAlert.querySelector('[close-alert]')
    closeAlert.addEventListener('click',(e)=>{
        showAlert.classList.add('alert-hidden')
    })

}

//End logic close alert message