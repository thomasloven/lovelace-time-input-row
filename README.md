time-input-row
==============

Change the value of an  [`input_datetime`](https://www.home-assistant.io/components/input_datetime/) right on a lovelace card.

![time-input-row](https://user-images.githubusercontent.com/1299821/56157264-59b5f500-5fbf-11e9-8ed8-2afcca4a3341.png)


# Installation instructions

This row requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

The recommended type of this plugin is: `js`

### If you are using [custom\_updater](https://github.com/custom-components/custom_updater):
```yaml
resources:
- url: /customcards/github/thomasloven/card-tools.js
  type: js
- url: /customcards/github/thomasloven/time-input-row.js
  type: js
```

# Usage instructions

The code for the screenshot above:

`lovelace`
```yaml
title: time-input-row
cards:
  - type: entities
    title: Default
    entities:
      - input_datetime.time
      - input_datetime.date
      - input_datetime.datetime

  - type: entities
    title: Time-input-row
    entities:
      - entity: input_datetime.time
        type: custom:time-input-row
      - entity: input_datetime.date
        type: custom:time-input-row
      - entity: input_datetime.datetime
        type: custom:time-input-row
```

`configuration.yaml`
```yaml
input_datetime:
  time:
    name: Time
    has_date: false
    has_time: true
    initial: "12:34:00"
  date:
    name: Date
    has_date: true
    has_time: false
    initial: "2019-04-01"
  datetime:
    name: Date and Time
    has_date: true
    has_time: true
    initial: "2019-04-01 12:34:00"
```


---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
