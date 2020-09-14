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

  private _rings = new BehaviorSubject<any>(null);
  readonly rings = this._rings.asObservable();

  private _query = new BehaviorSubject<any>(null);
  readonly query = this._query.asObservable();

  constructor() {}

  setLocation(location: [number, number]) {
    this._location.next(location);
    console.log("New location:", location);
  }

  setLocatePoint(location: [number, number]) {
    this._locatePoint.next(location);
    console.log("Update location:", location);
  }

  setRings(geometry) {
    this._rings.next(geometry);
  }

  setQuery(res) {
    this._query.next(res);
    console.log("Query:", res);
  }
}
