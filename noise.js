function makeNoise(width, height){
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    var imgData = ctx.getImageData(0, 0, width, height),
        data = imgData.data,
        pixels = data.length;

    for(var i = 0; i < pixels; i+=4){
        data[i] = Math.random()*255;
        data[i+1] = Math.random()*255;
        data[i+2] = Math.random()*255;
 //       data[i+1] = data[i];
   //     data[i+2] = data[i];
        data[i+3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    return canvas;
}

function makeOctaveNoise(width, height, octaves){
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,width,height);

    ctx.globalAlpha = 1/octaves;
    ctx.globalCompositeOperation = 'lighter';

    for(var i = 0; i < octaves; i++){
        var octave = makeNoise(width>>i, height>>i);
        ctx.drawImage(octave, 0, 0, width, height);
    }

    return canvas;
}
