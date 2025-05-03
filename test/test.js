
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

const testCases = [
    {
        name: "K (Black)",
        rgb: [0.000, 0.000, 0.000],
        xyz: [0.000, 0.000, 0.000],
        xyz_prime: [0.000, 0.000, 1.732],
        rgb_prime: [1.000, 1.000, 1.000]
    },
    {
        name: "R (Red)",
        rgb: [1.000, 0.000, 0.000],
        xyz: [0.816, 0.000, 0.577],
        xyz_prime: [0.816, 0.000, 1.155],
        rgb_prime: [1.000, 0.333, 0.333]
    },
    {
        name: "G (Green)",
        rgb: [0.000, 1.000, 0.000],
        xyz: [-0.408, 0.707, 0.577],
        xyz_prime: [-0.408, 0.707, 1.155],
        rgb_prime: [0.333, 1.000, 0.333]
    },
    {
        name: "B (Blue)",
        rgb: [0.000, 0.000, 1.000],
        xyz: [-0.408, -0.707, 0.577],
        xyz_prime: [-0.408, -0.707, 1.155],
        rgb_prime: [0.333, 0.333, 1.000]
    },
    {
        name: "C (Cyan)",
        rgb: [0.000, 1.000, 1.000],
        xyz: [-0.816, 0.000, 1.155],
        xyz_prime: [-0.408, 0.000, 0.577],
        rgb_prime: [0.333, 0.667, 0.667]
    },
    {
        name: "M (Magenta)",
        rgb: [1.000, 0.000, 1.000],
        xyz: [0.408, -0.707, 1.155],
        xyz_prime: [0.204, -0.354, 0.577],
        rgb_prime: [0.667, 0.333, 0.667]
    },
    {
        name: "Y (Yellow)",
        rgb: [1.000, 1.000, 0.000],
        xyz: [0.408, 0.707, 1.155],
        xyz_prime: [0.204, 0.354, 0.577],
        rgb_prime: [0.667, 0.667, 0.333]
    },
    {
        name: "W (White)",
        rgb: [1.000, 1.000, 1.000],
        xyz: [0.000, 0.000, 1.732],
        xyz_prime: [0.000, 0.000, 0.000],
        rgb_prime: [0.000, 0.000, 0.000]
    }
];

let passedTests = 0;
let failedTests = 0;

console.log("Testing convert_pixel function...");
console.log("=================================\n");

testCases.forEach(test => {
    const result = convert_pixel(test.rgb);
    const passed = arraysApproxEqual(result, test.rgb_prime);
    
    console.log(`Test case: ${test.name}`);
    console.log(`Input: (${test.rgb.map(v => v.toFixed(3)).join(', ')})`);
    console.log(`Expected output: (${test.rgb_prime.map(v => v.toFixed(3)).join(', ')})`);
    console.log(`Actual output: (${result.map(v => v.toFixed(3)).join(', ')})`);
    
    if (passed) {
        console.log("PASS ✓");
        passedTests++;
    } else {
        console.log("FAIL ✗");
        failedTests++;
    }
    console.log("----------");
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
