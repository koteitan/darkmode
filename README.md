# darkmode

my darkmode conversion (program by Devin)

## conversion specification

version 1.0.4

### Transformation

$$
\begin{aligned}
T &=
\begin{pmatrix}
\dfrac{2}{\sqrt{6}} & -\dfrac{1}{\sqrt{6}} & -\dfrac{1}{\sqrt{6}} \\
0 & \dfrac{1}{\sqrt{2}} & -\dfrac{1}{\sqrt{2}} \\
\dfrac{1}{\sqrt{3}} & \dfrac{1}{\sqrt{3}} & \dfrac{1}{\sqrt{3}}
\end{pmatrix}, \\
\begin{pmatrix} X \\ Y \\ Z \end{pmatrix} &= \dfrac{1}{\sqrt{3}}\, T \begin{pmatrix} R \\ G \\ B \end{pmatrix}, \\
T^{-1} &=
\begin{pmatrix}
\dfrac{2}{\sqrt{6}} & 0 & \dfrac{1}{\sqrt{3}} \\
-\dfrac{1}{\sqrt{6}} & \dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{3}} \\
-\dfrac{1}{\sqrt{6}} & -\dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{3}}
\end{pmatrix}
\end{aligned}
$$

### Maximum Chroma

$$
\begin{aligned}
dx &= \frac{X}{\sqrt{X^2+Y^2}},\\[6pt]
dy &= \frac{Y}{\sqrt{X^2+Y^2}}\\
a_R &= \frac{2}{\sqrt{6}}\,dx,\\[6pt]
a_G &= -\frac{1}{\sqrt{6}}\,dx+\frac{1}{\sqrt{2}}\,dy,\\[6pt]
a_B &= -\frac{1}{\sqrt{6}}\,dx-\frac{1}{\sqrt{2}}\,dy,\\
u_k &= \frac{1+\operatorname{sign}(a_k)}{2},\\
\operatorname{Cmax}(Z_{\text{val}},\, dx,\, dy)&= \min_{k \in \{R,G,B\}} \left\{ \max\left\{0,\; \frac{\frac{1+\operatorname{sign}(a_k)}{2} - \frac{Z_{\text{val}}}{\sqrt{3}}}{a_k} \right\} \right\}.
\end{aligned}
$$

### Dark mode conversion

$$
\begin{aligned}
Z2 &= \sqrt{3} - Z,\\
C &= \sqrt{X^2+Y^2},\\
C2 &= \frac{C\, C_{\max Z2}}{C_{\max Z}},\\
X' &= \frac{C2}{C}\,X,\\
Y' &= \frac{C2}{C}\,Y,\\
Z' &= Z2.
\end{aligned}
$$

### Inverse Transformation

$$
\begin{aligned}
\begin{pmatrix} R' \\ G' \\ B' \end{pmatrix} &= T^{-1} \begin{pmatrix} X' \\ Y' \\ Z' \end{pmatrix}
\end{aligned}
$$

## test site specification

* main.js

  * **convert** function: converts the entire input image to an output image using the **convert_pixel** function.
  * **convert_pixel** function: converts R,G,B to R2,G2,B2  
    * input: array of [R, G, B] (0 ≤ R,G,B ≤ 1)  
    * output: array of [R2, G2, B2], converted by version 1.0.4 (direction-dependent chroma limit)

* index.html

  * input image  
  * output image (can be saved by right-clicking)  
  * image loading button  
    * loads a new image from file selection dialog onto the input image  
  * convert button  
    * converts the input image to the output image  
  * no additional JavaScript libraries

* others (CSS and supporting files as needed)
