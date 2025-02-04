module.exports = (objectPagination,query) => {
    
   

    const totalPage = Math.ceil((objectPagination.totalProducts / objectPagination.limitItems));
    objectPagination.totalPage = totalPage;


    let currentPage = parseInt(query.page) || 1 ;
    if(currentPage >totalPage){
        currentPage = totalPage;
    }  
    else if(currentPage < 1){
        currentPage = 1
    }


    const startIndex = ((currentPage- 1) * 4) + 1;
    const skipItems = (currentPage - 1 ) * objectPagination.limitItems

    return {
        ...objectPagination,
        currentPage: currentPage,
        totalPage: totalPage,
        startIndex: startIndex,
        skipItems: skipItems
    }
}