import './NoticeBoard.css'
import { useEffect, useRef,useState ,useLayoutEffect, useMemo } from 'react';


import bg1 from '../../assets/pictures/stickynote1.png'
import bg2 from '../../assets/pictures/stickynote2.png'
import bg3 from '../../assets/pictures/stickynote3.png'
import bg4 from '../../assets/pictures/stickynote4.png'
import bg5 from '../../assets/pictures/stickynote5.png'

import pd2 from '../../assets/pictures/polaroid2.png'
import pd3 from '../../assets/pictures/polaroid3.png'
import pd4 from '../../assets/pictures/polaroid4.png'
import pd5 from '../../assets/pictures/polaroid5.png'
import pd6 from '../../assets/pictures/polaroid6.png'

var pd =[pd2, pd3,pd4,pd5,pd6]

const seeded = (seed) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x); // 0 → 1
    };
function Sticknotes(props) {
    

    console.log()

    var noteNum = props.noteNum
    const count = Math.floor(noteNum);
    const bgImages = [bg1, bg2, bg3, bg4, bg5];

    const notes = useMemo(() => {
        const radius = ({
            x: (props.radius / window.innerWidth) * 100,
            y: (props.radius / window.innerHeight) * 100
        })
        
        
        const angle = (i) => { return seeded(i * 10 * props.seed) * Math.PI * 2 }
        const dist = (i) => { return Math.pow(seeded(i * 20 * props.seed), 0.6) }
        
        return Array.from({ length: count }).map((_, i) => ({

            img: bgImages[Math.floor(seeded(i) * bgImages.length)],
            x: props.coordinates.x + Math.cos(angle(i)) * (dist(i)) * radius.x,
            y: props.coordinates.y + Math.sin(angle(i)) * (dist(i)) * radius.y ,
            rotate: seeded(i * 30 + count) * 10 - 5,
            size: 10 + seeded(i * 40 + count) * 10,
        }));
    }, [ count,
        props.coordinates.x,
        props.coordinates.y,
        props.radius,
        props.seed]);

    return (
        <>
            {notes.map((n, i) => (

                <img key={i}
                    className="sticky-note-img"
                    src={n.img}
                    style={{
                        left: `${n.x}%`,
                        top: `${n.y}%`,
                        transform: `rotate(${n.rotate}deg)`,
                        height: n.size + '%'
                    }}

                >
                </img>
            ))}
        </>
    );
}



function Polaroids(props) {
    const polaroidRef = useRef(null);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    useLayoutEffect(() => {
        if (!polaroidRef.current) return;

        const rect = polaroidRef.current.getBoundingClientRect();
        const xPercent = (rect.left + rect.width / 2) / window.innerWidth * 100;
        const yPercent = (rect.top + rect.height / 2) / window.innerHeight * 100;
        setCoords({ x: xPercent, y: yPercent});

        
        
    }, []);

    return (
        <>
            <Sticknotes 
            noteNum={20} 
            radius={150} 
            seed={props.seed} 
            coordinates={coords} />

            <img 
            ref={polaroidRef}
            src={props.img} 
            className='polaroid'
            style={{
                left : props.position.x+'%' ,
                top: props.position.y+'%' }}
            />
            

        </>
    )
}

function NoticeBoard() {
    useEffect(() => {
        const Nb = document.getElementById('Nb')
        if (!Nb) return

        Nb.style.width = window.innerWidth + 'px'
        Nb.style.height = window.innerHeight + 'px'
        // Nb.style.backgroundImage = `url(${Nbref})`




    }, [])




    return (
        <>
            <div id='Nb' >

                <Polaroids img={pd[0]} position={{x:10 , y:20 }} seed={1}/>
                <Polaroids img={pd[1]} position={{x:40 , y:40 }} seed={4}/>


            </div>
        </>
    )
}

export default NoticeBoard
