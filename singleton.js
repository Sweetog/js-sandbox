

var singleton = (function () {
    console.log('singleton IIFE this: ', this);
    var instance;
 
    function init() {
        console.log('init this: ', this);
        var name;
        
        function setName (val) {
            name = val
        }

        function getName () {
            return name;
        }

        return {
            setName: setName,
            getName: getName
        }
    }

    function getInstance() {
        console.log('getInstance this:', this);
        if (!instance) {
            instance = init();
        }

        return instance;
    }

    return {
        getInstance: getInstance
    }

})();

var instance1 = singleton.getInstance();
var instance2 = singleton.getInstance();

instance1.setName('Brian Ogden');
console.log(instance2.getName());
instance2.setName('Rachael Ogden');
console.log(instance1.getName());
