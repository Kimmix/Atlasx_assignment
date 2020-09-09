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
  private _View: any;
  private _Graphic: any;

  constructor(private mapService: MapService) {}

  newPointMarker(position) {
    return {
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
  }

  openPopup(view) {
    view.on("click", (e) => {
      view.goTo({
        target: [e.mapPoint.longitude, e.mapPoint.latitude],
        zoom: 6,
      });
      this.mapService.setLocatePoint([
        e.mapPoint.longitude,
        e.mapPoint.latitude,
      ]);
      view.popup.open();
    });
  }

  async initializeMap() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [Map, MapView, Graphic, MapImageLayer] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/MapImageLayer",
      ]);

      // Configure the Map
      const mapProperties = {
        basemap: "hybrid",
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-109, 37],
        zoom: 4,
        map,
      };

      this._Graphic = Graphic;

      // Create map image layer
      const mapImageLayer = new MapImageLayer({
        url: "/api/arcgis/rest/services/Census/MapServer",
        outFields: ["*"],
        sublayers: [
          {
            id: 3,
            visible: true,
            popupTemplate: {
              title: "{STATE_NAME}",
              content: "Population 2007: {POP2007}<br />Area: {Shape_Area}",
            },
          },
        ],
      });

      // Add graphic layer to map
      map.add(mapImageLayer);

      this._View = new MapView(mapViewProperties);
      await this._View.when(); // wait for map to load
      this.openPopup(this._View);
      return this._View;
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
        if (this._View) {
          this._View.goTo({
            target: position,
            zoom: 7,
          });

          this.addGraphicToMap(this._View, this.newPointMarker(position));
        } else {
          console.log("Map not loaded");
        }
      });
  }

  ngOnDestroy() {
    if (this._View) {
      // destroy the map view
      this._View.container = null;
    }
  }
}
