export interface Department {
    id: number,
    name:string,
    description:string,
    is_active:boolean
}

export interface DepartmentForm {
    name:string,
    description:string,
    is_active:boolean
}