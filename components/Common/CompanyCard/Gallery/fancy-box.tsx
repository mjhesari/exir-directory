"use client";

// Public imports
import React, { useRef, useEffect } from "react";

//* Import components
import { Fancybox as NativeFancybox, OptionsType } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

//* Import types
interface FancyboxPropsT {
  children: React.ReactNode;
  delegate: string;
  options?: Partial<OptionsType> |object;
}

const Fancybox = (props: FancyboxPropsT) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  });

  return <div ref={containerRef}>{props.children}</div>;
};

export default Fancybox;
