class HomeController {
    constructor(RefugeeService, $rootScope) {
        this.RefugeeService = RefugeeService;
        $rootScope.$on('submit:ageAndGenderForm', () => {
            this.gender = document.querySelector('input[name="gender"]:checked').value;
            RefugeeService.setRefugee({ gender: this.gender});
        })
    }



}

export default HomeController;
