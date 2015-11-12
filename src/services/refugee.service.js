class RefugeeService {
    constructor($q, $window, $firebaseArray, CONFIG) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.refugeesRef = new $window.Firebase(CONFIG.databaseUrl);
    }

    getRefugee(options) {
        let q = this.$q.defer();

        if (!options)  {
            q.reject('Cannot get refugee without search criteria');
        }

        if (options.$id) {
            this.$firebaseArray(this.refugeesRef.orderByKey().equalTo(options.$id))
                .$loaded(refugee => q.resolve(refugee[0]));
        } else {
            this.$firebaseArray(this.refugeesRef.orderByChild('needsReview').equalTo(false))
                .$loaded((matchedRefugees) => {
                    if (matchedRefugees && matchedRefugees.length === 1) {
                        q.resolve(matchedRefugees[0]);
                    } else {
                        let randomIndex = Math.floor(Math.random() * (matchedRefugees.length));
                        q.resolve(matchedRefugees[randomIndex]);
                    }
                });
        }

        return q.promise;
    }
}

export default RefugeeService;
