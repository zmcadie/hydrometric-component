# hydrometric-component
Display the latest primary water level for any hydrometric station in Canada, leverages the [hydrometric-function repo](https://github.com/zmcadie/hydrometric-function)

```html
<div
  id="container"
  data-stationid="08HA009"
  data-stationname="Lake Cowichan"
  data-timezone="pst"
  data-sealevel="160.944"
  data-gaugemax="4"
  data-gaugescale="4"
  data-gaugeheight="208"
></div>
<script defer src="https://unpkg.com/hydrometric-component/index.js"></script>
```

### Parameters
```
data-stationid
```
The ID of any hydrometric station with real-time data available on https://wateroffice.ec.gc.ca
```
data-stationname
```
The name of the sation to be displayed by the widget. This can be whatever you like.

```
data-timezone
```
The local standard timezone the station specified is located in. Environment Canada doesn't adjust for DST and neither do we!
Canada has six standard timezones, the three letter abbreviations of which are all valid values:
- PST (Pacific Standard Time)
- MST (Mountain Standard Time)
- CST (Central Standard Time)
- EST (Eastern Standard Time)
- AST (Atlantic Standard Time)
- NST (Newfoundland Standard Time)
```
data-sealevel
```
The relative height to sea level in meters of the water level baseline. This can be found in the station info on https://wateroffice.ec.gc.ca
```
data-gaugemax
```
The maximum level the widget will display in number of meters.
```
data-gaugescale
```
The scale the widget will display water gauge markers for. For example: `data-gaugescale="4"` will display a water gauge with markers displayed denoting every quarter meter
```
data-gaugeheight
```
The height in pixels of the gauge component within the widget. This number needs to be a multiple of `data-gaugemax * data-gaugescale` so that gauge scale markers and the gauge level display correctly
