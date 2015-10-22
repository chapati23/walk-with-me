export default class AddProfileController {
    constructor(Upload, $timeout, $window, $firebaseArray) {
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$window = $window;
        this.$firebaseArray = $firebaseArray;
        this.refugeesRef = new $window.Firebase("https://walk-with-me-database.firebaseio.com/refugees");
        this.refugees = this.$firebaseArray(this.refugeesRef);

        // TODO: turn this into this.refugee = new Refugee() and connect to backend
        this.refugee = {};
    }

    uploadPhoto(file) {
        file.upload = this.Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: { file: file, refugeeId: this.refugee.id }
        });

        file.upload.then((response) => {
            this.$timeout(() => {
                console.log('response:', response.data);
                file.result = response.data;
                this.photo = file;
            });
        }, (response) => {
            if (response.status > 0) {
                this.errorMsg = response.status + ': ' + response.data;
                console.log('response 2:', response.status, response.data);
            }
        }, (evt) => {
            console.log('evt:', evt);
            // Math.min is to fix IE which reports 200% sometimes
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
    }

    onSubmit() {

        // if valid
        this.refugee.createdAt = new Date();
        this.refugee.updatedAt = new Date();

        console.log('submit it!!', this.refugee);

        // this.refugees.$add(this.refugee);
    }
}
