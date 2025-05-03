# darkmode

my darkmode conversion (program by Devin)

## conversion specification

version 1.0.1

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
Z' = \sqrt3 - Z.
\]

\[
\text{For direction }\hat{\mathbf c}=(d_x,d_y),\quad
C_{\max}(Z,\hat{\mathbf c})=\min_{k\in\{R,G,B\}}
\frac{\bigl[u_k-(Z/\sqrt3)\bigr]_+}{a_k},
\]
where  
\[
\begin{aligned}
&u_R,u_G,u_B\in\{0,1\} \text{ are the RGB bounds,} \quad [x]_+=\max(0,x),\\
&(a_R,a_G,a_B)=\bigl(\tfrac{2}{\sqrt6}d_x,\,
                     -\tfrac{1}{\sqrt6}d_x+\tfrac{1}{\sqrt2}d_y,\,
                     -\tfrac{1}{\sqrt6}d_x-\tfrac{1}{\sqrt2}d_y\bigr).
\end{aligned}
\]

Saturation:  
\[
S=\begin{cases}
0 & (C=0),\\[6pt]
\dfrac{C}{C_{\max}(Z,\hat{\mathbf c})} & (C\ne0).
\end{cases}
\]

New chroma:  
\[
C' = S \; C_{\max}(Z',\hat{\mathbf c}),\qquad
(X',Y')=\begin{cases}
(0,0) & (C=0),\\[6pt]
\dfrac{C'}{C}\,(X,Y) & (C\ne0).
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
    * output: array of \[R', G', B'], converted by version 1.0.1 (direction-dependent chroma limit)
* index.html
  * input image
  * output image (can be saved by right-clicking)
  * image loading button
    * loads a new image from file selection dialog onto the input image
  * convert button
    * converts the input image to the output image
  * no additional JavaScript libraries
* others (CSS and supporting files as needed)


