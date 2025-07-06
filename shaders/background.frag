#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec3 hsl2rgb(float h, float s, float l) {
    float c = (1.0 - abs(2.0 * l - 1.0)) * s;
    float x = c * (1.0 - abs(mod(h * 6.0, 2.0) - 1.0));
    float m = l - c * 0.5;
    vec3 rgb;
    if (h < 1.0/6.0) rgb = vec3(c, x, 0.0);
    else if (h < 2.0/6.0) rgb = vec3(x, c, 0.0);
    else if (h < 3.0/6.0) rgb = vec3(0.0, c, x);
    else if (h < 4.0/6.0) rgb = vec3(0.0, x, c);
    else if (h < 5.0/6.0) rgb = vec3(x, 0.0, c);
    else rgb = vec3(c, 0.0, x);
    return rgb + vec3(m);
}

vec3 getBaseColor(float t) {
    float hue = mix(0.62, 0.85, sin(t * 0.1) * 0.5 + 0.5); // purple range
    return hsl2rgb(hue, 0.5, 0.15); // dark
}

vec3 getAccentColor(float t) {
    float hue = mix(0.62, 0.85, cos(t * 0.1) * 0.5 + 0.5); // purple range
    return hsl2rgb(hue, 0.7, 0.35); // light accent
}

float blobPattern(vec2 p, float t, vec2 flowDir) {
    p += flowDir * smoothNoise(p + t * 0.5) * sin(t * 3.14159) * sin(cos((p * t) * 0.0025));
    float blob = sin(p.x * 1.0 - t * 1.5) * cos(p.y * -1.14 - t * 1.5);
    blob += smoothNoise(p * 6.0 + t * 0.7) * 0.4;
    blob = abs(blob);
    blob = pow(blob, sin(abs(sin(t)*0.5)*2.5) / 2.0);
    return blob;
}

vec3 colorize(float val, vec3 baseCol, vec3 accentCol) {
    return mix(baseCol, accentCol, val);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv -= 0.5;
    uv.x *= u_resolution.x / u_resolution.y;

    float t = mod(u_time * 0.20, 60.0);  // Looped time

    vec2 mouseNorm = u_mouse / u_resolution;
    vec2 mousePos = mouseNorm * 2.0 - 1.0;

    vec3 baseColor = getBaseColor(t);
    vec3 accentColor = getAccentColor(t);
    float blob = blobPattern(uv, t, mousePos);

    float v = clamp(blob, 0.0, 1.0);
    v = 1.0 - v;

    vec3 color = colorize(v, baseColor, accentColor);
    color = mix(vec3(0.03, 0.03, 0.05), color, v); // dark base blend

    gl_FragColor = vec4(color, 1.0);
}
