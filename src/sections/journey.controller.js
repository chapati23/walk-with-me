class JourneyController {
    constructor(RefugeeService, $stateParams) {
        this.refugee = RefugeeService.getRefugee({ id: parseInt($stateParams.refugeeId, 10)});
    }
}

export default JourneyController;
