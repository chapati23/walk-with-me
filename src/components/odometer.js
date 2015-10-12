import Odometer from 'odometer';

class OdometerController {
    constructor($element) {
        this.instance = new Odometer({
            el: $element[0],
            value: 0
        });
        this.shouldOdometerRun = true;
    }

    startOdometer() {
        // actually the in-view directive is supposed to pass the $event-object but for some reason
        // it's always undefined. that's why I went with a flag to avoid executing the function
        // everytime the Odometer is being scrolled into view
        // console.log($index, $inview, $inviewpart, $event);
        this.instance.update(this.target);
        this.shouldOdometerRun = false;
    };
}

let OdometerDirective = () => {
    return {
        template: `<span in-view="vm.shouldOdometerRun && vm.startOdometer()" class="counter odometer">0</span>`,
        restrict: 'E',
        scope: {},
        controllerAs: 'vm',
        bindToController: {
            target: '='
        },
        controller: OdometerController
    };
};

export default OdometerDirective;
