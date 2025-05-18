import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience.jsx';
import { Scroll, ScrollControls } from '@react-three/drei';
import { Interface } from './components/Interface.jsx';
import { ScrollManager } from './components/ScrollManager.jsx';
import './AddPost.css'
import { useState } from 'react';


function AddPost() {

    const [ section, setSection] = useState(0);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <Canvas shadows camera={{ position: [3, 3, 3], fov: 20 }}>
                <ScrollControls pages={4} damping={0.1}>
                <ScrollManager section={section} onSectionChange={setSection} />
                <Experience section={section} />
                <Scroll html>
                    <Interface />
                </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}

export default AddPost;