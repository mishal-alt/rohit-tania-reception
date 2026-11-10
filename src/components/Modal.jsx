import { useEffect, useRef } from 'react'

// Thin wrapper over the native <dialog>: open state is controlled, backdrop click and Esc close it.
export default function Modal({ open, onClose, id, label, labelledBy, closeLabel = 'Close', children, style }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (open && !d.open) d.showModal()
    else if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog
      ref={ref}
      id={id}
      aria-label={label}
      aria-labelledby={labelledBy}
      style={style}
      onClose={onClose}
      onClick={(e) => {
        const d = ref.current, r = d.getBoundingClientRect()
        if (e.target === d && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) d.close()
      }}
    >
      <button className="close-button" aria-label={closeLabel} onClick={() => ref.current.close()}>×</button>
      {open && children}
    </dialog>
  )
}
