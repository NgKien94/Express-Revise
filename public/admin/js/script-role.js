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


//Logic permissions
const btnSubmit = document.querySelector('[button-submit]');
const tablePermissions = document.querySelector('[table-permissions]');
const formChangePermissions = document.querySelector('#form-change-permissions')

if (tablePermissions) {
    const dataNames = tablePermissions.querySelectorAll('[data-name]');

    let dataPermissions = [];
    // handle Btn submit
    btnSubmit.addEventListener('click', (e) => {
        if (dataNames.length > 0) {
            // get all tr
            dataNames.forEach(dataName => {

                // get ids all permissions
                if (dataName.getAttribute("data-name") == "ids") {
                    const idInputs = dataName.querySelectorAll('input[type="text"]');
                    idInputs.forEach(idInput => {
                        const newItem = {
                            id: idInput.value,
                            permissions: []
                        }
                        dataPermissions.push(newItem)
                    })

                }
                // get all tr data-name attribute different ("ids")
                else {
                    const CheckBoxInputs = dataName.querySelectorAll('input[type="checkbox"]');
                    CheckBoxInputs.forEach((item, index) => {
                        if (item.checked) {
                             dataPermissions[index].permissions.push(dataName.getAttribute("data-name"))
                        }
                    })
                }


            })
        }
        formChangePermissions.querySelector('input[type="text"]').value = JSON.stringify(dataPermissions)
        formChangePermissions.submit(); // send data to server 
        /*
            data :[
                {
                    id: "abc"
                    permissions:
                     ["view","edit","create"]
                }
            ]
        */
    })

}

//End logic permissions


//Logic Show  current permissions
const dataRecords = JSON.parse(document.querySelector('[data-records]').getAttribute('data-records'));
if(dataRecords.length > 0){
    
    dataRecords.forEach((item,index) =>{
        const DataElements = tablePermissions.querySelectorAll('[data-name]:not([data-name="ids"])');

        DataElements.forEach(element =>{
            // each tr => current index Data is checked
            const currentDataName = element.getAttribute('data-name');
            if(item.permissions.includes(currentDataName)){
                element.querySelectorAll('input[type="checkbox"]')[index].checked = true
            }
        })

    })

}

//End logic show current permissions