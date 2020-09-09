import { Component, OnInit } from "@angular/core";
import { MapService } from "../services/map.service";

@Component({
  selector: "app-locator",
  templateUrl: "./locator.component.html",
  styleUrls: ["./locator.component.css"],
})
export class LocatorComponent implements OnInit {
  constructor(private mapService: MapService) {}
  point = { latitude: -109.0889, longitude: 37.0243 };
  basemapType = "hybrid";
  mapZoomLevel = 5;

  ngOnInit() {
    console.log("CustomPoint", this.point);
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
