# darkmode

my darkmode conversion (program by Devin)

## conversion specification

version 1.0.2

### Normalized orthogonal basis

```tex
\[
T=
\begin{pmatrix}
\frac{2}{\sqrt6} &-\frac{1}{\sqrt6} &-\frac{1}{\sqrt6}\\[6pt]
0                & \frac{1}{\sqrt2} &-\frac{1}{\sqrt2}\\[6pt]
\frac{1}{\sqrt3} & \frac{1}{\sqrt3} & \frac{1}{\sqrt3}
\end{pmatrix},
\qquad
\mathbf e_x,\mathbf e_y,\mathbf e_z\ \text{are its row vectors.}
\]
```

### Transformation

```tex
\[
\begin{pmatrix}
X \\ Y \\ Z
\end{pmatrix}
=
T
\begin{pmatrix}
R \\ G \\ B
\end{pmatrix},
\qquad
C=\sqrt{X^{2}+Y^{2}},\quad
\hat{\mathbf c}=(X,Y)/C\ \text{ if }C\ne0.
\]
```

### Dark mode conversion

```tex
\[
Z' = \sqrt{3} - Z
\]

\[
C_{\max}(Z, \hat{\mathbf{c}})
=
\min_{k \in \{R, G, B\}}
\frac{\max(0, u_k - \tfrac{Z}{\sqrt{3}})}{a_k}
\quad\text{with}\quad
\hat{\mathbf{c}} = (d_x, d_y) = \frac{(X, Y)}{\sqrt{X^2 + Y^2}} \; (C \neq 0)
\]

where

\[
\begin{aligned}
&(a_R, a_G, a_B) =
\biggl(
\tfrac{2}{\sqrt{6}} d_x,\;
-\tfrac{1}{\sqrt{6}} d_x + \tfrac{1}{\sqrt{2}} d_y,\;
-\tfrac{1}{\sqrt{6}} d_x - \tfrac{1}{\sqrt{2}} d_y
\biggr),
\\[24pt]
&u_k = \dfrac{1 + \operatorname{sign}(a_k)}{2}
\quad (k \in \{R, G, B\}).
\end{aligned}
\]

Saturation:  

\[
S =
\begin{cases}
0 & (C = 0), \\
\dfrac{C}{C_{\max}(Z, \hat{\mathbf{c}})} & (C \neq 0)
\end{cases}
\qquad
C' = S \cdot C_{\max}(Z', \hat{\mathbf{c}})
\]

New chroma:  

\[
(X', Y') =
\begin{cases}
(0, 0) & (C = 0), \\
\dfrac{C'}{C} (X, Y) & (C \neq 0)
\end{cases}
\]
```

### Inverse transformation

```tex
\[
\begin{pmatrix}
R' \\ G' \\ B'
\end{pmatrix}
=
T^{\mathsf T}
\begin{pmatrix}
X' \\ Y' \\ Z'
\end{pmatrix},
\quad\text{ i.e. }\quad
\begin{cases}
R'=\dfrac{2}{\sqrt6}X' + \dfrac{1}{\sqrt3}Z',\\[6pt]
G'=-\dfrac{1}{\sqrt6}X' + \dfrac{1}{\sqrt2}Y' + \dfrac{1}{\sqrt3}Z',\\[6pt]
B'=-\dfrac{1}{\sqrt6}X' - \dfrac{1}{\sqrt2}Y' + \dfrac{1}{\sqrt3}Z'.
\end{cases}
\]
```

## test site specification

* main.js

  * 'convert' function: converts the entire input image to an output image using the 'convert\_pixel' function.
  * 'convert\_pixel' function: converts RGB to R'G'B'

    * input: array of \[R, G, B] (0 <= R, G, B <= 1)
    * output: array of \[R', G', B'], converted by version 1.0.2 (direction-dependent chroma limit)
* index.html

  * input image
  * output image (can be saved by right-clicking)
  * image loading button

    * loads a new image from file selection dialog onto the input image
  * convert button

    * converts the input image to the output image
  * no additional JavaScript libraries
* others (CSS and supporting files as needed)

