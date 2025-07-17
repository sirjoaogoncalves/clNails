import { motion } from "framer-motion";
import { forwardRef } from "react";

const OptimizedMotion = forwardRef(({ children, ...props }, ref) => {
  const optimizedProps = {
    ...props,
    layout: false,
    layoutId: undefined,
    style: { ...props.style, willChange: 'transform' },
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
      ...props.transition
    }
  };

  return (
    <motion.div ref={ref} {...optimizedProps}>
      {children}
    </motion.div>
  );
});

OptimizedMotion.displayName = "OptimizedMotion";

export default OptimizedMotion;