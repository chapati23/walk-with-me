export default class AddProfileController {
    constructor(Upload, $timeout) {
        this.Upload = Upload;
        this.$timeout = $timeout;

        // TODO: turn this into this.refugee = new Refugee() and connect to backend
        this.refugee = {
            id: 3
        };
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
                this.refugee.photo = file;
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
        console.log('submit it!!', event);
    }
}
