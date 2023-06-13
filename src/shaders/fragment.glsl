uniform float uTime;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
	gl_FragColor = vec4(vUv,0.0, 1.0);
}