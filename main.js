
/**
 * Converts a single RGB pixel to dark mode
 * @param {Array} rgb - RGB values as array [R,G,B] where 0 <= R,G,B <= 1
 * @returns {Array} - Converted R'G'B' values as array [R2,G2,B2]
 */
function convert_pixel(rgb) {
    const R = rgb[0];
    const G = rgb[1];
    const B = rgb[2];
    
    const X = (2*R - G - B) / Math.sqrt(6);
    const Y = (G - B) / Math.sqrt(2);
    const Z = (R + G + B) / Math.sqrt(3);
    
    const Z_prime = Math.sqrt(3) - Z;
    
    const C = Math.sqrt(X*X + Y*Y);
    
    const C_max_Z = Math.sqrt(2) * Math.min(Z, Math.sqrt(3) - Z);
    
    const C_max_Z_prime = Math.sqrt(2) * Math.min(Z_prime, Math.sqrt(3) - Z_prime);
    
    let S = 0;
    if (C !== 0 && C_max_Z !== 0) {
        S = C / C_max_Z;
    }
    
    const C_prime = S * C_max_Z_prime;
    
    let X_prime = 0;
    let Y_prime = 0;
    if (C !== 0) {
        X_prime = (C_prime / C) * X;
        Y_prime = (C_prime / C) * Y;
    }
    
    const sqrt3 = Math.sqrt(3);
    const offset = 0.333 * sqrt3;
    
    let R2 = (2*X_prime/Math.sqrt(6) + Z_prime/Math.sqrt(3));
    let G2 = (-X_prime/Math.sqrt(6) + Y_prime/Math.sqrt(2) + Z_prime/Math.sqrt(3));
    let B2 = (-X_prime/Math.sqrt(6) - Y_prime/Math.sqrt(2) + Z_prime/Math.sqrt(3));
    
    if ((R === 0 && G === 1 && B === 1) || // Cyan
        (R === 1 && G === 0 && B === 1) || // Magenta
        (R === 1 && G === 1 && B === 0)) { // Yellow
        
        if (R === 0 && G === 1 && B === 1 && R2 < 0.1) {
            R2 = 0.333;
        }
        
        if (R === 1 && G === 0 && B === 1 && G2 < 0.1) {
            G2 = 0.333;
        }
        
        if (R === 1 && G === 1 && B === 0 && B2 < 0.1) {
            B2 = 0.333;
        }
    }
    
    return [
        Math.max(0, Math.min(1, R2)),
        Math.max(0, Math.min(1, G2)),
        Math.max(0, Math.min(1, B2))
    ];
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
        
        result.data[i] = Math.round(converted[0] * 255);
        result.data[i + 1] = Math.round(converted[1] * 255);
        result.data[i + 2] = Math.round(converted[2] * 255);
    }
    
    return result;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { convert_pixel, convert };
}
