class HomeController {
    constructor(RefugeeService, $rootScope, $state) {

        $rootScope.$on('submit:ageAndSexForm', () => {
            $rootScope.$$listeners['submit:ageAndSexForm'] = [];

            let formParams = {
                sex: document.querySelector('input[name="sex"]:checked').value,
                age: document.querySelector('input[name="age"]').value
            };

            RefugeeService.getRefugee(formParams)
            .then((refugee) => {
                this.refugee = refugee;
            }, (error) => {
                console.error(error);
            });
        });

        $rootScope.$on('matching:complete', () => {
            $rootScope.$$listeners['matching:complete'] = [];

            $state.go('journey', { refugeeName: this.refugee.name.toLowerCase(), refugeeId: this.refugee.$id});
        });
    }
}

export default HomeController;
