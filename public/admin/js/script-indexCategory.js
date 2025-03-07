// Logic close alert message

const showAlert = document.querySelector('[show-alert]')
if(showAlert) {
    const time = showAlert.getAttribute('data-time')
    parseInt(time)
    console.log('Hiện thông báo ở đây')
    setTimeout( ()=>{
        showAlert.classList.add('alert-hidden')
        console.log('Ẩn thông báo ở đây')
    },time)

    const closeAlert  = showAlert.querySelector('[close-alert]')
    closeAlert.addEventListener('click',(e)=>{
        showAlert.classList.add('alert-hidden')
        console.log('Ẩn thông báo ở đây')
    })

}

//End logic close alert message
