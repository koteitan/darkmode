
const { convert_pixel } = require('../main.js');

const EPSILON = 1e-3;

function approxEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}

function arraysApproxEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (!approxEqual(arr1[i], arr2[i])) {
            return false;
        }
    }
    return true;
}

function checkCalculation(actual, expected, name) {
    const matches = arraysApproxEqual(actual, expected);
    return {
        matches,
        actual: actual.map(v => v.toFixed(3)).join(', '),
        expected: expected.map(v => v.toFixed(3)).join(', '),
        name
    };
}

const testCases = [
    {
        name: "K (Black)",
        rgb: [0.000, 0.000, 0.000],
        xyz: [0.000, 0.000, 0.000],
        xyz2: [0.000, 0.000, 1.732],
        rgb2: [1.000, 1.000, 1.000]
    },
    {
        name: "R (Red)",
        rgb: [1.000, 0.000, 0.000],
        xyz: [0.816, 0.000, 0.577],
        xyz2: [0.816, 0.000, 1.155],
        rgb2: [1.000, 0.333, 0.333]
    },
    {
        name: "G (Green)",
        rgb: [0.000, 1.000, 0.000],
        xyz: [-0.408, 0.707, 0.577],
        xyz2: [-0.408, 0.707, 1.155],
        rgb2: [0.333, 1.000, 0.333]
    },
    {
        name: "B (Blue)",
        rgb: [0.000, 0.000, 1.000],
        xyz: [-0.408, -0.707, 0.577],
        xyz2: [-0.408, -0.707, 1.155],
        rgb2: [0.333, 0.333, 1.000]
    },
    {
        name: "C (Cyan)",
        rgb: [0.000, 1.000, 1.000],
        xyz: [-0.816, 0.000, 1.155],
        xyz2: [-0.408, 0.000, 0.577],
        rgb2: [0.333, 0.667, 0.667]
    },
    {
        name: "M (Magenta)",
        rgb: [1.000, 0.000, 1.000],
        xyz: [0.408, -0.707, 1.155],
        xyz2: [0.204, -0.354, 0.577],
        rgb2: [0.667, 0.333, 0.667]
    },
    {
        name: "Y (Yellow)",
        rgb: [1.000, 1.000, 0.000],
        xyz: [0.408, 0.707, 1.155],
        xyz2: [0.204, 0.354, 0.577],
        rgb2: [0.667, 0.667, 0.333]
    },
    {
        name: "W (White)",
        rgb: [1.000, 1.000, 1.000],
        xyz: [0.000, 0.000, 1.732],
        xyz2: [0.000, 0.000, 0.000],
        rgb2: [0.000, 0.000, 0.000]
    }
];

let passedTests = 0;
let failedTests = 0;

console.log("Testing convert_pixel function with intermediate calculations...");
console.log("==============================================================\n");

testCases.forEach(test => {
    const result = convert_pixel(test.rgb);
    
    const rgbCheck = checkCalculation(result.rgb, test.rgb2, "RGB");
    const xyzCheck = checkCalculation(result.calculations.xyz, test.xyz, "XYZ");
    const xyz2Check = checkCalculation(result.calculations.xyz2, test.xyz2, "XYZ2");
    const rgb2Check = checkCalculation(result.calculations.rgb2, test.rgb2, "RGB2 (unclipped)");
    
    const allPassed = rgbCheck.matches && xyzCheck.matches && xyz2Check.matches && rgb2Check.matches;
    
    console.log(`\nTest case: ${test.name}`);
    console.log(`Input: (${test.rgb.map(v => v.toFixed(3)).join(', ')})`);
    
    console.log("\nIntermediate Calculations:");
    
    console.log(`XYZ:  Expected (${xyzCheck.expected}), Actual (${xyzCheck.actual}) - ${xyzCheck.matches ? "MATCH ✓" : "MISMATCH ✗"}`);
    console.log(`XYZ2: Expected (${xyz2Check.expected}), Actual (${xyz2Check.actual}) - ${xyz2Check.matches ? "MATCH ✓" : "MISMATCH ✗"}`);
    console.log(`RGB2: Expected (${rgb2Check.expected}), Actual (${rgb2Check.actual}) - ${rgb2Check.matches ? "MATCH ✓" : "MISMATCH ✗"}`);
    
    console.log("\nOther values:");
    console.log(`C: ${result.calculations.other.C.toFixed(3)}`);
    console.log(`C_max_Z: ${result.calculations.other.C_max_Z.toFixed(3)}`);
    console.log(`C_max_Z2: ${result.calculations.other.C_max_Z2.toFixed(3)}`);
    console.log(`S: ${result.calculations.other.S.toFixed(3)}`);
    console.log(`C2: ${result.calculations.other.C2.toFixed(3)}`);
    
    console.log(`\nFinal RGB: Expected (${rgbCheck.expected}), Actual (${rgbCheck.actual})`);
    
    if (allPassed) {
        console.log("PASS ✓ - All calculations match expected values");
        passedTests++;
    } else {
        console.log("FAIL ✗ - Some calculations don't match expected values");
        failedTests++;
    }
    console.log("==========================================================");
});

console.log("\nTest summary:");
console.log(`${passedTests} tests passed, ${failedTests} tests failed`);
console.log(`Success rate: ${Math.round(passedTests / testCases.length * 100)}%`);

if (failedTests > 0) {
    process.exit(1);
} else {
    console.log("All tests passed!");
    process.exit(0);
}
