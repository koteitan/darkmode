# colorcube

## specification
- index.html
  - canvas
    - to draw the intersection of the color cube by the plane z=Z
    - the original color cube is rotated as follows:
```python
    T = np.array([
        [2 / np.sqrt(6), -1 / np.sqrt(6), -1 / np.sqrt(6)],
        [0, 1 / np.sqrt(2), -1 / np.sqrt(2)],
        [1 / np.sqrt(3), 1 / np.sqrt(3), 1 / np.sqrt(3)]
    ])
    RGB = np.array([R, G, B]) # 0<=R,G,B<=1
    XYZ = (1 / np.sqrt(3)) * (T @ RGB)
    X, Y, Z = XYZ
```
    - the intersection is drawn by solid lines (black)
    - the intersection will be triangle or hexagon
  - slider
    - to change height of the intersection plane (0-sqrt(3))
  - there is no javascript on html
- main.js
  - main code to draw the canvas of index.html
- style.css
  - style for index.html
