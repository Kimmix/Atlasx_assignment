import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { loadModules } from "esri-loader";

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.css"],
})
export class EsriMapComponent implements OnInit, OnDestroy {
  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  view: any;

  constructor() {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
      ]);

      // Configure the Map
      const mapProperties = {
        basemap: "streets-vector",
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [0.1278, 51.5074],
        zoom: 10,
        map: map,
      };

      this.view = new MapView(mapViewProperties);
      await this.view.when(); // wait for map to load
      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
}
