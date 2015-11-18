import SVGElement from './svgElement';

class ProgressButtonController {
    constructor ($element, $timeout, $rootScope) {
        this.options = {
            delayBeforeStartingAnimation: 200,
            progressInterval: 100,
            timeoutBeforeNavigatingToRefugeeProfile: 800
        };

        this.$element = $element[0];
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;

        this.button             = this.$element.querySelector( 'button' );
        this.formEl             = document.querySelector('.age-form');
        this.searchInProgressEl = document.querySelector('.search-in-progress');
        this.progressEl         = new SVGElement( this.$element.querySelector( 'svg.progress-circle' ) );
        this.successEl          = new SVGElement( this.$element.querySelector( 'svg.checkmark' ) );
        this.errorEl            = new SVGElement( this.$element.querySelector( 'svg.cross' ) );

        this.button.addEventListener( 'click', () => {
            // by adding the loading class the button will transition to a "circle"
            this.$element.className += ' loading';
            this.formEl.className += ' ng-leave';
            this.searchInProgressEl.className += ' ng-enter-active';
            this.button.addEventListener( 'transitionend', this.onButtonTransitionEnd.bind(this) );
            this.$rootScope.$broadcast('submit:ageForm');
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

        this.$timeout(() => {
            let progress = 0;
            let interval = setInterval( () => {
                progress = Math.min( progress + Math.random() * 0.1, 1 );
                this.setProgress( progress );

                if( progress === 1 ) {
                    clearInterval( interval );
                    this.finishLoading(1);
                    this.searchInProgressEl.className = this.searchInProgressEl.className.replace(/ng-enter-active/, 'ng-leave-active');
                    this.$element.className += ' ng-leave-active';
                    this.$timeout(() => {
                        this.$rootScope.$broadcast('matching:complete');
                    }, this.options.timeoutBeforeNavigatingToRefugeeProfile);
                }
            }, this.options.progressInterval );
        }, this.options.delayBeforeStartingAnimation);
    }

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
            this.$element.className += ' ' + statusClass;

        } else {
            this.enableButton();
        }
        // finally remove class loading.
        // this.$element.className = this.$element.className.replace(/loading/, 'success');
    }

}

let ProgressButtonDirective = () => {
    return {
        template: `
        <div class="progress-button">
            <h3 class="search-in-progress">We are finding the right journey for you</h3>
            <button><span>Walk with me&nbsp;&rarr;</span></button>
            <svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
            <svg class="checkmark" width="58" height="58"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
            <svg class="cross" width="58" height="58"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
        </div>`,
        replace: true,
        restrict: 'AE',
        controller: ProgressButtonController
    };
};

export default ProgressButtonDirective;
