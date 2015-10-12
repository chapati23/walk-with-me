import ProgressButton from './progressButton';

let ProgressButtonDirective = ($state, $timeout, $animate, $rootScope) => {
    return {
        template: `
        <div class="progress-button">
            <button><span>Walk with me&nbsp;&rarr;</span></button>
            <svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
            <svg class="checkmark" width="58" height="58"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
            <svg class="cross" width="58" height="58"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
        </div>`,
        replace: true,
        restrict: 'AE',

        link: function (scope, element) {
            new ProgressButton(element[0], {}, $timeout, $state, $animate, $rootScope);
        }
    };
};

export default ProgressButtonDirective;
