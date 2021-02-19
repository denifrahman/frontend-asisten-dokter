import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class ErrorService {
    private errors = new Subject<string[]>();

    constructor() { }

    public addErrors(errors: string[]) {
        console.log(errors);
    }
    public getErrors = () =>
        this.errors.asObservable();
}