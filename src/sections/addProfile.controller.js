import jsSHA from 'jssha/src/sha1';

export default class AddProfileController {
    constructor(Upload, $timeout, $window, $firebaseArray, $firebaseObject, CONFIG, $state) {
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$window = $window;
        this.$firebaseArray = $firebaseArray;
        this.CONFIG = CONFIG;
        this.$state = $state;
        this.refugeesRef = new $window.Firebase(this.CONFIG.databaseUrl);
        this.refugees = this.$firebaseArray(this.refugeesRef);
        this.refugee = {};
    }

    uploadPhoto(file) {
        this.refugeeRef = this.refugeesRef.push();

        let publicID = this.refugeeRef.key();
        let timestamp = new Date().getTime();
        let uploadPreset = 'nchlgavx';

        let serializedParams = `public_id=${publicID}&timestamp=${timestamp}&upload_preset=${uploadPreset}`;
        let signature = `${serializedParams}${this.CONFIG.imgUploadApiSecret}`;
        let sha1 = new jsSHA("SHA-1", "TEXT");
        sha1.update(signature);
        signature = sha1.getHash('HEX');

        this.photo = file;

        if (file) {
            this.Upload.upload({
                url: this.CONFIG.imgUploadUrl,
                data: {
                    'api_key': this.CONFIG.imgUploadApiKey,
                    file: file,
                    'public_id': publicID,
                    signature: signature,
                    timestamp: timestamp,
                    'upload_preset': uploadPreset
                }
            }).then((response) => {
                this.$timeout(() => {
                    file.result = response.data;
                    this.refugee.imgUrl = file.result.url;
                });
            }, (error) => {
                if (error.status > 0) {
                    this.errorMsg = error.status + ': ' + error.data;
                    console.error('Upload failed :(', this.errorMsg);
                }
            }, (event) => {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * event.loaded / event.total));
                if (file.progress === 100) {
                    file.showSpinner = true;
                }
            });
        }
    }

    onSubmit() {
        this.refugee.createdAt = new Date().toISOString();
        this.refugee.updatedAt = new Date().toISOString();
        this.refugee.needsReview = true;
        this.refugeeRef.set(this.refugee);

        this.$timeout(() => {
            this.$state.go('profileAdded');
        }, 500);
        // this.$state.go('journey', { refugeeName: this.refugee.name.toLowerCase().split(/ /)[0], refugeeId: this.refugeeRef.key()});
    }
}
