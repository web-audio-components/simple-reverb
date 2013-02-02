# Simple-Reverb

  A simple reverb effect module for the Web Audio API.

## Installation

    $ component install web-audio-components/simple-reverb

## Example Usage

```javascript
var context = new webkitAudioContext()
  , osc = context.createOscillator()
  , SimpleReverb = require("simple-reverb")
  , verb = new SimpleReverb(context, {
      seconds: 3,
      decay: 2,
      reverse: 1
    });

osc.connect(verb.input);
verb.connect(context.destination);
osc.start(0);
```

For more examples, see the test and example directories.

## API

### SimpleReverb(context, options)

Instantiate a SimpleReverb effect module. Expects an `AudioContext` as the first
parameter.

**Options**

- `seconds` Impulse response length.
- `decay` Impulse response decay rate.
- `reverse` Reverse the impulse response.

### .connect(node)

Connect a Delay module to an `AudioNode`.

### .disconnect()

Disconnect all outgoing connections from a Delay module.

## License

  Copyright (c) 2012 Jordan Santell

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
