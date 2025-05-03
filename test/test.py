#!/usr/bin/python3
import math
import os

def convert_pixel(rgb):
    R, G, B = rgb
    sqrt6 = math.sqrt(6)
    sqrt3 = math.sqrt(3)
    sqrt2 = math.sqrt(2)
    
    X = (2 * R - G - B) / sqrt6
    Y = (G - B) / sqrt2
    Z = (R + G + B) / sqrt3
    
    Z2 = sqrt3 - Z
    C = math.hypot(X, Y)
    if C != 0:
        dx = X / C
        dy = Y / C
    else:
        dx = 0
        dy = 0

    def dirCmax(_val, dx, dy):
        t_max = float('inf')
        for a_k in [ (2/ sqrt6)*dx, (-1/ sqrt6)*dx + (1/ sqrt2)*dy, (-1/ sqrt6)*dx - (1/ sqrt2)*dy ]:
            if a_k != 0:
                u_k = 1 if a_k > 0 else 0
                limit = (u_k - _val / sqrt3) / a_k
                new_t = max(0, limit)
                t_max = min(t_max, new_t)
        return t_max if t_max != float('inf') else 0

    C_max_Z = dirCmax(Z, dx, dy)
    C_max_Z2 = dirCmax(Z2, dx, dy)
    
    S = (C / C_max_Z) if (C != 0 and C_max_Z != 0) else 0
    C2 = S * C_max_Z2

    if C != 0:
        X2 = (C2 / C) * X
        Y2 = (C2 / C) * Y
    else:
        X2 = 0
        Y2 = 0

    R2 = (2 * X2 / sqrt6 + Z2 / sqrt3)
    G2 = (-X2 / sqrt6 + Y2 / sqrt2 + Z2 / sqrt3)
    B2 = (-X2 / sqrt6 - Y2 / sqrt2 + Z2 / sqrt3)
    
    return {"input": [R, G, B], "xyz": [X, Y, Z], "xyz2": [X2, Y2, Z2], "rgb2": [R2, G2, B2]}

def fmt_vec(v):
    return "(" + ", ".join(f"{x:+.3f}" for x in v) + ")"

# Define the test cases and label mapping as in test.js
test_cases = {
    "Black": [0.0, 0.0, 0.0],
    "Red": [1.0, 0.0, 0.0],
    "Green": [0.0, 1.0, 0.0],
    "Blue": [0.0, 0.0, 1.0],
    "Cyan": [0.0, 1.0, 1.0],
    "Magenta": [1.0, 0.0, 1.0],
    "Yellow": [1.0, 1.0, 0.0],
    "White": [1.0, 1.0, 1.0]
}

label_map = {
    "Black": "K",
    "White": "W",
    "Red": "R",
    "Green": "G",
    "Blue": "B",
    "Cyan": "C",
    "Magenta": "M",
    "Yellow": "Y"
}

desired_order = ["Black", "Red", "Green", "Blue", "Cyan", "Magenta", "Yellow", "White"]

output_lines = []
output_lines.append("| Color | (R, G, B) Input | (X, Y, Z) | (X', Y', Z') | (R', G', B') |")
output_lines.append("|:-----:|:---------------:|:---------:|:------------:|:------------:|")

for name in desired_order:
    rgb = test_cases[name]
    label = label_map.get(name, name)
    result1 = convert_pixel(rgb)
    result2 = convert_pixel(result1["rgb2"])
    row1 = f"| {label} | {fmt_vec(rgb)} | {fmt_vec(result1['xyz'])} | {fmt_vec(result1['xyz2'])} | {fmt_vec(result1['rgb2'])} |"
    row2 = f"| {label}'| {fmt_vec(result1['rgb2'])} | {fmt_vec(result2['xyz'])} | {fmt_vec(result2['xyz2'])} | {fmt_vec(result2['rgb2'])} |"
    output_lines.append(row1)
    output_lines.append(row2)

result_md = "\n".join(output_lines)

# Write the results to "result.md" in the same directory as this script.
with open("result-python.md", "w") as f:
    f.write(result_md)

print("Test results written to result-python.md")
