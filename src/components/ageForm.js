class AgeFormController {
    constructor($rootScope, $element) {
        this.progressButton = $element.find('button');
        this.$rootScope = $rootScope;
    }

    triggerProgressButtonOnEnter(event) {
        if (event.which === 13) {
            event.preventDefault();
            this.progressButton[0].click();
        }
    }
}

AgeFormController.$inject = ['$rootScope', '$element'];

let AgeForm = {
    bindings: { },
    controller: AgeFormController,
    controllerAs: 'vm',
    transclude: true,

    template: `
        <form class="age-form" ng-animate=" 'animate' " autocomplete="off">
            <h3 class="take-a-journey">Take a journey with a refugee</h3>
            <div class="your-age">
                <label for="js-age-input" class="big-label">How old are you?</label>
                <input id="js-age-input" type="text" name="age" placeholder="AGE" pattern="\d*" ng-keydown="vm.triggerProgressButtonOnEnter($event)" ng-keypress="vm.triggerProgressButtonOnEnter($event)" required />
                <!-- pattern="\d*" makes use of the number keyboard on iOS -->
            </div>
        </form>
        <progress-button></progress-button>
    `
};

export default AgeForm;
