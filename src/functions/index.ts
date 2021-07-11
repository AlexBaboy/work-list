import {IChangedParamsRequest} from "../interfaces/IChangedParamsRequest";

export const getChangedUrlParams = (name: string | undefined, type:string | undefined, currentPage: number = 1) => {

    const  url = getChangedUrl(name, type, currentPage)

    const changedParamsRequest: IChangedParamsRequest = {
        sortFieldName: name,
        sortDirection: type,
        currentPage: currentPage,
        url: url
    }
    return changedParamsRequest
}

export const getChangedUrl = (name: string | undefined, type:string | undefined, currentPage: number = 1) => {

    let url = ''
    if(name && type)
        url = `&sort_field=${name}&sort_direction=${type}`

    url += `&page=${currentPage}`

    return url
}

export const getStatusNameByCode = (code:number) => {
    switch(code) {
        case 0:
            return 'не выполнена'
        case 1:
            return 'не выполнена, отредактирована админом'
        case 10:
            return 'выполнена'
        case 11:
            return 'отредактирована админом и выполнена'
    }
}