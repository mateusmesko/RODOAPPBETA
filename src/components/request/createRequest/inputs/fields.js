export function statusNewRequest(field, returnRequest){
    const newRequestFields = statusDefine =>{
        const listStatus = returnRequest
        return listStatus[statusDefine]
    }
    return newRequestFields(field)
}
