class JourneyController {
    constructor(RefugeeService) {
        this.refugee = RefugeeService.getRefugee()
    }
}

export default JourneyController;
