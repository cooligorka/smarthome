'use strict';


function BasicDevice(name, place, device, state) {
    this._status = state ? 'enabled' : 'disabled';
    this._device = device;
    this._place = place;
    this._state = state;
    this._name = name;
};

BasicDevice.prototype = {
    on: function () {
        this._state = true;
        this._status = 'enabled';
    },

    off: function () {
        this._state = false;
        this._status = 'disabled';
    },

    getInfo: function () {
        if (this._state) {
            return this._device + " on " + this._place + " is " + this._status
        } else {
            throw new RangeError("device is disabled!")
        }
    }
};

function DeviceWithChangedValue(name, place, device, state) {
    BasicDevice.call(this, name, place, device, state);
    Options.call(this);
    this._changedValue = this._minValue;
};

DeviceWithChangedValue.prototype = Object.create(BasicDevice.prototype);

DeviceWithChangedValue.prototype.constructor = DeviceWithChangedValue;

DeviceWithChangedValue.prototype.validate = function () {
    return !!(this._state && this._changedValue >= this._minValue && this._changedValue <= this._maxValue);
};

DeviceWithChangedValue.prototype.evalSlider = function (event) {
    this._changedValue = event.value
};

DeviceWithChangedValue.prototype.setSliderValue = function (changedValue) {
    this._changedValue = changedValue;
    if (this.validate()) {
        this._changedValue = changedValue
    } else {
        throw new RangeError("Bad value!")
    }
};

DeviceWithChangedValue.prototype.increaseSliderValue = function () {
    if (this.validate()) return ++this._changedValue;
};

DeviceWithChangedValue.prototype.decreaseSliderValue = function () {
    if (this.validate()) return --this._changedValue;
};

DeviceWithChangedValue.prototype.getInfo = function () {
    return BasicDevice.prototype.getInfo.call(this) + ' ' + this._parametr + ' ' + this._changedValue;
};

function DeviceWithChangedMode(name, place, device, state, mode) {
    DeviceWithChangedValue.call(this, name, place, device, state);
    this._mode = this.mode[mode];
};

DeviceWithChangedMode.prototype = Object.create(DeviceWithChangedValue.prototype);
DeviceWithChangedMode.prototype.constructor = DeviceWithChangedMode;

DeviceWithChangedMode.prototype.changeMod = function (mode) {
    if (this._state && [mode] <= [this.mode].length) {
        this._mode = this.mode[mode];
    } else {
        throw new RangeError("Bad value!")
    }
};

DeviceWithChangedMode.prototype.getInfo = function () {
    return DeviceWithChangedValue.prototype.getInfo.call(this) + 'mode is ' + this._mode
};


var Options = function () {
    if (this._device === "fridge") {
        this._parametr = "temperature";
        this._minValue = -30;
        this._maxValue = 10;
    }
    if (this._device === "oven") {
        this._parametr = "temperature";
        this._minValue = 30;
        this._maxValue = 300;
        this.mode = ['min', 'middle', 'max'];
    }
    if (this._device === "TV") {
        this._parametr = "chanel";
        this._minValue = 0;
        this._maxValue = 900;
        this._mode = [1, 2, 3]
    }
};


var oven = new DeviceWithChangedMode('mydev', 'Kitchen', 'oven', false, 1);
oven.on();
var list = [];
list.push(oven);
































