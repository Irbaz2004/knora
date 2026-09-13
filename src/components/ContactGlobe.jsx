import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import worldDots from "@/assets/world-dots.json";
import campusImage from "@/assets/Aboutknora1.webp";
import "./ContactGlobe.css";

// Only Chennai represents an academy location. Other nodes illustrate online connections.
const contactLocations = [
  {
    id: "chennai",
    name: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
    label: "KNORA Edu Academy",
    image: campusImage,
    href: "mailto:admissions@knoraedu.com",
    linkLabel: "Contact admissions",
  },
  {
    id: "london",
    name: "London",
    lat: 51.5,
    lng: -0.12,
    label: "Illustrative online connection",
  },
  {
    id: "singapore",
    name: "Singapore",
    lat: 1.35,
    lng: 103.82,
    label: "Illustrative online connection",
  },
  {
    id: "dubai",
    name: "Dubai",
    lat: 25.2,
    lng: 55.27,
    label: "Illustrative online connection",
  },
  {
    id: "new-york",
    name: "New York",
    lat: 40.7,
    lng: -74,
    label: "Illustrative online connection",
  },
];
function position(lat, lng, flat, radius = 2) {
  if (flat) return new THREE.Vector3((lng / 180) * 3.2, (lat / 90) * 1.6, 0);
  const phi = (lat * Math.PI) / 180,
    theta = (lng * Math.PI) / 180;
  return new THREE.Vector3(
    radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.sin(phi),
    radius * Math.cos(phi) * Math.cos(theta),
  );
}
function Route({ location, flat, color, intensity, animate }) {
  const dot = useRef();
  const points = useMemo(() => {
    const start = position(
      contactLocations[0].lat,
      contactLocations[0].lng,
      flat,
      2.025,
    );
    const end = position(location.lat, location.lng, flat, 2.025);
    return Array.from({ length: 65 }, (_, i) => {
      const t = i / 64;
      const v = start.clone().lerp(end, t);
      if (flat) v.z = Math.sin(t * Math.PI) * 0.65;
      else v.normalize().multiplyScalar(2.025 + Math.sin(t * Math.PI) * 0.6);
      return v;
    });
  }, [location, flat]);
  useFrame(({ clock }) => {
    if (!dot.current || !animate) return;
    const i = (clock.elapsedTime * 13 + location.lng) % 64;
    const index = Math.floor((i + 64) % 64);
    dot.current.position.copy(points[index]);
  });
  return (
    <group>
      <Line
        points={points}
        color={color}
        transparent
        opacity={intensity * 0.65}
        lineWidth={1}
      />
      <mesh ref={dot} position={points[32]} visible={intensity > 0}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={intensity} />
      </mesh>
    </group>
  );
}
function Scene({
  flat,
  rotating,
  reduced,
  density,
  dotSize,
  glow,
  network,
  dotColor,
  glowColor,
  selected,
  onSelect,
  controlsRef,
  onInteract,
}) {
  const group = useRef();
  const surface = useRef();
  const { camera, size } = useThree();
  useEffect(() => {
    camera.position.set(0, 0, size.width < 550 ? 10 : 7.4);
    camera.lookAt(0, 0, 0);
    controlsRef.current?.target.set(0, 0, 0);
    controlsRef.current?.update();
  }, [flat, camera, size.width, controlsRef]);
  useEffect(() => {
    if (group.current) group.current.rotation.y = flat ? 0 : -1.4;
  }, [flat]);
  useFrame((_, delta) => {
    if (group.current && rotating && !flat && !reduced)
      group.current.rotation.y += Math.min(delta, 0.05) * 0.12;
  });
  const positions = useMemo(
    () =>
      new Float32Array(
        worldDots
          .filter((_, i) => i % (4 - density) === 0)
          .flatMap(([lng, lat]) => position(lat, lng, flat).toArray()),
      ),
    [flat, density],
  );
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          color: { value: new THREE.Color(dotColor) },
          glowColor: { value: new THREE.Color(glowColor) },
          pointSize: { value: dotSize },
          glow: { value: glow },
        },
        vertexShader:
          "uniform float pointSize; void main(){vec4 p=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*p; gl_PointSize=pointSize*22.0/max(1.0,-p.z);}",
        fragmentShader:
          "uniform vec3 color; uniform vec3 glowColor; uniform float glow; void main(){float d=length(gl_PointCoord-vec2(0.5))*2.0; if(d>1.0) discard; float core=1.0-smoothstep(0.35,0.75,d); float halo=(1.0-d)*glow; gl_FragColor=vec4(mix(glowColor,color,core),max(core,halo));}",
      }),
    [dotColor, glowColor, dotSize, glow],
  );
  useEffect(() => () => material.dispose(), [material]);
  return (
    <>
      <group ref={group}>
        {!flat && (
          <mesh ref={surface}>
            <sphereGeometry args={[1.975, 48, 32]} />
            <meshBasicMaterial color="#070b12" />
          </mesh>
        )}
        <points material={material}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
        </points>
        {!flat && (
          <mesh>
            <icosahedronGeometry args={[2.01, 1]} />
            <meshBasicMaterial
              wireframe
              color={glowColor}
              transparent
              opacity={network * 0.12}
            />
          </mesh>
        )}
        {contactLocations.slice(1).map((location) => (
          <Route
            key={location.id}
            location={location}
            flat={flat}
            color={glowColor}
            intensity={network}
            animate={!reduced}
          />
        ))}
        {contactLocations.map((location) => (
          <group
            key={location.id}
            position={position(location.lat, location.lng, flat, 2.05)}
          >
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelect(location.id);
              }}
            >
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshBasicMaterial
                color={selected === location.id ? "#fff" : glowColor}
              />
            </mesh>
            <Html
              center
              zIndexRange={[20, 0]}
              distanceFactor={8}
              occlude={flat ? false : [surface]}
              style={{ pointerEvents: "auto" }}
            >
              <button
                className="contact-globe-marker"
                aria-label={`Show ${location.name}`}
                title={`${location.name} — ${location.label}`}
                onClick={() => onSelect(location.id)}
                onFocus={() => onSelect(location.id)}
                onPointerEnter={() => onSelect(location.id)}
              />
              {selected === location.id && (
                <div className="contact-globe-tooltip">
                  {location.image && (
                    <img src={location.image} alt="KNORA campus" />
                  )}
                  <div>
                    <strong>{location.name}</strong>
                    <small>{location.label}</small>
                    {location.href && (
                      <a href={location.href}>{location.linkLabel}</a>
                    )}
                  </div>
                </div>
              )}
            </Html>
          </group>
        ))}
      </group>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableRotate={!flat}
        enablePan
        enableZoom
        minDistance={4.5}
        maxDistance={13}
        enableDamping
        dampingFactor={0.08}
        onStart={onInteract}
      />
    </>
  );
}
class GlobeBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="contact-globe-fallback">
        Interactive 3D is unavailable in this browser. Location and contact
        details are available below.
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function ContactGlobe() {
  const [flat, setFlat] = useState(false),
    [rotating, setRotating] = useState(true),
    [selected, setSelected] = useState("chennai");
  const density = 2,
    dotSize = 1.6,
    glow = 0.5,
    network = 0.6;
  const dotColor = "#ffffff",
    glowColor = "#91baff",
    buttonColor = "#002888";
  const [reduced, setReduced] = useState(false);
  const controlsRef = useRef();
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const location = contactLocations.find((item) => item.id === selected);
  const reset = () => {
    controlsRef.current?.reset();
    setFlat(false);
    setRotating(true);
  };
  return (
    <section
      className="contact-globe"
      aria-label="Interactive global learning map"
      style={{ "--globe-button": buttonColor }}
    >
      <div className="contact-globe-toolbar">
        <div>
          <span>CONNECTED BY LEARNING</span>
          <h2>One campus. A world of possibilities.</h2>
        </div>
        <div className="contact-globe-toggle">
          <button aria-pressed={!flat} onClick={() => setFlat(false)}>
            Globe
          </button>
          <button aria-pressed={flat} onClick={() => setFlat(true)}>
            Flat map
          </button>
        </div>
      </div>
      <div className="contact-globe-stage" data-lenis-prevent>
        <GlobeBoundary>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 7.4], fov: 42 }}
            fallback={
              <div className="contact-globe-fallback">
                3D requires WebGL. Use the location list below to contact us.
              </div>
            }
            gl={{ antialias: true, alpha: false }}
            onCreated={({ gl }) => gl.setClearColor("#070b12")}
          >
            <Scene
              {...{
                flat,
                rotating,
                reduced,
                density,
                dotSize,
                glow,
                network,
                dotColor,
                glowColor,
                selected,
                controlsRef,
              }}
              onSelect={(id) => {
                setSelected(id);
                setRotating(false);
              }}
              onInteract={() => setRotating(false)}
            />
          </Canvas>
        </GlobeBoundary>
        <div className="contact-globe-tools">
          <button
            onClick={() => {
              controlsRef.current?.dollyIn(1.2);
              controlsRef.current?.update();
            }}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => {
              controlsRef.current?.dollyOut(1.2);
              controlsRef.current?.update();
            }}
            aria-label="Zoom out"
          >
            −
          </button>
          <button onClick={reset}>Reset</button>
          <button
            disabled={flat || reduced}
            aria-pressed={rotating}
            onClick={() => setRotating((v) => !v)}
          >
            {rotating ? "Pause" : "Rotate"}
          </button>
        </div>
        <p className="contact-globe-hint">
          Drag to rotate · Scroll to zoom · Right-drag to pan
        </p>
      </div>
      <div className="contact-globe-bottom">
        <div className="contact-globe-locations" aria-label="Locations">
          {contactLocations.map((item) => (
            <button
              key={item.id}
              aria-pressed={selected === item.id}
              onClick={() => {
                setSelected(item.id);
                setRotating(false);
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
        <article className="contact-globe-card" aria-live="polite">
          {location.image && (
            <img src={location.image} alt="KNORA campus reception" />
          )}
          <div>
            <h3>{location.name}</h3>
            <p>{location.label}</p>
            {location.href && (
              <a href={location.href}>{location.linkLabel} ↗</a>
            )}
          </div>
        </article>
        <p className="contact-globe-note">
          Chennai is our campus location. Other cities and routes illustrate
          online connectivity, not additional offices.
        </p>
      </div>
    </section>
  );
}
