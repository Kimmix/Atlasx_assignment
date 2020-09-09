import { Component, OnInit } from "@angular/core";
import { MapService } from "../services/map.service";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-locator",
  templateUrl: "./locator.component.html",
  styleUrls: ["./locator.component.css"],
})
export class LocatorComponent implements OnInit {
  private readonly destroy$ = new Subject();
  constructor(private mapService: MapService) {}
  point = { longitude: -109.0889, latitude: 37.0243 };
  basemapType = "hybrid";
  mapZoomLevel = 5;

  ngOnInit() {
    console.log("CustomPoint", this.point);
    this.mapService.locatePoint
      .pipe(takeUntil(this.destroy$))
      .subscribe((pos) => {
        console.log(pos);
        this.point.longitude = pos[0];
        this.point.latitude = pos[1];
      });
  }

  onClick() {
    this.mapService.setLocation([this.point.longitude, this.point.latitude]);
    // this.mapCenter = [this.point.latitude, this.point.longitude];
  }

  // See app.component.html
  mapLoadedEvent(status: boolean) {
    console.log("The map loaded: " + status);
  }
}
