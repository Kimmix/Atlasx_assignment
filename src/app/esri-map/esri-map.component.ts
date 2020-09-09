import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { loadModules } from "esri-loader";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MapService } from "../services/map.service";

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.css"],
})
export class EsriMapComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();
  // The <div> where we will place the map
  @ViewChild("mapViewNode", { static: true }) private mapViewEl: ElementRef;
  private view: any;
  private _Graphic: any;

  constructor(private mapService: MapService) {}

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, Graphic] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
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

      this._Graphic = Graphic;

      this.view = new MapView(mapViewProperties);
      await this.view.when(); // wait for map to load
      return this.view;
    } catch (error) {
      console.error("EsriLoader: ", error);
    }
  }

  addGraphicToMap(view, graphicJson) {
    // make sure that the graphic class has already been loaded
    if (!this._Graphic) {
      throw new Error("You must load a map before creating new graphics");
    }
    view.graphics.add(new this._Graphic(graphicJson));
  }

  ngOnInit() {
    this.initializeMap();
    this.mapService.location
      .pipe(takeUntil(this.destroy$))
      .subscribe((position) => {
        if (this.view) {
          this.view.goTo({
            target: position,
          });
          let pointGraphic = {
            geometry: {
              type: "point",
              longitude: position[0],
              latitude: position[1],
            },
            symbol: {
              type: "simple-marker",
              style: "square",
              color: [255, 0, 0, 0.5],
              size: 10,
              opacity: 0,
              outline: {
                color: [0, 0, 0, 0.6],
                width: 2,
              },
            },
          };
          this.addGraphicToMap(this.view, pointGraphic);
        } else {
          console.log("Map not loaded");
        }
      });
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
}
