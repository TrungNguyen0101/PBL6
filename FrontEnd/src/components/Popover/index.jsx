import { useState, useRef, useId } from 'react';
import {
  FloatingPortal,
  useFloating,
  shift,
  arrow,
  offset,
  Placement,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end',
}) {
  const [isOpen, setIsOpen] = useState(initialOpen || false);
  const arrowRef = useRef(null);
  const { refs, floatingStyles, middlewareData } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ],
    placement: placement,
  });
  const id = useId();
  const showPopover = () => {
    setIsOpen(true);
  };
  const hidePopover = () => {
    setIsOpen(false);
  };
  return (
    <Element
      className={className}
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
    >
      {children}
      <AnimatePresence>
        <FloatingPortal id={id}>
          {isOpen && (
            <div ref={refs.setFloating} style={floatingStyles} className="z-20">
              <motion.div
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.5 }}
              >
                <div
                  ref={arrowRef}
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y,
                  }}
                  className="bg-transparent w-[330px] h-[20px] absolute translate-y-[-98%] z-10 "
                />
                {renderPopover}
              </motion.div>
            </div>
          )}
        </FloatingPortal>
      </AnimatePresence>
    </Element>
  );
}
