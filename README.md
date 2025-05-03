# darkmode
my darkmode conversion (program by Devin)

## conversion specification
version 1.0.0
### Normalized orthogonal basis
\[
\begin{aligned}
\mathbf{e}_x &= \dfrac{1}{\sqrt{6}} (2,\,-1,\,-1), \\[24pt]
\mathbf{e}_y &= \dfrac{1}{\sqrt{2}} (0,\,1,\,-1), \\[24pt]
\mathbf{e}_z &= \dfrac{1}{\sqrt{3}} (1,\,1,\,1),
\end{aligned}
\]
where \(\mathbf{e}_x, \mathbf{e}_y, \mathbf{e}_z\) are orthonormal and span the RGB space.

### Transformation
\[
\begin{pmatrix}
X \\ Y \\ Z
\end{pmatrix}
=
\begin{pmatrix}
\dfrac{2}{\sqrt{6}} & -\dfrac{1}{\sqrt{6}} & -\dfrac{1}{\sqrt{6}} \\[24pt]
0 & \dfrac{1}{\sqrt{2}} & -\dfrac{1}{\sqrt{2}} \\[24pt]
\dfrac{1}{\sqrt{3}} & \dfrac{1}{\sqrt{3}} & \dfrac{1}{\sqrt{3}}
\end{pmatrix}
\begin{pmatrix}
R \\ G \\ B
\end{pmatrix}
\]

### Dark mode conversion
\[
\begin{aligned}
Z' &= \sqrt{3} - Z \\[24pt]
C &= \sqrt{X^2 + Y^2} \\[24pt]
C_{\max}(Z) &= \sqrt{2} \cdot \min\bigl(Z, \sqrt{3} - Z\bigr) \\[24pt]
C_{\max}(Z') &= \sqrt{2} \cdot \min\bigl(Z', \sqrt{3} - Z'\bigr) \\[24pt]
S &= \begin{cases}
0 & (C = 0) \\[24pt]
\dfrac{C}{C_{\max}(Z)} & (C \neq 0)
\end{cases} \\[24pt]
C' &= S \cdot C_{\max}(Z') \\[24pt]
(X', Y') &= \begin{cases}
(0, 0) & (C = 0) \\[24pt]
\dfrac{C'}{C} (X, Y) & (C \neq 0)
\end{cases}
\end{aligned}
\]

### Inverse transformation
\[
\begin{pmatrix}
R' \\ G' \\ B'
\end{pmatrix}
=
\begin{pmatrix}
\dfrac{2}{\sqrt{6}} & 0 & \dfrac{1}{\sqrt{3}} \\[24pt]
-\dfrac{1}{\sqrt{6}} & \dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{3}} \\[24pt]
-\dfrac{1}{\sqrt{6}} & -\dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{3}}
\end{pmatrix}
\begin{pmatrix}
X' \\ Y' \\ Z'
\end{pmatrix}
\]

## test site specification
- main.js
  - 'convert' function to convert whole input image to output image using 'convert_pixel' function.
  - 'convert_pixel' function to convert RGB to R'G'B'
    - input: array of [R,G,B] (0<=R,G,B<=1)
    - output: array of [R',G',B'], converted by version 1.0.0
- index.html
  - input image
  - output image (saved by right click)
  - image loading button
    - load new image from file selection dialog onto input image
  - convert button
    - convert input image to output image
  - no javascript
- others you need(css and so on)
