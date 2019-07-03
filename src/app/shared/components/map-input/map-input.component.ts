import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map-input',
  templateUrl: './map-input.component.html',
  styleUrls: ['./map-input.component.scss']
})
export class MapInputComponent implements OnInit {

  // Default location: University of Information Technology
  @Input() lat = 10.8701157;
  @Input() lng = 106.8013646;

  @Input() zoom = 15;
  @Input() height = '300px';

  @Output() locationChanged = new EventEmitter();

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      if (!this.lat || !this.lng) {
        this.setCurrentLocation();
      }

      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement, {
          // types: ['address']
        }
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

  placeMarker(event: any) {
    this.changeLocation(event);
  }

  markerDragEnd(event: any) {
    this.changeLocation(event);
  }

  private changeLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChanged.emit({ lat: this.lat, lng: this.lng });
  }

}
