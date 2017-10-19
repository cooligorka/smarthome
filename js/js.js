'use strict';

function addDevice() {
    var opt = document.forms.adddev.elements[0].selectedOptions;

    if (opt[0].className === "slider") {
        var box = new DeviceWithSlider();
    } else {
        box = new Device();
    };

    var div = document.createElement('div');

    div.classList.add('col-md-2', 'container', 'col-sm-2', 'col-xs-2', 'box', 'text-center');
    div.style.borderColor = box._state ? "green" : "red";
    var src = box._device;

    if (src === "fridge") {
        src = "./images/fridge.png"
    }
    if (src === "lamp") {
        src = "./images/lamp.png"
    }
    if (src === "oven") {
        src = "./images/oven.png"
    }

    div.options = {
        place: '<div>' + box._place + '<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>',
        img: '<img src=' + src + ' alt="..." class="img-responsive center-block padding-custom" width="150" height="200">',
        buttonOn: '<button type="button" class="on btn btn-primary  col-md-5 col-sm-5 col-xs-5">ON</button>',
        buttonOf: '<button type="button" class="off btn btn-danger  col-md-5 col-sm-5 col-xs-5">OFF</button>',
        buttonInfo: '<button type="button" class="info btn btn-warning col-md-10 col-sm-10 col-xs-10 col-md-offset-1 col-sm-offset-1 col-xs-offset-1">Info</button>'
    };

    div.innerHTML = div.options.place + div.options.img + '<div class="btn-group btn-block col-md-offset-1 col-sm-offset-1 col-xs-offset-1">'
        + div.options.buttonOn + div.options.buttonOf + '</div>' + div.options.buttonInfo;

    div = document.getElementById('main').appendChild(div);

    var slider = document.createElement("div");
    slider.classList.add("col-md-offset-1", "col-sm-offset-1", "col-xs-offset-1", "col-md-10", "col-sm-10", "col-xs-10");
    slider.innerHTML = '<input type="range" step="1" value="0" class="slide"/>';

    if (box instanceof DeviceWithSlider) {
        slider = div.appendChild(slider);
        slider.firstChild.max = box._maxValue;
        slider.firstChild.min = box._minValue;
        slider.firstChild.addEventListener("change", function () {
            box.evalSlider(this)
        });
        slider.firstChild.disabled = box._state ? false : true;
    }
    ;

    div.getElementsByClassName('on')[0].addEventListener("click", function () {
        box.on(div)
    });
    div.getElementsByClassName('off')[0].addEventListener("click", function () {
        box.off(div)
    });
    div.getElementsByClassName('info')[0].addEventListener("click", function () {
        box.getInfo()
    });
    div.getElementsByClassName('close')[0].addEventListener("click", function () {
        div.remove()
    });
};

function Device(place, device, state) {
    place = document.getElementById('place').value;
    device = document.getElementById('device').value;
    state = document.getElementById('state').value === "on" ? true : false;
    this._status = state ? 'enabled' : 'disabled';
    this._device = device;
    this._place = place;
    this._state = state;
    return this;
};

Device.prototype.on = function (event) {
    event.style.borderColor = "green";
    event.lastChild.firstChild.disabled = false;
    this._state = true;
    this._status = 'enabled';
};

Device.prototype.off = function (event) {
    event.style.borderColor = "red";
    event.lastChild.firstChild.disabled = true;
    this._state = false;
    this._status = 'disabled';
};

Device.prototype.getInfo = function () {
    if (this._state) {
        alert(this._device + " on " + this._place + " is " + this._status)
    } else {
        alert("device is disabled!")
    }
};

function DeviceWithSlider(device, place, state) {
    Device.call(this, device, place, state);
    this._sliderValue = 0;
    if (this._device === "fridge") {
        this._parametr = "temperature";
        this._minValue = -30;
        this._maxValue = 10;
    }
    if (this._device === "oven") {
        this._parametr = "temperature";
        this._minValue = 30;
        this._maxValue = 300;
    }
};
DeviceWithSlider.prototype = Object.create(Device.prototype);

DeviceWithSlider.prototype.constructor = DeviceWithSlider;

DeviceWithSlider.prototype.evalSlider = function (event) {
    this._sliderValue = event.value
};

DeviceWithSlider.prototype.getInfo = function () {
    if (this._state) {
        alert(this._device + " on " + this._place + " is " + this._status + ' ' + this._parametr + ' ' + this._sliderValue)
    } else {
        alert("device is disabled!")
    }
};


// DeviceWithSlider.prototype.checkParameters = function () {
//     return this.box._state === true && this.box._sliderValue >= this.box._minValue && this.box._sliderValue <= this.box._maxValue;
// };
// DeviceWithSlider.prototype.showSliderValue = function () {
//         alert(this.box._sliderValue);
// };

// DeviceWithSlider.prototype.setSliderValue = function (sliderValue) {
//         this.box._sliderValue = sliderValue;
//         return this.box._sliderValue;
//     } else { alert('Device is Off, cant set the value, or the value is out of range!')}
// };

// DeviceWithSlider.prototype.increaseSliderValue = function () {
//     if(this.box._state === true && this.box._sliderValue > this.box._minValue && this.box._sliderValue < this.box._maxValue) return ++this.box._sliderValue;
// };
//
// DeviceWithSlider.prototype.decreaseSliderValue = function () {
//     if(this.box._state === true && this.box._sliderValue > this.box._minValue && this.box._sliderValue < this.box._maxValue) return --this.box._sliderValue;
// };

// //function DeviceWithRangedAndModeParam(device, place, minValue, maxValue, deviceOfParam, mode, sliderValue) {
//     this._mode = mode;
//     if (mode === undefined) mode = 'default';
//     DeviceWithSliderValue.call(this, device, place, minValue, maxValue, deviceOfParam, sliderValue);
// }
//
// DeviceWithRangedAndModeParam.prototype = Object.create(DeviceWithSliderValue.prototype);
//
// DeviceWithRangedAndModeParam.prototype.constructor = DeviceWithRangedAndModeParam;
//
//
// //var oven = new DeviceWithRangedAndModeParam('Oven', 'Kitchen', 0, 300, 'temperature');









