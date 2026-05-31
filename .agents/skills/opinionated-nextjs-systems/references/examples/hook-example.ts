import { useEffect, useRef } from "react";

interface UsePhoneActiveClassOptions {
  threshold?: number;
  activeClassName?: string;
  phoneMaxWidth?: number;
}

const usePhoneActiveClass = <T extends HTMLElement>({
  threshold = 0.95,
  activeClassName = "active",
  phoneMaxWidth = 768,
}: UsePhoneActiveClassOptions = {}) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === "undefined") {
      return;
    }

    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      const isPhone = window.innerWidth <= phoneMaxWidth;
      if (!isPhone) {
        node.classList.remove(activeClassName);
        return;
      }

      node.classList.toggle(activeClassName, entry.isIntersecting);
    };

    const observer = new IntersectionObserver(callback, { threshold });
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, activeClassName, phoneMaxWidth]);

  return ref;
};

export default usePhoneActiveClass;
