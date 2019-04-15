customElements.whenDefined('card-tools').then(() => {
let cardTools = customElements.get('card-tools');
class TimeInputRow extends cardTools.LitElement {

  static get properties() {
    return {
      stateObj: Object,
    };
  }

  render() {
    return cardTools.LitHtml`
    <hui-generic-entity-row
    .hass="${this._hass}"
    .config="${this._config}"
    >
      ${this.stateObj.attributes.has_date === true ?
        cardTools.LitHtml`
        <vaadin-date-picker
        id="date"
        @value-changed="${this.valueChanged}"
        value="${this.getDateString()}"
        @click="${(ev) => ev.stopPropagation()}"
        ></vaadin-date-picker>
        ` : ``}

      ${this.stateObj.attributes.has_time === true ?
      cardTools.LitHtml`
        <paper-time-input
        .hour="${this.getHour()}"
        .min="${this.getMinute()}"
        @change="${this.valueChanged}"
        @click="${(ev) => ev.stopPropagation()}"
        id="time"
        hide-label="true"
        format="24"
        ></paper-time-input>
      ` : ``}

    </hui-generic-entity-row>
    `
  }

  firstUpdated() {
    this.active = true;
  }

  setConfig(config) {
    this.active = false
    this._config = config;
  }

  getHour() {
    if(this.stateObj.state === "unknown")
      return "";
    return ("0" + this.stateObj.attributes.hour).slice(-2);
  }
  getMinute() {
    if(this.stateObj.state === "unknown")
      return "";
    return ("0" + this.stateObj.attributes.minute).slice(-2);
  }

  getDateString() {
    if(this.stateObj.state === "unknown")
      return "";
    return "" +
      this.stateObj.attributes.year +
      "-" +
      ("0" + this.stateObj.attributes.month).slice(-2) +
      "-" +
      ("0" + this.stateObj.attributes.day).slice(-2);
  }

  valueChanged(ev) {
    if(!this.active) return;
    let param = {
      entity_id: this._config.entity,
    };
    if(this.stateObj.attributes.has_time)
      param.time = this.shadowRoot.querySelector("#time").value.trim() + ":00";
    if(this.stateObj.attributes.has_date)
      param.date = this.shadowRoot.querySelector("#date").value;
    this._hass.callService('input_datetime', 'set_datetime', param);
  }

  set hass(hass) {
    this._hass = hass;
    this.stateObj = hass.states[this._config.entity];
  }
}

customElements.define('time-input-row', TimeInputRow);
});
window.setTimeout(() => {
  if(customElements.get('card-tools')) return;
  customElements.define('time-input-row', class extends HTMLElement{
    setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
  });
}, 2000);
