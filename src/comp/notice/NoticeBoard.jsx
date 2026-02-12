import './NoticeBoard.css'
import { useEffect, useRef, useState, useMemo } from 'react';
import Nbref from '../../assets/pictures/noticeboardjpg.jpg'


function Sticknotes(props) {

    var noteNum = props.noteNum 
    const count = Math.floor(noteNum );

    const notes = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            x: Math.random() * 70 + 5,
            y: Math.random() * 70 + 5,
            bgX: Math.random() * 100,
            bgY: Math.random() * 100,
            rotate: Math.random() * 10 - 5
        }));
    }, [count]);

    return (
        <>
            {notes.map((n, i) => (
                <div
                    key={i}
                    className="sticky-note"
                    style={{
                        left: `${n.x}%`,
                        top: `${n.y}%`,
                        backgroundPosition: `${n.bgX}% ${n.bgY}%`,
                        transform: `rotate(${n.rotate}deg)`
                    }}
                />
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
                <Sticknotes noteNum={20} />


            </div>
        </>
    )
}

export default NoticeBoard
