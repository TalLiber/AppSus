export default {
    name: 'note-map',
    props: ['info', 'isDetails'],
    template: `
        <section ref="gmap" class="map" style="width:100%;height:400px;">{{ Map }}</section>
        <input type="text" placeholder="search" ref="search" />
        `,
    created() {},
    data() {
        return {
            map: {}
        }
    },
    methods: {
        initMap(lat = 32.0845323, lng = 34.8130474) {
            var elMap = this.$refs.gmap
            var options = {
                center: {
                    lat,
                    lng
                },
                zoom: 15
            }

            this.map = new google.maps.Map(
                elMap,
                options
            )
            if (!this.isDetails) this.map.setOptions({ gestureHandling: "none", keyboardShortcuts: false });
            // google.maps.event.addListener(this.map, 'click', (event) => onMapClick(gMap, event.latLng))
            var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(-33.8902, 151.1759),
                new google.maps.LatLng(-33.8474, 151.2631)
            )

            var elSearch = this.$refs.search
                // const searchBox = new google.maps.places.SearchBox(elSearch);
            var searchBox = new google.maps.places.SearchBox(elSearch, {
                bounds: defaultBounds
            })
            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(elSearch)

            let markers = []
            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }
                markers.forEach((marker) => {
                    marker.setMap(null);
                })
                markers = []
                const bounds = new google.maps.LatLngBounds();
                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    const icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25),
                    }

                    markers.push(
                        new google.maps.Marker({
                            map: this.map,
                            icon,
                            title: place.name,
                            position: place.geometry.location,
                        })
                    )

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                this.map.fitBounds(bounds)
                    // bounds.union(places.geometry.viewport);
                    // this.map.fitBounds(bounds);
                console.log(places);
            })

            //   let markers = google.maps.Marker
        }
    },
    computed: {},
    components: {},
    mounted() {
        this.initMap()
    }
}