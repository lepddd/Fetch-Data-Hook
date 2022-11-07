import "./MovieCard.css";
import { motion, AnimatePresence } from "framer-motion";

const MovieCard = ({ src, alt, index }) => {
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const variants = {
    hidden: {
      x: -10,
      y: -10,
      opacity: 0,
    },
    show: (index) => ({
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        delay: 0.05 * index,
      },
    }),
    explode: {
      scale: 1.1,      
    }
  };

  return (
    <motion.div
      className="container"
      custom={index}
      variants={variants}
      initial="hidden"
      animate="show"
      whileHover="explode"
    >
      <img className="image" src={baseUrl + src} alt={alt} loading="lazy" />
    </motion.div>
  );
};

export default MovieCard;

/*  */
