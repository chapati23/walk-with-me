import jsSHA from 'jssha/src/sha1';

export default class AddProfileController {
    constructor(Upload, $timeout, $window, $firebaseArray, $firebaseObject, CONFIG) {
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$window = $window;
        this.$firebaseArray = $firebaseArray;
        this.CONFIG = CONFIG;
        this.refugeesRef = new $window.Firebase(this.CONFIG.databaseUrl);
        this.refugees = this.$firebaseArray(this.refugeesRef);
        this.refugee = {};
    }

    uploadPhoto(file) {
        let timestamp = new Date().getTime();
        let signature = `public_id=refugees/${this.refugee.id}&timestamp=${timestamp}${this.CONFIG.imgUploadApiSecret}`;
        let sha1 = new jsSHA("SHA-1", "TEXT");
        sha1.update(signature);
        signature = sha1.getHash('HEX');
        this.photo = file;

        this.Upload.upload({
            url: this.CONFIG.imgUploadUrl,
            data: {
                'api_key': this.CONFIG.imgUploadApiKey,
                file: file,
                'public_id': 'refugees/' + this.refugee.id,
                // signature: signature,
                'upload_preset': 'nchlgavx',
                timestamp: timestamp
            }
        }).then((response) => {
            this.$timeout(() => {
                file.result = response.data;
                this.refugee.imgUrl = file.result.url;
                this.refugeeRef = this.refugees.$add(this.refugee);
            });
        }, (error) => {
            if (error.status > 0) {
                this.errorMsg = error.status + ': ' + error.data;
                console.error('Upload failed :(', this.errorMsg);
            }
        }, (event) => {
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
        });
    }

    onSubmit() {
        this.refugee.createdAt = new Date().toISOString();
        this.refugee.updatedAt = new Date().toISOString();
        this.refugee.needsReview = true;

        this.refugeeRef.then((refugeeRef) => {
            let refugee = this.refugees.$getRecord(refugeeRef.key());
            Object.assign(refugee, this.refugee);
            console.log(this.refugees.$save(refugee));
        });
        // this.refugees.$remove(this.refugeeRef);
    }
}
