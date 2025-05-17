import React, { useEffect, useRef } from 'react';
import { useGraph, useFrame } from '@react-three/fiber';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

export function Avatar({ section }) {
    const { scene } = useGLTF('models/Human.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone);
    const group = useRef();

    const { animations: angryAnimations } = useFBX("animations/Angry.fbx");
    angryAnimations[0].name = "angryAnimations";
    const { actions } = useAnimations(angryAnimations, group);

    useEffect(() => {
        actions["angryAnimations"].reset().play();
    }, []);

    // Log section changes
    useEffect(() => {
        console.log("Current section:", section);
    }, [section]);

    // Handle transform changes
    useFrame(() => {
        if (!group.current) return;

        // Default transform
        let targetPosition = new THREE.Vector3(0, 0, 0);
        let targetScale = new THREE.Vector3(1, 1, 1);
        let targetRotation = new THREE.Euler(0, 0, 0); // Rotation in radians

        switch (section) {
            case 0:
                targetPosition.set(1, 0, 0.3);
                targetScale.set(1.2, 1.2, 1.2); // Zoom in by 0.5
                targetRotation.set(0, THREE.MathUtils.degToRad(330), 0); // 30° clockwise
                break;
            case 1:
                targetPosition.set(-0.3, -3, 1.4);
                targetScale.set(2.5, 2.5, 2.5); 
                targetRotation.set(0, THREE.MathUtils.degToRad(160), 0); // 30° clockwise
                break;
            case 2:
                targetPosition.set(-0.25, -1.75, 0.5);
                targetScale.set(2, 2, 2); 
                targetRotation.set(0, THREE.MathUtils.degToRad(120), 0); // 30° clockwise
                break;
            case 3:
                targetPosition.set(0, -4, -1);
                targetScale.set(3, 3, 3); 
                targetRotation.set(0, THREE.MathUtils.degToRad(20), 0); // 30° clockwise
                break;
        }

        // Smooth transition
        group.current.position.lerp(targetPosition, 0.1);
        group.current.scale.lerp(targetScale, 0.1);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotation.x, 0.1);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation.y, 0.1);
        group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetRotation.z, 0.1);
    });

    return (
        <group ref={group} dispose={null}>
            <primitive object={nodes.Hips} />
            <skinnedMesh
                name="Wolf3D_Avatar"
                geometry={nodes.Wolf3D_Avatar.geometry}
                material={materials.Wolf3D_Avatar}
                skeleton={nodes.Wolf3D_Avatar.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
            />
        </group>
    );
}

useGLTF.preload('models/Human.glb');
