import 'angular';
import 'angular-mocks';
import RefugeeService from 'src/services/refugee.service';

describe('RefugeeService Unit Tests', function() {
    let $rootScope;

    beforeEach(inject(function (_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    describe('Something specific', function() {
        it('Something', function() {
            console.log(RefugeeService, $rootScope);
            expect(true).toBe(true);
        });
    });
});
