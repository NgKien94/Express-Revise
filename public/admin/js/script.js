//Filter

const listButton = document.querySelectorAll('[button-status]')

if (listButton.length > 0) {
    listButton.forEach(item => {
        item.addEventListener('click', (e) => {
            let url = new URL(location.href)
            const status = e.target.getAttribute('button-status');
            const currentPage = url.searchParams.get('page');
            if(currentPage){
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