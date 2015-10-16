class SVG {
    constructor(el) {
        this.el = el;
        // the path elements
        this.paths = [].slice.call( this.el.querySelectorAll( 'path' ) );
        // we will save both paths and its lengths in arrays
        this.pathsArr = [];
        this.lengthsArr = [];
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

export default SVG;
