// let Color = function Color(hexVal) { //define a Color class for the color objects
//     this.hex = hexVal;
// };
//
let constructColor = function(colorObj){
    console.log({colorObj})
    let hex = colorObj.hex.substring(1);
    /* Get the RGB values to calculate the Hue. */
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    /* Getting the Max and Min values for Chroma. */
    let max = Math.max.apply(Math, [r, g, b]);
    let min = Math.min.apply(Math, [r, g, b]);


    /* letiables for HSV value of hex color. */
    let chr = max - min;
    let hue = 0;
    let val = max;
    let sat = 0;


    if (val > 0) {
        /* Calculate Saturation only if Value isn't 0. */
        sat = chr / val;
        if (sat > 0) {
            if (r === max) {
                hue = 60 * (((g - min) - (b - min)) / chr);
                if (hue < 0) {
                    hue += 360;
                }
            } else if (g === max) {
                hue = 120 + 60 * (((b - min) - (r - min)) / chr);
            } else if (b === max) {
                hue = 240 + 60 * (((r - min) - (g - min)) / chr);
            }
        }
    }
    colorObj.chroma = chr;
    colorObj.hue = hue;
    colorObj.sat = sat;
    colorObj.val = val;
    colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
    colorObj.red = parseInt(hex.substring(0, 2), 16);
    colorObj.green = parseInt(hex.substring(2, 4), 16);
    colorObj.blue = parseInt(hex.substring(4, 6), 16);
    return colorObj;
};
//
let sortColorsByLuma = colors => {
    return colors.sort(function (a, b) {
        return a.luma - b.luma;
    });
};
//
// let mapHex = function(color) {
//     return color.hex;
// }

let outputColors = (hexArray) => {
    let colors = [];
    hexArray.forEach((color, index) => {
        constructColor(color);
        colors.push(color);
    });

    return sortColorsByLuma(colors);
};

export default { outputColors }
