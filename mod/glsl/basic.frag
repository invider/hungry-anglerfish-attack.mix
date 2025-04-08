#version 300 es
precision highp float;

in vec2 vTextureCoord;

uniform vec2 lightPos2;
uniform vec2 lightRange;

uniform sampler2D uTextureSampler;

out vec4 fragColor;

void main(void) {
    //gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    //fragColor = texture(uTextureSampler, vTextureCoord);

    //float lightR1 = 100.0;
    //float lightR2 = 900.0;
    //vec4  lightPos = vec4(550.0, 400.0, 0.0, 0.0);
    vec4  lightPos = vec4(lightPos2.xy, 0.0, 0.0);
    float dist = length(lightPos.xyz - gl_FragCoord.xyz);

    float lightFactor = 1.0 - clamp((dist - lightRange[0])/(lightRange[1] - lightRange[0]), 0.0, 1.0);

    //fragColor = texture(uTextureSampler, vTextureCoord);
    fragColor = texture(uTextureSampler, vTextureCoord) * lightFactor;
}
