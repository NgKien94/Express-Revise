//Filter

const listButton = document.querySelectorAll('[button-status]')

if (listButton.length > 0) {
    listButton.forEach(item => {
        item.addEventListener('click', (e) => {
            let url = new URL(location.href)
            const status = e.target.getAttribute('button-status');
            const currentPage = url.searchParams.get('page');
            if (currentPage) {
                url.searchParams.delete('page'); // Khi click vào status thì xóa đi page cũ đi
            }

            if (status) {
                url.searchParams.set('status', status);

            } else {
                url.searchParams.delete('status');
            }

            location.href = url.href;
        })
    })
}

//End filter


//Search
const formSearch = document.querySelector('#form-search');

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let keyword = document.querySelector('[name="keyword"]').value.trim();


    let url = new URL(location.href);
    if (keyword) {
        url.searchParams.set('keyword', keyword);
    }
    else {
        url.searchParams.delete('keyword');
    }



    location.href = url.href;
})

//End Search


// Pagination
const listBtnPagination = document.querySelectorAll('[button-pagination]');
listBtnPagination.forEach((item) => {

    item.addEventListener('click', (e) => {
        let url = new URL(location.href);
        const destinationPage = item.getAttribute('button-pagination');



        url.searchParams.set('page', destinationPage);


        location.href = url.href;
    })
})
//End pagination

// Change status A product
const listButtonsStatus = document.querySelectorAll('[button-change-status]');
const formChangeStatusProduct = document.querySelector('#form-change-status-product');
if (listButtonsStatus.length > 0) {
    const actionBefore = formChangeStatusProduct.getAttribute('action')

    listButtonsStatus.forEach((button) => {
        button.addEventListener('click', (e) => {

            const idProduct = button.getAttribute('data-id')
            const statusProduct = button.getAttribute('data-status')
            const newAction = actionBefore + `${statusProduct}/` + `${idProduct}?_method=PATCH`

            formChangeStatusProduct.setAttribute('action', newAction)
            formChangeStatusProduct.submit();
        })
    })
}
// End change status a product


//Change status multiple product
// Logic checkboxes
const checkBoxAllProduct = document.querySelector('input[type="checkbox"][name="checkall"]');
const listCheckBoxProduct = document.querySelectorAll('input[type="checkbox"][name="id"]')

if (checkBoxAllProduct) {
    checkBoxAllProduct.addEventListener('click', (e) => {
        if (checkBoxAllProduct.checked == true) {
            listCheckBoxProduct.forEach((checkbox) => {
                checkbox.checked = true
            })
        }
        else {
            listCheckBoxProduct.forEach((checkbox) => {
                checkbox.checked = false
            })
        }
    })
}


if (listCheckBoxProduct.length > 0) {


    listCheckBoxProduct.forEach((checkbox) => {
        checkbox.addEventListener('click', (e) => {
            let countCheckboxChecked = document.querySelectorAll('input[type="checkbox"][name="id"]:checked').length;
            if (countCheckboxChecked == listCheckBoxProduct.length) {
                checkBoxAllProduct.checked = true
            }
            else {
                checkBoxAllProduct.checked = false
            }
        })
    })
}

//End logic checkboxes
const formChangeMulti = document.querySelector('[form-change-multi]');
formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectOptions = formChangeMulti.querySelector('[name="type"]')

    // sure selectOption ! default
    if (!selectOptions.value) {
        alert('Vui lòng chọn hành động áp dụng cho các sản phẩm')
    }
    else {
        const checkBoxesChecked = document.querySelectorAll('input[type="checkbox"][name="id"]:checked');

        // sure checkboxeschecked ! 0
        if (checkBoxesChecked) {
            let idsProductChecked = Array.from(checkBoxesChecked).reduce((acc, current) => {
                acc.push(current.value)
                return acc;
            }, [])

            const inputIDs = document.querySelector('input[name="ids"]');
            if (selectOptions.value == "change-position") {
                // id - position
                idsProductChecked = Array.from(checkBoxesChecked).reduce((acc, current) => {
                    const parentElement_inputChecked = current.closest("tr")
                    const currentID = current.value;
                    
                    const currentPosition = parentElement_inputChecked.querySelector('[name="position"]').value
                    
                    acc.push(`${currentID}-${currentPosition}`)

                    return acc
                }, [])
            }

            inputIDs.value = idsProductChecked.join(',')

            if (selectOptions.value == "delete-all") {
                let isConfirm = confirm('Bạn có chắn chắn xóa các sản phẩm này')
                if (!isConfirm) return;
            }
             formChangeMulti.submit();
        }
    }


})


//End change status multiple product


//Delete a product
const listButtonDelProduct = document.querySelectorAll('[button-delete]')
if (listButtonDelProduct.length > 0) {
    const formDelAProduct = document.querySelector('#form-delete-A-product')
    const currentAction = formDelAProduct.getAttribute('action');
    listButtonDelProduct.forEach((button) => {
        button.addEventListener('click', (e) => {
            let isDelete = confirm('Bạn có chắc chắn muốn xóa sản phẩm này ? ')
            if (isDelete == true) {
                const currentIdProduct = button.getAttribute('data-id')
                const newAction = currentAction + `${currentIdProduct}?_method=DELETE`

                formDelAProduct.action = newAction
                formDelAProduct.submit()
            }

        })
    })
}


//End delete  a product


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