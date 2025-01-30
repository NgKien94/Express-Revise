module.exports = (query) =>{
    let keyword = query.keyword || "";
    let objectResult = {
        keyword: keyword
    }
    if(keyword){
        const Myregex = {$regex: new RegExp(keyword,"i")};
        objectResult.regex = Myregex;
    }

    return objectResult;
    
}   