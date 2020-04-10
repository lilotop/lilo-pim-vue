export class ItemNotFoundException implements Error {
    constructor(context: string, itemName: string) {
        this.name = 'ItemNotFoundException';
        this.message = `The item '${itemName}' was not found in the context '${context}'`;
    }

    message: string;
    name: string;
}

export class ReadonlyException implements Error {
    constructor(context: string, itemName: string) {
        this.name = 'ReadonlyException';
        this.message = `The item '${itemName}' in the context '${context}' is readonly and cannot be modified or deleted`;
    }

    message: string;
    name: string;
}
