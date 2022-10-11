import React from 'react';
import { useOnClickOutside } from '@utils/hooks';
import clsx from 'clsx';

type DropdownProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: JSX.Element;
};

const Dropdown = ({ open, setOpen, children }: DropdownProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));
  return (
    <div //
      ref={ref}
      className={clsx('absolute w-full z-10 transition-opacity duration-300', !open && 'opacity-0')}>
      {children}
    </div>
  );
};

export default Dropdown;
