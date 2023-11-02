import { motion } from 'framer-motion'

const LineAnime = (props) => {
    const { numLines, duration } = props// Increase the number of lines to 150
    const easeIn = [0.42, 0, 0.58, 1]; // You can adjust the easing as needed

    const maxHeight = 100; // Increase the maximum height
    const minHeight = 5;

    return (
        <div className="flex">
            {[...Array(numLines)].map((e, i) => {
                const middleIndex = Math.floor(numLines / 2);
                const distanceFromMiddle = Math.abs(i - middleIndex);
                const initialHeight =
                  minHeight + (maxHeight - minHeight) * (1 - distanceFromMiddle / middleIndex);
                return (
                    <motion.div
                        key={i}
                        style={{
                            width: "5px",
                            margin: "5px 5px", // Constant width
                            height: initialHeight,
                            borderRadius: "5px",
                            background: "#333", 
                            position: "relative",
                            top: "50%",
                            transform: "translateY(-50%)"// Adjust the background color as needed
                        }}
                        animate={{
                            height: maxHeight,
                            top: 0,
                            transition: {
                                duration: duration,
                                ease: easeIn,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay:   Math.random() * (duration * numLines), // Randomize the start point
                            },
                        }}
                    >

                    </motion.div>
                )
            })}
        </div>
    )
}

export default LineAnime