

export const zoomIn=(delay)=>{
    return{
        hidden:{
            scale:0.7,
            opacity:0,
        },
        show:{
            y:0,
            x:0,
            scale:1,
            opacity:1,
            transition:{
                duration: delay,
                repeatType: "reverse",
            }
        }
    }
}



export const left=(delay)=>{
    return{
        hidden:{
            opacity:1,
            translateX:-150,
        },
        show:{
            rotateY:0,
            translateX:0,
            y:0,
            transition:{
                duration: delay,
                repeatType: "reverse",
            }
        }
    }
}

export const flip=(delay)=>{
    return{
        hidden:{
            rotateY:100,
        },
        show:{
            rotateY:0,
            transition:{
                duration: delay,
                repeatType: "reverse",
            }
        }
    }
}


export const pump=(delay)=>{
    return{
        hidden:{
            rotateX:100,
        },
        show:{
            rotateX:0,
            transition:{
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    }
}
