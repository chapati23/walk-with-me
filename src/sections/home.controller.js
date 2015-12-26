class HomeController {
    constructor(RefugeeService, $rootScope, $state) {

        $rootScope.$on('submit:ageForm', () => {
            $rootScope.$$listeners['submit:ageForm'] = [];

            let formParams = {
                age: document.querySelector('input[name="age"]').value
            };

            RefugeeService.getRefugee(formParams)
                .then(refugee => this.refugee = refugee)
                .catch(error => console.error(error));
        });

        $rootScope.$on('matching:complete', () => {
            $rootScope.$$listeners['matching:complete'] = [];
            $state.go('journey', { refugeeName: this.refugee.name.toLowerCase().split(/ /)[0], refugeeId: this.refugee.$id});
        });
    }
}

HomeController.$inject = ['RefugeeService', '$rootScope', '$state'];

export default HomeController;
