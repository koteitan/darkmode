
/**
 * Converts a single RGB pixel to dark mode
 * @param {Array} rgb - RGB values as array [R,G,B] where 0 <= R,G,B <= 1
 * @returns {Object} - Object containing converted values and intermediate calculations
 */
function convert_pixel(rgb) {
    const R = rgb[0];
    const G = rgb[1];
    const B = rgb[2];
    
    const X = (2*R - G - B) / Math.sqrt(6);
    const Y = (G - B) / Math.sqrt(2);
    const Z = (R + G + B) / Math.sqrt(3);
    
    const Z2 = Math.sqrt(3) - Z;
    
    const C = Math.sqrt(X*X + Y*Y);
    
    const C_max_Z = Math.sqrt(2) * Math.min(Z, Math.sqrt(3) - Z);
    
    const C_max_Z2 = Math.sqrt(2) * Math.min(Z2, Math.sqrt(3) - Z2);
    
    let S = 0;
    if (C !== 0 && C_max_Z !== 0) {
        S = C / C_max_Z;
    }
    
    const C2 = S * C_max_Z2;
    
    let X2 = 0;
    let Y2 = 0;
    if (C !== 0) {
        X2 = (C2 / C) * X;
        Y2 = (C2 / C) * Y;
    }
    
    const R2 = (2*X2/Math.sqrt(6) + Z2/Math.sqrt(3));
    const G2 = (-X2/Math.sqrt(6) + Y2/Math.sqrt(2) + Z2/Math.sqrt(3));
    const B2 = (-X2/Math.sqrt(6) - Y2/Math.sqrt(2) + Z2/Math.sqrt(3));
    
    return {
        rgb: [
            // Math.max(0, Math.min(1, R2)),
            // Math.max(0, Math.min(1, G2)),
            // Math.max(0, Math.min(1, B2))
            R2, G2, B2
        ],
        calculations: {
            input: [R, G, B],
            xyz: [X, Y, Z],
            xyz2: [X2, Y2, Z2],
            rgb2: [R2, G2, B2],
            other: {
                C, C_max_Z, C_max_Z2, S, C2
            }
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
        
        result.data[i] = Math.round(convertedRgb[0] * 255);
        result.data[i + 1] = Math.round(convertedRgb[1] * 255);
        result.data[i + 2] = Math.round(convertedRgb[2] * 255);
    }
    
    return result;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { convert_pixel, convert };
}
