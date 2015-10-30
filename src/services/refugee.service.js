class RefugeeService {
    constructor($q, $window, $firebaseArray, CONFIG) {
        this.$q = $q;
        this.$firebaseArray = $firebaseArray;
        this.refugeesRef = new $window.Firebase(CONFIG.databaseUrl);
    }

    getRefugee(options) {
        let deferred = this.$q.defer();

        if (!options)  {
            deferred.reject('Cannot get refugee without search criteria');
        }

        if (options.$id) {
            this.$firebaseArray(this.refugeesRef.orderByKey().equalTo(options.$id))
            .$loaded((refugee) => {
                deferred.resolve(refugee[0]);
            });
        } else if (options.sex) {
            this.$firebaseArray(this.refugeesRef.orderByChild('sex').equalTo(options.sex))
            .$loaded((matchedRefugees) => {
                if (matchedRefugees && matchedRefugees.length === 1) {
                    console.log('matched 1');
                    deferred.resolve(matchedRefugees[0]);
                } else {
                    let randomIndex = Math.floor(Math.random() * (matchedRefugees.length));
                    console.log('matched 2', randomIndex);
                    deferred.resolve(matchedRefugees[randomIndex]);
                }
            });
        }

        return deferred.promise;
    }

    addRefugee(refugee) {
        console.log(refugee);
        // this.users.$add(refugee);
    }
}

export default RefugeeService;
