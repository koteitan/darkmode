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
\begin{pmatrix} X \\ Y \\ Z \end{pmatrix} &= \dfrac{1}{\sqrt{3}} T \begin{pmatrix} R \\ G \\ B \end{pmatrix}, \\
T^{-1} &=
\begin{pmatrix}
\dfrac{2}{\sqrt{6}} & 0 & \dfrac{1}{\sqrt{3}} \\
-\dfrac{1}{\sqrt{6}} & \dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{3}} \\
-\dfrac{1}{\sqrt{6}} & -\dfrac{1}{\sqrt{2}} & \dfrac{1}{\sqrt{3}}
\end{pmatrix}
\end{aligned}
$$

### Dark mode conversion

$$
\begin{aligned}
\begin{pmatrix} X' \\ Y' \\ Z' \end{pmatrix} &=
\begin{pmatrix}
\dfrac{1 - Z}{Z} X \\
\dfrac{1 - Z}{Z} Y \\
1 - Z
\end{pmatrix}
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

  * 'convert' function: converts the entire input image to an output image using the 'convert\_pixel' function.
  * 'convert\_pixel' function: converts R,G,B to R2,G2,B2

    * input: array of \[R, G, B] (0 <= R, G, B <= 1)
    * output: array of \[R2, G2, B2], converted by version 1.0.4 (direction-dependent chroma limit)

* index.html

  * input image
  * output image (can be saved by right-clicking)
  * image loading button

    * loads a new image from file selection dialog onto the input image
  * convert button

    * converts the input image to the output image
  * no additional JavaScript libraries

* others (CSS and supporting files as needed)
