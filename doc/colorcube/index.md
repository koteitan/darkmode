# colorcube

## specification
- index.html
  - canvas
    - Draws the intersection of the color cube with a plane at z=Z.
    - The original color cube is rotated as follows:
      ```python
      T = np.array([
      [2 / np.sqrt(6), -1 / np.sqrt(6), -1 / np.sqrt(6)],
      [0, 1 / np.sqrt(2), -1 / np.sqrt(2)],
      [1 / np.sqrt(3), 1 / np.sqrt(3), 1 / np.sqrt(3)]
      ])
      RGB = np.array([R, G, B])  # 0<=R,G,B<=1
      XYZ = (1 / np.sqrt(3)) * (T @ RGB)
      X, Y, Z = XYZ
      ```
    - The intersection is drawn with solid black lines.
    - The intersection polygon will be either a triangle or a hexagon.
    - A gray grid with a spacing of 0.1 is drawn over the canvas within the coordinate range [-1, +1].
    - An overlay displays the vector diagrams for the standard colors: R, G, B, C, M, Y. These vectors are drawn from the origin after applying the same transformation.
    - The overlay also displays the corresponding labels ("R", "G", "B", "C", "M", "Y") at the positions of the vectors.
  - slider
    - Changes the height (z value) of the intersection plane (range 0 to 1).
  - there is no javascript on html
- main.js
  - Contains the main code to render the canvas, process the slider input, compute intersections,
    draw the grid, overlay the vector diagrams, and label the vectors.
- style.css
  - Contains the styles for index.html.
