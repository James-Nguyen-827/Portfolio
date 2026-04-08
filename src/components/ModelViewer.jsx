import React, { Component, Suspense, useLayoutEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Bounds, Center, Html, OrbitControls, useGLTF } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

function LoadingState() {
  return (
    <Html center>
      <div className="viewer-loading">Loading model...</div>
    </Html>
  );
}

function EmptyState({ poster, title }) {
  return (
    <div className="viewer-empty">
      {poster ? (
        <img src={poster} alt={`${title} poster`} className="viewer-empty__poster" />
      ) : null}
      <p>No interactive file has been attached for this model yet.</p>
    </div>
  );
}

function StlAsset({ url }) {
  const geometry = useLoader(STLLoader, url);

  useLayoutEffect(() => {
    geometry.computeVertexNormals();
    geometry.center();
  }, [geometry]);

  return (
    <Center>
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0.5, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#ea7e21" metalness={0.16} roughness={0.4} />
      </mesh>
    </Center>
  );
}

function GltfAsset({ url }) {
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (!child.isMesh) {
        return;
      }

      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material = child.material.clone();
        child.material.color.set('#ea7e21');
        child.material.metalness = 0.16;
        child.material.roughness = 0.4;
      }
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

function ModelAsset({ model }) {
  if (!model?.fileUrl) {
    return null;
  }

  if (model.format === 'stl') {
    return <StlAsset url={model.fileUrl} />;
  }

  if (model.format === 'glb' || model.format === 'gltf') {
    return <GltfAsset url={model.fileUrl} />;
  }

  return null;
}

class ViewerErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export function ModelViewer({ model, autoRotate = true }) {
  if (!model) {
    return <EmptyState title="No model selected" />;
  }

  if (!model.fileUrl) {
    return <EmptyState poster={model.poster} title={model.title} />;
  }

  return (
    <ViewerErrorBoundary
      resetKey={model.id}
      fallback={<EmptyState poster={model.poster ?? model.thumbnail} title={model.title} />}
    >
      <Canvas
        className="viewer-canvas"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.2], fov: 34 }}
        shadows
      >
        <color attach="background" args={['#efe7d8']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} castShadow />
        <directionalLight position={[-3, 2, -2]} intensity={0.9} />
        <Bounds fit clip observe margin={1.4}>
          <Suspense fallback={<LoadingState />}>
            <ModelAsset model={model} />
          </Suspense>
        </Bounds>
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1.1}
          enablePan={false}
          minDistance={2.6}
          maxDistance={8}
        />
      </Canvas>
    </ViewerErrorBoundary>
  );
}

export default ModelViewer;
