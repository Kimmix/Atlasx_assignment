import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MapService {
  private _location = new BehaviorSubject<[number, number]>([-111, 33]);
  readonly location = this._location.asObservable();

  private _locatePoint = new BehaviorSubject<[number, number]>([-111, 33]);
  readonly locatePoint = this._locatePoint.asObservable();

  constructor() {}

  setLocation(location: [number, number]) {
    this._location.next(location);
    console.log("New location:", location);
  }

  setLocatePoint(location: [number, number]) {
    this._locatePoint.next(location);
    console.log("Update location:", location);
  }
}
