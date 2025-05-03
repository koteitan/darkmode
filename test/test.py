import numpy as np

def convert_pixel(rgb):
    R, G, B = rgb

    # Define transformation matrices
    T = np.array([
        [2 / np.sqrt(6), -1 / np.sqrt(6), -1 / np.sqrt(6)],
        [0, 1 / np.sqrt(2), -1 / np.sqrt(2)],
        [1 / np.sqrt(3), 1 / np.sqrt(3), 1 / np.sqrt(3)]
    ])

    T_inv = np.array([
        [2 / np.sqrt(6), 0, 1 / np.sqrt(3)],
        [-1 / np.sqrt(6), 1 / np.sqrt(2), 1 / np.sqrt(3)],
        [-1 / np.sqrt(6), -1 / np.sqrt(2), 1 / np.sqrt(3)]
    ])

    # Forward transformation
    RGB = np.array([R, G, B])
    XYZ = (1 / np.sqrt(3)) * (T @ RGB)
    X, Y, Z = XYZ

    # Dark mode conversion
    if Z == 0:
        scale = 0
    else:
        scale = (1 - Z) / Z * (1/4)

    Xp = scale * X
    Yp = scale * Y
    Zp = 1 - Z
    XYZ_p = np.array([Xp, Yp, Zp])

    # Inverse transformation
    RGB_p = np.sqrt(3) * (T_inv @ XYZ_p)

    return [R, G, B], [X, Y, Z], [Xp, Yp, Zp], list(RGB_p)

def fmt_vec(v):
    return "(" + ", ".join(f"{x:+.3f}" for x in v) + ")"

test_colors = [
    ('K', [0.0, 0.0, 0.0]),
    ('R', [1.0, 0.0, 0.0]),
    ('G', [0.0, 1.0, 0.0]),
    ('B', [0.0, 0.0, 1.0]),
    ('C', [0.0, 1.0, 1.0]),
    ('M', [1.0, 0.0, 1.0]),
    ('Y', [1.0, 1.0, 0.0]),
    ('W', [1.0, 1.0, 1.0]),
]

print("| Color | (R, G, B) Input | (X, Y, Z) | (X', Y', Z') | (R', G', B') |")
print("|:-----:|:---------------:|:---------:|:------------:|:------------:|")

for name, rgb in test_colors:
    input_rgb_v, xyz_v, xyz_prime_v, output_rgb_v = convert_pixel(rgb)
    print(f"| {name} | {fmt_vec(input_rgb_v)} | {fmt_vec(xyz_v)} | {fmt_vec(xyz_prime_v)} | {fmt_vec(output_rgb_v)} |")

    # Reconvert
    input_rgb_v, xyz_v, xyz_prime_v, output_rgb_v = convert_pixel(output_rgb_v)
    print(f"| {name}'| {fmt_vec(input_rgb_v)} | {fmt_vec(xyz_v)} | {fmt_vec(xyz_prime_v)} | {fmt_vec(output_rgb_v)} |")

