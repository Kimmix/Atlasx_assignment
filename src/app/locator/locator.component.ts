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
  states;

  ngOnInit() {
    this.mapService.query
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        if (res) {
          this.states = res.features;
        }
      });
  }

  onClick(item) {
    this.mapService.setRings(item.value.geometry);
  }
}
