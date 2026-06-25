export interface iTasks{
    title: string | undefined
    description: string | undefined
    status: string
    projectId: string
    priority:string
    dueDate?:Date
}