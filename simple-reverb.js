// SimpleReverb
// Inspired by Matt Diamond's Synthjs Reverb: https://github.com/mattdiamond/synthjs

(function ( root, factory ) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    root.SimpleReverb = factory();
  }
})(this, function () {

  function SimpleReverb ( context, options ) {
    options = options || {};

    var _this = this;
    this.context = context;
    var convolver = this.context.createConvolver();

    this.input = convolver;
    this.output = convolver;

    // Params

    var seconds = {
      name: 'seconds',
      defaultValue: options.seconds || 3,
      minValue: 1,
      maxValue: 50
    };

    var decay = {
      name: 'decay',
      defaultValue: options.decay || 2,
      minValue: 0,
      maxValue: 100
    };

    var reverse = {
      name: 'reverse',
      defaultValue: !!options.reverse || false,
      minValue: 0,
      maxValue: 1
    };

    this.params = {
      seconds: seconds,
      decay: decay,
      reverse: reverse
    };

    setupParams.call( this.params.seconds );
    setupParams.call( this.params.decay );
    setupParams.call( this.params.reverse );

    createImpulse.call( this );
  }

  SimpleReverb.prototype.connect = function ( node ) {
    this.output.connect( node && node.input ? node.input : node );
  };

  SimpleReverb.prototype.disconnect = function () {
    this.output.disconnect();
  };


  function setupParams () {
    var _this = this;
    this.__value = this.defaultValue;
    this.__defineGetter__( 'value', function () { return _this.__value; });
    this.__defineSetter__( 'value', function ( val ) {
      _this.__value = val;
      createImpulse();
    });
  }

  function createImpulse () {
    var rate = this.context.sampleRate;
    var length = rate * this.params.seconds.value;
    var decay = this.params.decay.value;
    var reverse = this.params.reverse.value;

    var impulse = this.context.createBuffer( 2, length, rate );
    var impulseL = impulse.getChannelData( 0 );
    var impulseR = impulse.getChannelData( 1 );
    var n;

    for ( var i = 0; i < length; i++ ) {
      n = reverse ? length - i : i;
      impulseL[ i ] = ( Math.random() * 2 - 1 ) * Math.pow( 1 - n / length, decay );
      impulseR[ i ] = ( Math.random() * 2 - 1 ) * Math.pow( 1 - n / length, decay );
    }

    this.input.buffer = impulse;
  }

  return SimpleReverb;

});
