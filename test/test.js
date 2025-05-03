const fs = require('fs');
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
        name: "Black",
        rgb: [0.000, 0.000, 0.000],
        xyz: [0.000, 0.000, 0.000],
        xyz2: [0.000, 0.000, 1.000],
        rgb2: [1.000, 1.000, 1.000]
    },
    {
        name: "White",
        rgb: [1.000, 1.000, 1.000],
        xyz: [0.000, 0.000, 1.000],
        xyz2: [0.000, 0.000, 0.000],
        rgb2: [0.000, 0.000, 0.000]
    },
    {
        name: "Red",
        rgb: [1.000, 0.000, 0.000],
        xyz: [0.577, 0.000, 0.577],
        xyz2: [0.577, 0.000, 0.423],
        rgb2: [1.000, 0.423, 0.423]
    },
    {
        name: "Green",
        rgb: [0.000, 1.000, 0.000],
        xyz: [-0.289, 0.500, 0.577],
        xyz2: [-0.289, 0.500, 0.423],
        rgb2: [0.423, 1.000, 0.423]
    },
    {
        name: "Blue",
        rgb: [0.000, 0.000, 1.000],
        xyz: [-0.289, -0.500, 0.577],
        xyz2: [-0.289, -0.500, 0.423],
        rgb2: [0.423, 0.423, 1.000]
    },
    {
        name: "Cyan",
        rgb: [0.000, 1.000, 1.000],
        xyz: [-0.577, 0.000, 0.577],
        xyz2: [-0.577, 0.000, 0.423],
        rgb2: [0.000, 1.000, 1.000]
    },
    {
        name: "Magenta",
        rgb: [1.000, 0.000, 1.000],
        xyz: [0.289, -0.500, 0.577],
        xyz2: [0.289, -0.500, 0.423],
        rgb2: [1.000, 0.000, 1.000]
    },
    {
        name: "Yellow",
        rgb: [1.000, 1.000, 0.000],
        xyz: [0.289, 0.500, 0.577],
        xyz2: [0.289, 0.500, 0.423],
        rgb2: [1.000, 1.000, 0.000]
    }
];

// Mapping for test case names to table labels
const labelMap = {
    "Black": "K",
    "White": "W",
    "Red": "R",
    "Green": "G",
    "Blue": "B",
    "Cyan": "C",
    "Magenta": "M",
    "Yellow": "Y"
};

function formatVector(vec) {
    return `(${vec.map(v => {
        const sign = v >= 0 ? '+' : '-';
        const absVal = Math.abs(v).toFixed(3);
        return `${sign}${absVal}`;
    }).join(', ')})`;
}

let resultMd = "| Color | (R, G, B) Input | (X, Y, Z) | (X', Y', Z') | (R', G', B') |\n";
resultMd += "|:-----:|:---------------:|:---------:|:------------:|:------------:|\n";

const desiredOrder = ["Black", "Red", "Green", "Blue", "Cyan", "Magenta", "Yellow", "White"];
desiredOrder.forEach(name => {
    const test = testCases.find(test => test.name === name);
    const label = labelMap[test.name] || test.name;
    const result1 = convert_pixel(test.rgb);
    const result2 = convert_pixel(result1.rgb);
    
    // First conversion row
    const row1 = `| ${label} | ${formatVector(test.rgb)} | ${formatVector(result1.calculations.xyz)} | ${formatVector(result1.calculations.xyz2)} | ${formatVector(result1.rgb)} |`;
    // Second conversion row with prime symbol
    const row2 = `| ${label}' | ${formatVector(result1.rgb)} | ${formatVector(result2.calculations.xyz)} | ${formatVector(result2.calculations.xyz2)} | ${formatVector(result2.rgb)} |`;
    
    resultMd += row1 + "\n" + row2 + "\n";
});

fs.writeFileSync('test/result.md', resultMd);

console.log("Test results written to test/result.md");
process.exit(0);
