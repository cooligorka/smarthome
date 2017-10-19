'use strict';
function Device(name, place) {
    this._name = name;
    this._place = place;
    this._state = 0;
}

Device.prototype.showInfo = function () {
    alert(this._name + ' in the ' + this._place + ' ' + this.getState());
};

Device.prototype.getState = function () {
    if (this._state !== true) {
        return ' is Off!';
    } else {
        return ' is ON!';
    }
};
    
Device.prototype.on = function () {
    this._state = true;
};

Device.prototype.off = function () {
    this._state = false;
};

var lamp = new Device('lamp', 'Living Room');

function DeviceWithRangedParam(name, place, minValue, maxValue, nameOfParam, rangedParam) {
    this._minValue = minValue;
    this._maxValue = maxValue;
    if (rangedParam === undefined) rangedParam = 0;
    this._rangedParam = rangedParam;
    this._nameOfParam = nameOfParam;
    Device.call(this, name, place);
}
DeviceWithRangedParam.prototype = Object.create(Device.prototype);

DeviceWithRangedParam.prototype.constructor = DeviceWithRangedParam;

DeviceWithRangedParam.prototype.checkParameters = function () {
    if(this._state === true && this._rangedParam >= this._minValue && this._rangedParam <= this._maxValue) {
        return true;
    } else { return false;}
};

DeviceWithRangedParam.prototype.showRangedParam = function () {
    if (this.checkParameters()) {
        alert('The ' + this._nameOfParam + ' ' + this._rangedParam + '.');
    } else {alert('Device is OFF! Cant show the ' + this._nameOfParam + '!')}
};

DeviceWithRangedParam.prototype.setRangedParam = function (rangedParam) {
        if (this.checkParameters()) {
            this._rangedParam = rangedParam;
            return this._rangedParam;
        } else { alert('Device is Off, cant set the value, or the value is out of range!')}
};

DeviceWithRangedParam.prototype.increaseRangedParam = function () {
    if(this._state === true && this._rangedParam > this._minValue && this._rangedParam < this._maxValue) return ++this._rangedParam;
};

DeviceWithRangedParam.prototype.decreaseRangedParam = function () {
    if(this._state === true && this._rangedParam > this._minValue && this._rangedParam < this._maxValue) return --this._rangedParam;
};

DeviceWithRangedParam.prototype.showInfo = function () {
    if (this._state === true) {
        alert(this._name + ' in the ' + this._place + ' is On! And the '+ this._nameOfParam  + ' is ' + this._rangedParam + '.');
    } else { alert(this._name + ' in the ' + this._place + ' is OFF!')}
};

var conditioner = new DeviceWithRangedParam('Conditioner', 'Kitchen', -30, 30, 'temperature');

console.dir(conditioner);
conditioner.on();
console.log(conditioner.getState());
conditioner.showInfo();
conditioner.increaseRangedParam();
conditioner.showInfo();
conditioner.off();
conditioner.showInfo();
conditioner.showRangedParam();
conditioner.on();
conditioner.setRangedParam(30);
conditioner.showInfo();
conditioner.increaseRangedParam();
conditioner.showInfo();

function DeviceWithRangedAndModeParam(name, place, minValue, maxValue, nameOfParam, mode, rangedParam) {
    this._mode = mode;
    if (mode === undefined) mode = 'default';
    DeviceWithRangedParam.call(this, name, place, minValue, maxValue, nameOfParam, rangedParam);
}

DeviceWithRangedAndModeParam.prototype = Object.create(DeviceWithRangedParam.prototype);

DeviceWithRangedAndModeParam.prototype.constructor = DeviceWithRangedAndModeParam;

var oven = new DeviceWithRangedAndModeParam('Oven', 'Kitchen', 0, 300, 'temperature');

console.dir(oven);
oven.on();
oven.showInfo();
oven.setRangedParam(250);
oven.showInfo();
