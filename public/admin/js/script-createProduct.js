//Preview Image upload file
const formCreateProduct = document.querySelector('#form-create-product')
if(formCreateProduct){

    const inputPreview = formCreateProduct.querySelector('[preview-input-image]')
    const imagePreview = formCreateProduct.querySelector('[preview-image]')

    inputPreview.addEventListener('change',(e)=>{
        if(e.target.files.length){
            const newSrc = URL.createObjectURL(e.target.files[0])
            imagePreview.setAttribute('src',newSrc)
        }
    })
 
}

//End preview image upload file