
import { Avatar } from './Avatar';

export const  Experience = ({ section }) => {
    return (
        <>
            <ambientLight intensity={2.5} />
            <group position-y={-1}>
                <Avatar section={ section }/>
            </group>
        </>
    )
}