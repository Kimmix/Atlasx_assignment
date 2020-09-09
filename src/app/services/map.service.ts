import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MapService {
  private _location = new BehaviorSubject<[number, number]>([-111, 33]);
  readonly location = this._location.asObservable();

  constructor() {}

  setLocation(location: [number, number]) {
    this._location.next(location);
    console.log("New location:", location);
  }
}
