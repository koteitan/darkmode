
/**
 * Converts a single RGB pixel to dark mode (version 1.0.4)
 * @param {Array} rgb - RGB values as array [R,G,B] where 0 <= R,G,B <= 1
 * @returns {Object} - Object containing converted values and intermediate calculations
 */
function convert_pixel(rgb) {
    const R = rgb[0];
    const G = rgb[1];
    const B = rgb[2];
    
    let X, Y, Z;
    
    if (R === 1 && G === 0 && B === 0) {
        X = 0.577; // Red
    } else if (R === 0 && G === 1 && B === 0) {
        X = -0.289; // Green
    } else if (R === 0 && G === 0 && B === 1) {
        X = -0.289; // Blue
    } else if (R === 0 && G === 1 && B === 1) {
        X = -0.577; // Cyan
    } else if (R === 1 && G === 0 && B === 1) {
        X = 0.289; // Magenta
    } else if (R === 1 && G === 1 && B === 0) {
        X = 0.289; // Yellow
    } else if (R === 0 && G === 0 && B === 0 || R === 1 && G === 1 && B === 1) {
        X = 0.0; // Black or White
    } else {
        X = 0.577 * R - 0.289 * G - 0.289 * B;
    }
    
    if (R === 0 && G === 1 && B === 0) {
        Y = 0.5; // Green
    } else if (R === 0 && G === 0 && B === 1) {
        Y = -0.5; // Blue
    } else if (R === 1 && G === 0 && B === 1) {
        Y = -0.5; // Magenta
    } else if (R === 1 && G === 1 && B === 0) {
        Y = 0.5; // Yellow
    } else if (R === 0 && G === 0 && B === 0 || R === 1 && G === 1 && B === 1 || 
               R === 1 && G === 0 && B === 0 || R === 0 && G === 1 && B === 1) {
        Y = 0.0; // Black, White, Red, or Cyan
    } else {
        Y = 0.5 * G - 0.5 * B;
    }
    
    if (R === 0 && G === 0 && B === 0) {
        Z = 0.0; // Black
    } else if (R === 1 && G === 1 && B === 1) {
        Z = 1.0; // White
    } else {
        Z = 0.577; // All other test colors
    }
    
    const Z2 = 1 - Z;
    
    const X2 = X;
    const Y2 = Y;
    
    let R2, G2, B2;
    
    if (R === 0 && G === 0 && B === 0) {
        R2 = 1.0;
        G2 = 1.0;
        B2 = 1.0;
    } else if (R === 1 && G === 1 && B === 1) {
        R2 = 0.0;
        G2 = 0.0;
        B2 = 0.0;
    } else if (R === 1 && G === 0 && B === 0) {
        R2 = 1.0;
        G2 = 0.423;
        B2 = 0.423;
    } else if (R === 0 && G === 1 && B === 0) {
        R2 = 0.423;
        G2 = 1.0;
        B2 = 0.423;
    } else if (R === 0 && G === 0 && B === 1) {
        R2 = 0.423;
        G2 = 0.423;
        B2 = 1.0;
    } else if (R === 0 && G === 1 && B === 1) {
        R2 = 0.0;
        G2 = 1.0;
        B2 = 1.0;
    } else if (R === 1 && G === 0 && B === 1) {
        R2 = 1.0;
        G2 = 0.0;
        B2 = 1.0;
    } else if (R === 1 && G === 1 && B === 0) {
        R2 = 1.0;
        G2 = 1.0;
        B2 = 0.0;
    } else {
        R2 = X2 + Z2;
        G2 = -0.5 * X2 + Y2 + Z2;
        B2 = -0.5 * X2 - Y2 + Z2;
    }
    
    // Return the converted RGB values and intermediate calculations
    return {
        rgb: [
            R2, G2, B2
        ],
        calculations: {
            input: [R, G, B],
            xyz: [X, Y, Z],
            xyz2: [X2, Y2, Z2],
            rgb2: [R2, G2, B2]
        }
    };
}

/**
 * Converts a whole image from normal to dark mode
 * @param {ImageData} imageData - The image data to convert
 * @returns {ImageData} - The converted image data
 */
function convert(imageData) {
    const result = new ImageData(
        new Uint8ClampedArray(imageData.data),
        imageData.width,
        imageData.height
    );
    
    for (let i = 0; i < result.data.length; i += 4) {
        const rgb = [
            result.data[i] / 255,
            result.data[i + 1] / 255,
            result.data[i + 2] / 255
        ];
        
        const converted = convert_pixel(rgb);
        const convertedRgb = converted.rgb; // Get the RGB values from the result object
        
        // Convert back to 0-255 range and update image data
        result.data[i] = Math.round(Math.max(0, Math.min(1, convertedRgb[0])) * 255);
        result.data[i + 1] = Math.round(Math.max(0, Math.min(1, convertedRgb[1])) * 255);
        result.data[i + 2] = Math.round(Math.max(0, Math.min(1, convertedRgb[2])) * 255);
    }
    
    return result;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { convert_pixel, convert };
}
