
/**
 * Converts a single RGB pixel to dark mode (version 1.0.2)
 * @param {Array} rgb - RGB values as array [R,G,B] where 0 <= R,G,B <= 1
 * @returns {Object} - Object containing converted values and intermediate calculations
 */
function convert_pixel(rgb) {
    const R = rgb[0];
    const G = rgb[1];
    const B = rgb[2];
    
    // Constants for calculations
    const sqrt6 = Math.sqrt(6);
    const sqrt3 = Math.sqrt(3);
    const sqrt2 = Math.sqrt(2);
    
    const X = (2*R - G - B) / sqrt6;
    const Y = (G - B) / sqrt2;
    const Z = (R + G + B) / sqrt3;
    
    const Z2 = sqrt3 - Z;
    
    const C = Math.hypot(X, Y);
    let dx = 0;
    let dy = 0;
    if (C > 0) {
        dx = X / C;
        dy = Y / C;
    }
    
    function dirCmax(Z_val, dx, dy) {
        let t_max = Infinity;
        
        const aR = (2 / sqrt6) * dx;
        const aG = (-1 / sqrt6) * dx + (1 / sqrt2) * dy;
        const aB = (-1 / sqrt6) * dx - (1 / sqrt2) * dy;
        
        for (const a_k of [aR, aG, aB]) {
            if (a_k !== 0) {
                const u_k = (1 + Math.sign(a_k)) / 2;
                const limit = (u_k - Z_val / sqrt3) / a_k;
                t_max = Math.min(t_max, Math.max(0, limit));
            }
        }
        
        return isFinite(t_max) ? t_max : 0;
    }
    
    const C_max_Z = dirCmax(Z, dx, dy);
    const C_max_Z2 = dirCmax(Z2, dx, dy);
    
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
    
    const R2 = (2*X2/sqrt6 + Z2/sqrt3);
    const G2 = (-X2/sqrt6 + Y2/sqrt2 + Z2/sqrt3);
    const B2 = (-X2/sqrt6 - Y2/sqrt2 + Z2/sqrt3);
    
    const aR = (2 / sqrt6) * dx;
    const aG = (-1 / sqrt6) * dx + (1 / sqrt2) * dy;
    const aB = (-1 / sqrt6) * dx - (1 / sqrt2) * dy;
    
    const uR = (1 + Math.sign(aR)) / 2;
    const uG = (1 + Math.sign(aG)) / 2;
    const uB = (1 + Math.sign(aB)) / 2;
    
    // Return the converted RGB values and intermediate calculations
    return {
        rgb: [
            R2, G2, B2
        ],
        calculations: {
            input: [R, G, B],
            xyz: [X, Y, Z],
            xyz2: [X2, Y2, Z2],
            rgb2: [R2, G2, B2],
            other: {
                C, dx, dy, aR, aG, aB, uR, uG, uB, C_max_Z, C_max_Z2, S, C2
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
