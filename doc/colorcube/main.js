document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('cubeCanvas');
  const ctx = canvas.getContext('2d');
  const slider = document.getElementById('zSlider');
  const displayZ = document.getElementById('zValue');

  // Set canvas dimensions
  canvas.width = 500;
  canvas.height = 500;
  
  const sqrt6 = Math.sqrt(6);
  const sqrt2 = Math.sqrt(2);
  const sqrt3 = Math.sqrt(3);
  
  // Transformation matrix T as specified
  const T = [
    [2 / sqrt6, -1 / sqrt6, -1 / sqrt6],
    [0, 1 / sqrt2, -1 / sqrt2],
    [1 / sqrt3, 1 / sqrt3, 1 / sqrt3]
  ];
  
  // Cube vertices for [R,G,B] each 0 or 1
  const vertices = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 1]
  ];
  
  // Cube edges defined by pairs of vertex indices
  const edges = [
    [0,1], [0,2], [0,4],
    [1,3], [1,5],
    [2,3], [2,6],
    [3,7],
    [4,5], [4,6],
    [5,7],
    [6,7]
  ];
  
  // Transform a vertex from RGB to XYZ using T and scaling factor 1/sqrt3
  function transform(v) {
    const x = (T[0][0]*v[0] + T[0][1]*v[1] + T[0][2]*v[2]) / sqrt3;
    const y = (T[1][0]*v[0] + T[1][1]*v[1] + T[1][2]*v[2]) / sqrt3;
    const z = (T[2][0]*v[0] + T[2][1]*v[1] + T[2][2]*v[2]) / sqrt3;
    return [x, y, z];
  }
  
  // Precompute transformed vertices
  const transformedVertices = vertices.map(v => transform(v));
  
  // Find intersection points between cube edges and the plane z = targetZ.
  // Returns array of points [x, y]
  function computeIntersections(targetZ) {
    const points = [];
    edges.forEach(edge => {
      const v1 = transformedVertices[edge[0]];
      const v2 = transformedVertices[edge[1]];
      // Check if the edge crosses the plane z = targetZ.
      if ((v1[2] - targetZ) * (v2[2] - targetZ) < 0) {
        // Linear interpolation parameter t
        const t = (targetZ - v1[2]) / (v2[2] - v1[2]);
        // Interpolate x and y
        const x = v1[0] + t * (v2[0] - v1[0]);
        const y = v1[1] + t * (v2[1] - v1[1]);
        points.push([x, y]);
      }
    });
    return points;
  }
  
  // Sort points counterclockwise around their centroid
  function sortPoints(points) {
    if (points.length === 0) return points;
    let centroid = points.reduce((acc, point) => [acc[0] + point[0], acc[1] + point[1]], [0,0]);
    centroid = [centroid[0] / points.length, centroid[1] / points.length];
    return points.sort((a, b) => {
      const angleA = Math.atan2(a[1] - centroid[1], a[0] - centroid[0]);
      const angleB = Math.atan2(b[1] - centroid[1], b[0] - centroid[0]);
      return angleA - angleB;
    });
  }
  
  // Map logical coordinates to canvas coordinates
  function mapToCanvas(x, y) {
    // Scale and translate such that center of canvas represents (0,0)
    const scale = 200;
    const canvasX = canvas.width / 2 + x * scale;
    const canvasY = canvas.height / 2 - y * scale;
    return [canvasX, canvasY];
  }
  
  // Draw the intersection polygon on canvas
  function drawIntersection() {
    const sliderValue = parseFloat(slider.value);
    const targetZBlack = sliderValue;
    const targetZBlue = 1 - sliderValue;
    displayZ.textContent = `Z: ${targetZBlack.toFixed(2)}, 1-Z: ${targetZBlue.toFixed(2)}`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    // Draw black intersection (computed with Z = slider value)
    const intersectionsBlack = computeIntersections(targetZBlack);
    if (intersectionsBlack.length >= 3) {
      const sortedBlack = sortPoints(intersectionsBlack);
      ctx.beginPath();
      const [startX, startY] = mapToCanvas(sortedBlack[0][0], sortedBlack[0][1]);
      ctx.moveTo(startX, startY);
      sortedBlack.forEach(point => {
        const [x, y] = mapToCanvas(point[0], point[1]);
        ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    // Draw blue intersection (computed with 1 - slider value)
    const intersectionsBlue = computeIntersections(targetZBlue);
    if (intersectionsBlue.length >= 3) {
      const sortedBlue = sortPoints(intersectionsBlue);
      ctx.beginPath();
      const [startX, startY] = mapToCanvas(sortedBlue[0][0], sortedBlue[0][1]);
      ctx.moveTo(startX, startY);
      sortedBlue.forEach(point => {
        const [x, y] = mapToCanvas(point[0], point[1]);
        ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    drawOverlayVectors();
  }
  
  // Initial drawing
  drawIntersection();
  
  // Redraw when slider value changes
  slider.addEventListener('input', drawIntersection);
  
  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    for (let x = -1; x <= 1.0001; x += 0.1) {
      let p1 = mapToCanvas(x, -1);
      let p2 = mapToCanvas(x, 1);
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();
    }
    for (let y = -1; y <= 1.0001; y += 0.1) {
      let p1 = mapToCanvas(-1, y);
      let p2 = mapToCanvas(1, y);
      ctx.beginPath();
      ctx.moveTo(p1[0], p1[1]);
      ctx.lineTo(p2[0], p2[1]);
      ctx.stroke();
    }
    ctx.restore();
  }
  
  function drawOverlayVectors() {
    const origin = mapToCanvas(0, 0);
    const vectors = [
      {vec: [1,0,0], label: 'R', color: 'red'},
      {vec: [0,1,0], label: 'G', color: 'green'},
      {vec: [0,0,1], label: 'B', color: 'blue'},
      {vec: [0,1,1], label: 'C', color: 'cyan'},
      {vec: [1,0,1], label: 'M', color: 'magenta'},
      {vec: [1,1,0], label: 'Y', color: 'yellow'},
    ];
    vectors.forEach(item => {
      const transformed = transform(item.vec);
      const endPoint = mapToCanvas(transformed[0], transformed[1]);
      ctx.save();
      ctx.strokeStyle = item.color;
      ctx.fillStyle = item.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(origin[0], origin[1]);
      ctx.lineTo(endPoint[0], endPoint[1]);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(endPoint[0], endPoint[1], 3, 0, 2*Math.PI);
      ctx.fill();
      ctx.font = "16px Arial";
      ctx.fillText(item.label, endPoint[0] + 5, endPoint[1] - 5);
      ctx.restore();
    });
  }
});
