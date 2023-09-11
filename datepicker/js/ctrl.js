var Ctrl = {
    Create: function(){}
};

Ctrl.Create.prototype.extend = function(options){
    var settings = this.property.datepicker;

    for(n in options){
        settings[n] = options[n]
    }

    return settings;
}