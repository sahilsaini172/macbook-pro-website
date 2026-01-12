import { Environment, Lightformer, SpotLight } from "@react-three/drei";
import React from "react";

const StudioLights = () => {
  return (
    <group name="lights">
      <Environment resolution={256}>
        <group>
          <Lightformer
            form={"rect"}
            intensity={10}
            position={[-10, 5, -5]}
            scale={20}
            rotateY={Math.PI / 2}
          />
          <Lightformer
            form={"rect"}
            intensity={10}
            position={[10, 0, 1]}
            scale={20}
            rotateY={Math.PI / 2}
          />
        </group>
      </Environment>
      <SpotLight
        angle={0.15}
        decay={0}
        position={[-2, -10, 5]}
        intensity={Math.PI * 0.2}
      />
      <SpotLight
        angle={0.15}
        decay={0}
        position={[0, -25, 10]}
        intensity={Math.PI * 0.2}
      />
      <SpotLight
        angle={0.15}
        decay={1}
        position={[0, 15, 5]}
        intensity={Math.PI * 1}
      />
    </group>
  );
};

export default StudioLights;
