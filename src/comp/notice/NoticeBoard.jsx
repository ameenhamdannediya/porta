import './NoticeBoard.css'
import { useEffect, useRef, useState, useMemo } from 'react';
import bg1 from '../../assets/pictures/stickynote1.png'
import bg2 from '../../assets/pictures/stickynote2.png'
import bg3 from '../../assets/pictures/stickynote3.png'
import bg4 from '../../assets/pictures/stickynote4.png'
import bg5 from '../../assets/pictures/stickynote5.png'



function Sticknotes(props) {

    const pxToPercent = (px) => (px / window.innerWidth) * 100;
    const seeded = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x); // 0 → 1
};

    console.log()
    
    var noteNum = props.noteNum 
    const count = Math.floor(noteNum );
    const bgImages = [bg1, bg2, bg3, bg4, bg5];

    const notes = useMemo(() => {
        const radius = pxToPercent(props.radius);
        const angle =(i)=>{ return seeded(i * 10) * Math.PI * 2}
        const dist = (i)=>{ return Math.pow(seeded(i * 20), 0.6) * radius}

        return Array.from({ length: count }).map((_, i) => ({ 
            
            img : bgImages[Math.floor(seeded(i) * bgImages.length)],
            x: props.coordinates.x + Math.cos(angle(i)) * ( dist(i) ),
            y: props.coordinates.y + Math.sin(angle(i)) * ( dist(i) ),
            rotate: seeded(i* 30 + count) * 10 - 5,
            size : 10 + seeded(i* 40 + count)*10 ,
        }));
    }, [count]);

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
                        height : n.size + '%'
                    }}

                    >
                </img>
            ))}
        </>
    );
}


function NoticeBoard() {
    useEffect(() => {
        const Nb = document.getElementById('Nb')
        if (!Nb) return

        Nb.style.width = window.innerWidth + 'px'
        Nb.style.height = window.innerHeight + 'px'
        // Nb.style.backgroundImage = `url(${Nbref})`




    }, [])

    /*const boardRef = useRef(null)
    const bgSize = useRef(24) // percentage

    const [pos, setpos] = useState({ x: 0, y: 0 })
    const [draging, setDraging] = useState(false)
    const start = useRef({ x: 0, y: 0 })

    const onMouseDown = (e) => {
        setDraging(true)
        start.current = {
            x: e.clientX - pos.x,
            y: e.clientY - pos.y

        }


    }
    const onMouseMove = (e) => {
        if (!draging) return
        setpos({
            x: e.clientX - start.current.x,
            y: e.clientY - start.current.y

        })
        boardRef.current.style.backgroundPosition = `${pos.x}px ${pos.y}px`
        console.log(pos.x, pos.y);

    }

    const onMouseUp = () => setDraging(false)
    const onWheel = (e) => {
        e.preventDefault()

        const zoomSpeed = 0.1
        const delta = e.deltaY < 0 ? 1 : -1

        bgSize.current += delta * zoomSpeed * bgSize.current
        bgSize.current = Math.min(Math.max(bgSize.current, 1), 400)

        boardRef.current.style.backgroundSize =
            `${bgSize.current}%`
    }*/


    return (
        <>
            <div id='Nb' >
                {/*// ref={boardRef}
                // className="notice-board"
                // onMouseDown={onMouseDown}
                // onMouseMove={onMouseMove}
                // onMouseUp={onMouseUp}
                // onMouseLeave={onMouseUp}
                // onWheel={onWheel}>*/}
                <Sticknotes noteNum={10} radius={200} coordinates={{ x: 50, y: 30 }}/>


            </div>
        </>
    )
}

export default NoticeBoard
