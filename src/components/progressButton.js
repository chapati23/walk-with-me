class SVGEl {
    constructor(el) {
        this.el = el;
        // the path elements
        this.paths = [].slice.call( this.el.querySelectorAll( 'path' ) );
        // we will save both paths and its lengths in arrays
        this.pathsArr = new Array();
        this.lengthsArr = new Array();
        this.paths.forEach( ( path, i ) => {
            this.pathsArr[i] = path;
            path.style.strokeDasharray = this.lengthsArr[i] = path.getTotalLength();
        } );
        // undraw stroke
        this.draw(0);
    }

    // val in [0,1] : 0 - no stroke is visible, 1 - stroke is visible
    draw( val ) {
        for( var i = 0, len = this.pathsArr.length; i < len; ++i ){
            this.pathsArr[ i ].style.strokeDashoffset = this.lengthsArr[ i ] * ( 1 - val );
        }
    }
}

class ProgressButton {
    constructor (element, options, $timeout, $state, $animate) {
        this.options = {
            // time in ms that the status (success or error will be displayed) - should be at least higher than the transition-duration value defined for the stroke-dashoffset transition of both checkmark and cross strokes
            statusTime : 1500
        };

        this.$timeout = $timeout;
        this.$state = $state;
        this.$animate = $animate;

        this.el = element;
        this.options = Object.assign( this.options, options );

        this.button             = this.el.querySelector( 'button' );
        this.formEl             = document.querySelector('.age-and-gender-form');
        this.searchInProgressEl = document.querySelector('.search-in-progress');
        this.progressEl         = new SVGEl( this.el.querySelector( 'svg.progress-circle' ) );
        this.successEl          = new SVGEl( this.el.querySelector( 'svg.checkmark' ) );
        this.errorEl            = new SVGEl( this.el.querySelector( 'svg.cross' ) );

        this.button.addEventListener( 'click', () => {
            // by adding the loading class the button will transition to a "circle"
            this.el.className += ' loading';
            this.formEl.className += ' ng-leave';
            this.searchInProgressEl.className += ' ng-enter-active';
            this.button.addEventListener( 'transitionend', this.onButtonTransitionEnd.bind(this) );
        });

        this.enableButton();
    }

    onButtonTransitionEnd (event) {
        if( event.propertyName !== 'width' ) {
            return false;
        }

        this.button.removeEventListener( 'transitionend', this.onButtonTransitionEnd );

        // disable the button - this should have been the first thing to do when clicking the button.
        // however if we do so Firefox does not seem to fire the transitionend event.
        this.button.setAttribute( 'disabled', '' );

        let progress = 0;
        let interval = setInterval( () => {
            progress = Math.min( progress + Math.random() * 0.1, 1 );
            this.setProgress( progress );

            if( progress === 1 ) {
                clearInterval( interval );
                this.finishLoading(1);
                this.searchInProgressEl.className = this.searchInProgressEl.className.replace(/ng-enter-active/, 'ng-leave-active');
                this.$timeout(() => {
                    this.$state.go('journey');
                }, 1000);
            }
        }, 100 );
    };

    setProgress(val) {
        this.progressEl.draw( val );
    }

    enableButton() {
        this.button.removeAttribute( 'disabled' );
    }

    // runs after the progress reaches 100%
    finishLoading(status) {
        // first undraw progress stroke.
        this.progressEl.draw(0);

        if( typeof status === 'number' ) {
            let statusClass = status >= 0 ? 'success' : 'error',
            statusEl = status >= 0 ? this.successEl : this.errorEl;

            // draw stroke of success (checkmark) or error (cross).
            statusEl.draw( 1 );
            // add respective class to the element
            this.el.className += ' ' + statusClass;

        } else {
            this.enableButton();
        }
        // finally remove class loading.
        // this.el.className = this.el.className.replace(/loading/, 'success');
    };

}

let ProgressButtonDirective = ($state, $timeout, $animate) => {
    return {
        template: `
        <div class="progress-button button fullwidth">
            <button><span>Walk with me&nbsp;&rarr;</span></button>
            <svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
            <svg class="checkmark" width="58" height="58"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
            <svg class="cross" width="58" height="58"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
        </div>`,
        replace: true,
        restrict: 'AE',

        link: function (scope, element) {
            new ProgressButton(element[0], {}, $timeout, $state, $animate);
        }
    };
};

export default ProgressButtonDirective;
