module.exports = (query)=>{

    let filterStatus = [
        {
            name: 'Tất cả',
            status: '',
            isQuery: ''
        },
        {
            name: 'Hoạt động',
            status: 'active',
            isQuery: ''
        }
        ,{
            name: 'Dừng Hoạt động',
            status: 'inactive',
            isQuery: ''
        }

    ]


    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status)
        filterStatus[index].isQuery = 'active'
 
    }
    else {
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].isQuery = 'active'
    }
    
    return filterStatus;
}