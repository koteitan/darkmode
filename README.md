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

### Maximum Transformation Factor

*Definition of \(dx\) and \(dy\):*

$$
\begin{aligned}
dx &= \frac{X}{\sqrt{X^2+Y^2}},\\[6pt]
dy &= \frac{Y}{\sqrt{X^2+Y^2}}.
\end{aligned}
$$

For each channel, define:

$$
\begin{aligned}
a_R &= \frac{2}{\sqrt{6}}\,dx,\\[6pt]
a_G &= -\frac{1}{\sqrt{6}}\,dx+\frac{1}{\sqrt{2}}\,dy,\\[6pt]
a_B &= -\frac{1}{\sqrt{6}}\,dx-\frac{1}{\sqrt{2}}\,dy,
\end{aligned}
$$

and

$$
\begin{aligned}
u_k &= \frac{1+\operatorname{sign}(a_k)}{2},\\[6pt]
\text{limit}_k &= \frac{u_k - \frac{Z_{\text{val}}}{\sqrt{3}}}{a_k}.
\end{aligned}
$$

Then, we define

$$
\operatorname{Cmax}(Z_{\text{val}},\, dx,\, dy)= \min\Biggl\{
\max\Bigl\{0,\; \frac{\frac{1+\operatorname{sign}(a_R)}{2} -\frac{Z_{\text{val}}}{\sqrt{3}}}{a_R}\Bigr\},\;
\max\Bigl\{0,\; \frac{\frac{1+\operatorname{sign}(a_G)}{2} -\frac{Z_{\text{val}}}{\sqrt{3}}}{a_G}\Bigr\},\;
\max\Bigl\{0,\; \frac{\frac{1+\operatorname{sign}(a_B)}{2} -\frac{Z_{\text{val}}}{\sqrt{3}}}{a_B}\Bigr\}
\Biggr\}.
$$

### Dark mode conversion

$$
\begin{aligned}
Z2 &= \sqrt{3} - Z,\\
C &= \sqrt{X^2+Y^2},\\
S &= \frac{C}{C_{\max Z}},\\
C2 &= S\cdot C_{\max Z2},\\
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

  * 'convert' function: converts the entire input image to an output image using the 'convert_pixel' function.
  * 'convert_pixel' function: converts R,G,B to R2,G2,B2

    * input: array of [R, G, B] (0 ≤ R, G, B ≤ 1)
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
