# BUILD A HIGH-MOTION INTERACTIVE WEBGL HERO

I want you to build a production-quality interactive hero section from scratch.

The hero is an interactive illustrated travel experience using THREE EXISTING IMAGES.

The experience should feel inspired by the interaction philosophy of:

https://justinesoulie.fr/about

IMPORTANT:

Do NOT copy the website's artwork, branding, layout, assets, text, source code, or exact implementation.

I want an original implementation that captures the same general feeling of:

- interactive illustration
- discovery
- curiosity
- motion
- cursor-driven interaction
- visual transformation
- playful exploration

My three images are already created and must be used as the artwork.

============================================================
# 1. THE THREE IMAGES
============================================================

I have three finished illustrations.

IMAGE 1:
Mumbai / city walking scene.

IMAGE 2:
Mountain / trekking scene.

IMAGE 3:
Third travel / world-exploration scene.

The same girl appears in all three images.

IMPORTANT:

The girl has intentionally been positioned at the SAME:

- X position
- Y position
- scale
- height
- perspective
- camera distance
- feet position
- head position

in all three images.

This alignment is extremely important.

DO NOT:

- regenerate the images
- redraw the girl
- crop the images
- stretch the images
- independently scale them
- independently reposition them
- change their aspect ratio
- apply different object-position values
- alter the artwork

Treat the three images as fixed artwork assets.

============================================================
# 2. CORE EXPERIENCE
============================================================

The experience is NOT a carousel.

It is NOT:

Image 1
→ fade
→ Image 2
→ fade
→ Image 3

It is NOT a normal hover image swap.

Instead:

CURRENT WORLD
        ↓
USER MOVES CURSOR
        ↓
MYSTERIOUS PIXELATED PREVIEW
OF NEXT WORLD
        ↓
USER CLICKS
        ↓
PIXELATED PREVIEW EXPLODES / EXPANDS
        ↓
NEXT WORLD MATERIALIZES
        ↓
WORLD SETTLES
        ↓
NEW NEXT-WORLD PREVIEW BECOMES AVAILABLE

The interaction repeats forever:

WORLD 1
→ WORLD 2
→ WORLD 3
→ WORLD 1
→ WORLD 2
→ ...

============================================================
# 3. TECHNOLOGY
============================================================

Use a single WebGL canvas.

Preferred stack:

- OGL + WebGL
- GLSL fragment shaders
- JavaScript / TypeScript

Three.js is acceptable if OGL is not practical.

Do NOT create multiple canvases.

Do NOT stack three HTML images and fake the effect using CSS opacity.

The artwork should be rendered through WebGL.

Architecture:

Hero
└── WebGL Canvas
    └── Fullscreen geometry
        └── Shader
            ├── Texture 1
            ├── Texture 2
            ├── Texture 3
            ├── Cursor position
            ├── Cursor velocity
            ├── Pixel preview
            ├── Transition progress
            ├── Time
            └── Character protection

============================================================
# 4. DEFAULT STATE
============================================================

On initial load:

Show IMAGE 1 normally.

The illustration should fill the hero.

The girl should remain exactly where she appears in the source artwork.

There should be extremely subtle ambient movement.

Do not immediately display the next image.

The experience should initially look like a beautiful static illustration.

Only after the user interacts should the hidden behavior become apparent.

============================================================
# 5. HERO DIMENSIONS
============================================================

Desktop:

Use approximately:

100vw × 100svh

The artwork must preserve its intended composition.

Do NOT crop the girl.

Do NOT allow responsive resizing to cause the girl to jump between scenes.

Use a consistent UV mapping for all three textures.

If the source images have identical dimensions, preserve them exactly.

If dimensions differ, normalize their mapping so the girl's alignment remains identical.

============================================================
# 6. CHARACTER = VISUAL ANCHOR
============================================================

The girl is the most important element.

She must remain visually anchored throughout the entire experience.

During:

- cursor movement
- hover
- preview
- click
- transition
- pixel explosion
- world change

the girl must NOT:

- move horizontally
- move vertically
- scale
- rotate
- stretch
- wobble
- blur
- chromatically separate
- distort significantly

The environment provides the motion.

The girl provides continuity.

The user should subconsciously feel:

"SAME PERSON, DIFFERENT WORLD."

============================================================
# 7. CHARACTER MASK
============================================================

Implement a character protection system.

Preferred method:

Use an optional grayscale mask texture:

character-mask.png

Where:

WHITE = girl
BLACK = environment

The mask should identify:

- head
- hair
- body
- arms
- legs
- boots

Use this mask to protect the girl from shader displacement.

If a mask asset is not available, implement a configurable soft approximation and clearly isolate it so it can later be replaced with the real mask.

The character mask should influence:

- displacement
- distortion
- pixel transition
- chromatic effects
- parallax

The character should remain stable.

DO NOT create an obvious visible outline or halo.

============================================================
# 8. HOVER BEHAVIOR
============================================================

When the cursor enters the hero:

DO NOT immediately change the main image.

Instead:

create a mysterious pixelated preview of the NEXT WORLD.

Example:

Current world:
Mumbai

Next world:
Mountains

The cursor now has a small pixelated preview following it.

The main Mumbai image remains fully visible.

============================================================
# 9. PIXELATED PREVIEW
============================================================

This is one of the most important parts.

The preview must NOT be a normal circular thumbnail.

It should be a small organic cluster of chunky square pixels.

Think:

a mysterious pixel cloud
+
a small window into the next world.

The user should recognize:

"Something different is inside this."

But they should NOT immediately see the complete next illustration.

============================================================
# 10. PIXEL PREVIEW APPEARANCE
============================================================

Use the NEXT texture.

Pixelate it in the fragment shader.

Conceptually:

pixelUV =
floor(uv / pixelSize) * pixelSize

Then sample the next texture.

Recommended initial pixel size:

16–28px depending on viewport.

The preview should have:

- chunky pixels
- incomplete edges
- slightly varying density
- subtle floating pixels
- organic shape

DO NOT use a perfectly clean circle.

DO NOT use a CSS border-radius circle.

The pixel cluster itself should define the shape.

============================================================
# 11. PREVIEW SIZE
============================================================

Desktop:

Start approximately:

100–140px

Then gently breathe toward:

140–190px

depending on cursor movement.

Do not make it huge.

The preview should feel like a discovered secret rather than a giant UI element.

============================================================
# 12. PREVIEW POSITION
============================================================

The preview follows the cursor.

But it must NOT be directly attached.

Use physics.

Maintain:

targetMouse
currentMouse
velocity

Use interpolation / spring damping.

The preview should:

- lag slightly
- catch up
- have subtle inertia
- overshoot very slightly
- settle naturally

Fast cursor movement should create more visible trailing motion.

Slow cursor movement should feel calm.

============================================================
# 13. PIXEL TRAIL
============================================================

When the cursor moves quickly:

allow a very small number of pixels to trail behind the main preview.

Maximum approximately:

5–15 small pixels.

They should disappear quickly.

Do not create hundreds of particles.

Do not make it look like a particle system demo.

Keep it elegant.

============================================================
# 14. NEXT IMAGE LOGIC
============================================================

Always preview the NEXT world.

If:

current = IMAGE 1

preview = IMAGE 2

If:

current = IMAGE 2

preview = IMAGE 3

If:

current = IMAGE 3

preview = IMAGE 1

Cycle:

1 → 2 → 3 → 1

Never preview the currently visible image.

============================================================
# 15. MYSTERY
============================================================

The preview must deliberately hide information.

For example:

Mountain preview may show:

- blue
- green
- white
- dark shapes

but should NOT clearly reveal:

the full mountain
+
the girl
+
the complete composition.

The user should want to click to discover what is inside.

Use:

- coarse pixels
- partial sampling
- subtle motion
- low detail
- organic edges

============================================================
# 16. CLICK INTERACTION
============================================================

When the user clicks anywhere inside the hero:

trigger the world transformation.

DO NOT simply:

opacity 0 → 1

DO NOT simply:

scale preview → full screen

Instead create a high-motion pixel transformation.

The interaction should feel physical.

Sequence:

PHASE 1 — ANTICIPATION
~100–150ms

The pixel preview reacts to the click.

It slightly compresses / pulses.

PHASE 2 — EXPANSION
~150–400ms

The pixel cluster rapidly expands.

Pixels move outward from the cursor.

PHASE 3 — WORLD REVEAL
~400–800ms

The next image begins materializing from the expanding pixel field.

PHASE 4 — RESOLUTION
~800–1100ms

Pixels become progressively smaller:

28px
→ 20px
→ 14px
→ 8px
→ 4px
→ 1px

The next image becomes completely sharp.

PHASE 5 — SETTLE
~1100–1400ms

Motion gently settles.

The new world becomes the current world.

============================================================
# 17. CLICK SHOULD FEEL HIGH-MOTION
============================================================

The click should be noticeably more energetic than the hover state.

At click:

increase:

- pixel velocity
- displacement
- expansion radius
- environmental movement
- transition energy

But DO NOT violently distort the girl.

The energy should happen primarily around the environment.

Think:

A WORLD OPENING UP

not:

A GLITCH EFFECT.

============================================================
# 18. PIXEL EXPLOSION
============================================================

The pixel preview should expand outward from the cursor.

But do NOT use a simple radial circle wipe.

Use:

- irregular pixel expansion
- noise
- velocity
- directional bias based on cursor movement
- slight turbulence

The resulting shape should feel organic.

Example:

cursor moving right:

pixel expansion has a slight rightward energy.

cursor moving left:

slight leftward energy.

This makes the interaction feel physical.

============================================================
# 19. IMAGE RESOLUTION EFFECT
============================================================

During the click transition:

the next image starts heavily pixelated.

Then gradually resolves.

This is extremely important.

The next world should feel like it is being BUILT from pixels.

Suggested sequence:

large blocks
↓
medium blocks
↓
small blocks
↓
fine pixels
↓
full-resolution artwork

Do this in the shader.

Do not use CSS image filters.

============================================================
# 20. WORLD TRANSITION
============================================================

The next world should not simply fade over the current world.

The pixel field should act as the bridge.

Conceptually:

CURRENT WORLD

        ↓

PIXEL CLOUD

        ↓

PIXEL CLOUD EXPANDS

        ↓

NEXT WORLD MATERIALIZES

        ↓

NEXT WORLD

This makes the transition feel like a transformation rather than an image swap.

============================================================
# 21. GIRL DURING TRANSITION
============================================================

Because the girl is aligned across all three source images:

the transition should preserve her visual position.

The viewer should barely perceive her moving.

The environment changes around her.

This is essential to achieving the animated storytelling effect.

============================================================
# 22. CURSOR PHYSICS
============================================================

Use smooth cursor physics.

Maintain:

targetX
targetY

currentX
currentY

previousX
previousY

velocityX
velocityY

Do not directly bind shader values to raw mouse coordinates.

Use damping.

The cursor should feel like it has physical influence.

============================================================
# 23. DO NOT RENDER FROM POINTER EVENTS
============================================================

Pointer events should ONLY update interaction targets.

Do NOT call the render function inside pointermove.

Use ONE requestAnimationFrame loop.

This loop should:

1. update physics
2. update transition state
3. update shader uniforms
4. render

============================================================
# 24. NO SECOND ANIMATION LOOP
============================================================

Do NOT use:

requestAnimationFrame

AND

setTimeout animation.

Use exactly one render loop.

============================================================
# 25. AMBIENT LIFE
============================================================

Even when the user does nothing:

the illustration should subtly breathe.

Use extremely subtle:

- cloud movement
- foliage movement
- atmospheric drift
- tiny floating particles

Do NOT animate the entire image.

Do NOT move the girl.

Do NOT constantly shake the camera.

The effect should be subconscious.

============================================================
# 26. HIGH-MOTION HIERARCHY
============================================================

The motion hierarchy should be:

1. CLICK TRANSFORMATION — strongest
2. PIXEL PREVIEW — medium
3. CURSOR PHYSICS — medium
4. ENVIRONMENTAL PARALLAX — subtle
5. AMBIENT MOTION — extremely subtle
6. GIRL — almost static

Never reverse this hierarchy.

============================================================
# 27. NO GENERIC WEB EFFECTS
============================================================

DO NOT use:

- excessive chromatic aberration
- glitch effects
- RGB splitting
- huge particle clouds
- excessive blur
- neon effects
- aggressive zoom
- constant camera shake
- random image distortion
- excessive noise
- generic "AI website" animations

The visual language should feel:

editorial
artistic
premium
playful
organic
cinematic

============================================================
# 28. NO HEAVY VIGNETTE
============================================================

Do not darken the artwork heavily.

Preserve the original colors.

Use only subtle grading if necessary.

============================================================
# 29. NO UI CONTROLS
============================================================

Do NOT add:

- arrows
- carousel dots
- thumbnails
- previous/next buttons
- progress bars
- visible navigation controls

The hero itself is the navigation.

============================================================
# 30. OPTIONAL MICRO-CUE
============================================================

If needed, when the preview appears:

show a tiny contextual cue such as:

"discover"

or

"explore"

But keep it minimal.

Do not permanently display:

"Click here"

The interaction should be self-discoverable.

============================================================
# 31. CLICK LOCK
============================================================

While a transition is occurring:

disable another click.

Do not allow the user to trigger:

1 → 2 → 3

multiple times during one animation.

Once the transition settles:

enable interaction again.

============================================================
# 32. HOVER EXIT
============================================================

If the cursor leaves the hero without clicking:

the pixel preview should:

- shrink
- lose opacity
- release a few pixels
- disappear

over approximately:

250–400ms.

The current world remains unchanged.

============================================================
# 33. MOBILE
============================================================

Mobile does not have hover.

Implement:

touch / drag → preview

tap → transition

The pixel preview can follow the user's finger.

If the interaction becomes too heavy on mobile:

simplify it while maintaining the concept.

Do not turn mobile into a normal carousel.

============================================================
# 34. ACCESSIBILITY
============================================================

Respect:

prefers-reduced-motion

If enabled:

- disable intense pixel motion
- disable large displacement
- use a simple, gentle scene transition
- preserve readability

============================================================
# 35. PERFORMANCE
============================================================

Use GPU-based effects.

Do not use React state for mouse movement.

Do not trigger component re-renders on pointermove.

Use refs and shader uniforms.

Cap devicePixelRatio around 1.5–2 depending on device.

Pause or reduce rendering when the hero is not visible.

Use ResizeObserver.

Clean up:

- WebGL textures
- animation frame
- event listeners
- observers

============================================================
# 36. SHADER UNIFORMS
============================================================

Use an architecture similar to:

uTime
uResolution
uMouse
uVelocity
uCurrentTexture
uNextTexture
uPreviewPosition
uPreviewRadius
uPreviewOpacity
uPixelSize
uTransition
uClickVelocity
uCharacterMask

Add additional uniforms only if genuinely required.

============================================================
# 37. SHADER LOGIC
============================================================

The shader should conceptually perform:

CURRENT WORLD
↓
sample current texture

NEXT WORLD
↓
sample next texture

PIXEL PREVIEW
↓
pixelate next texture around cursor

CLICK
↓
expand preview

TRANSITION
↓
increase reveal radius
+
decrease pixel size
+
increase next-world contribution

CHARACTER MASK
↓
protect girl

FINAL
↓
next texture at full resolution

============================================================
# 38. PIXEL PREVIEW ALGORITHM
============================================================

The preview should:

1. Determine distance from cursor.

2. Create an organic pixel-cluster mask.

3. Pixelate the NEXT texture.

4. Only reveal the pixelated next texture inside the cluster.

5. Add slight edge pixels.

6. Add slight cursor-velocity distortion.

7. Smoothly fade it in/out.

Do not reveal the full next image.

============================================================
# 39. CLICK REVEAL ALGORITHM
============================================================

On click:

transition = 0

previewRadius increases rapidly

pixelSize begins large

Then:

while transition < 1:

previewRadius → expand

pixelSize → decrease

nextTextureContribution → increase

currentTextureContribution → decrease

environmentDisplacement → peak then settle

characterProtection → remain strong

At transition = 1:

currentScene = nextScene

nextScene = (currentScene + 1) % 3

reset preview.

============================================================
# 40. VISUAL TIMING
============================================================

Target transition:

~1.2 seconds.

But do NOT make every stage linear.

Use easing.

Suggested:

anticipation:
ease-out

explosion:
ease-out / spring

reveal:
ease-in-out

resolution:
ease-out

settle:
spring/damping

The motion should feel physical rather than mechanically timed.

============================================================
# 41. THE FINAL FEELING
============================================================

The user should experience:

"I see a beautiful illustration."

↓

"I move my mouse."

↓

"Wait... what is that little pixel world?"

↓

"I move it around."

↓

"It follows me."

↓

"I click."

↓

"WHOA."

↓

"The entire world changed."

↓

"I move again."

↓

"There's another hidden world."

↓

"I want to click again."

That sense of discovery is the PRIMARY GOAL.

============================================================
# 42. IMPORTANT VISUAL RULE
============================================================

Do not optimize for:

"How many effects can we add?"

Optimize for:

"How magical can one simple interaction feel?"

The experience should be restrained when idle and spectacular when discovered.

============================================================
# 43. FINAL IMPLEMENTATION CHECKLIST
============================================================

Before finishing, verify ALL of these:

[ ] Three existing images are used unchanged.

[ ] One WebGL canvas.

[ ] Three GPU textures.

[ ] Same UV mapping for all images.

[ ] Girl remains aligned.

[ ] Current image is initially fully visible.

[ ] Hover creates next-world pixel preview.

[ ] Preview is genuinely pixelated.

[ ] Preview follows cursor with inertia.

[ ] Preview is NOT a normal thumbnail.

[ ] Preview is NOT a perfect circle.

[ ] Preview reveals only the NEXT image.

[ ] Fast cursor movement creates subtle pixel trail.

[ ] Clicking triggers high-motion transformation.

[ ] Pixel cluster expands.

[ ] Next image materializes from pixels.

[ ] Pixel size decreases progressively.

[ ] Final image becomes completely sharp.

[ ] Girl remains visually anchored.

[ ] Transition takes approximately 1–1.4 seconds.

[ ] New next-world preview becomes available afterward.

[ ] World cycle is 1 → 2 → 3 → 1.

[ ] No carousel controls.

[ ] No normal crossfade.

[ ] No excessive glitch effects.

[ ] No aggressive camera movement.

[ ] One requestAnimationFrame loop.

[ ] No render calls inside pointermove.

[ ] Mobile touch interaction works.

[ ] Reduced-motion mode works.

[ ] WebGL fallback works.

[ ] No console errors.

[ ] No unnecessary React re-renders.

============================================================
# 44. BUILD THE ACTUAL EXPERIENCE
============================================================

Do not give me a conceptual answer.

Do not merely describe how this could be implemented.

Actually create the working hero.

If an existing hero implementation exists, inspect it first and replace incorrect architecture rather than layering more effects onto it.

Use the existing three image assets.

The final result should feel like an interactive digital illustration / art direction piece rather than a website carousel.

The hero should be the experience.