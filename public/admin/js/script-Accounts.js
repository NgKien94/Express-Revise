// Logic close alert message

const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
    const time = showAlert.getAttribute('data-time')
    parseInt(time)

    setTimeout(() => {
        showAlert.classList.add('alert-hidden')
    }, time)

    const closeAlert = showAlert.querySelector('[close-alert]')
    closeAlert.addEventListener('click', (e) => {
        showAlert.classList.add('alert-hidden')
    })

}

//End logic close alert message


//Preview Image upload file
const formEditProduct = document.querySelector('#form-accounts')
if(formEditProduct){

    const inputPreview = formEditProduct.querySelector('[upload-image-input')
    const imagePreview = formEditProduct.querySelector('[upload-image-preview]')

    inputPreview.addEventListener('change',(e)=>{
        if(e.target.files.length){
            const newSrc = URL.createObjectURL(e.target.files[0])
            imagePreview.setAttribute('src',newSrc)
        }
    })
 
}

//End preview image upload file

