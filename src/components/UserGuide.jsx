import { useEffect, useRef } from 'react'

const BASIC_ROWS = [
  ['0 – 9  .', 'Digits and a decimal point. Only one dot is allowed per number.'],
  ['+  −  ×  ÷', 'Add, subtract, multiply, divide. Pressing an operator twice replaces the last one.'],
  ['(  )', 'Group part of a calculation. Left open? It closes itself when you press =.'],
  ['=', 'Solve what is on the display.'],
  ['AC', 'Clear everything and start fresh.'],
  ['⌫', 'Delete the last character you typed.'],
]

const SCI_ROWS = [
  ['sin  cos  tan', 'Trigonometry, in DEG or RAD as set by the angle key.'],
  ['ln  log', 'Natural log and log base 10.'],
  ['√', 'Square root.'],
  ['x²  xʸ', 'Square, or any power — tap xʸ then the exponent.'],
  ['x!', 'Factorial. Whole numbers up to 170, decimals use the gamma function.'],
  ['π  e', "Pi and Euler's number."],
  ['1/x', 'Turns what is on screen into 1 ÷ that value. Still editable.'],
  ['±', 'Flips the sign of what is on screen.'],
  ['DEG / RAD', 'Toggle degrees or radians for the trig keys.'],
]

const SHORTCUT_ROWS = [
  ['0 – 9', 'Digits'],
  ['.', 'Decimal point'],
  ['+  -  *  /', 'Operators'],
  ['(  )  ^  !', 'Parentheses, power, factorial'],
  ['Enter  or  =', 'Solve'],
  ['Backspace', 'Delete last character'],
  ['Esc', 'Clear all, like AC'],
]

const TIP_ROWS = [
  ['Keep typing', 'Numbers and operators chain freely: 7 × 8 + 3 works as you type.'],
  ['Implicit ×', 'Omit the × where it is obvious: 2π, 3(4+5), and 2sin(30) all work.'],
  ['Keep solving', 'After =, typing a digit starts a new calculation, but an operator continues from the result.'],
  ['Wrap a value', '± and 1/x act on the whole expression, so (4+3) then ± gives −7.'],
  ['History', 'Your last 12 results are kept. Tap one to load its expression back, then change it.'],
  ['Long results', 'Numbers are rounded to 12 significant digits; very large or tiny ones switch to exponential form.'],
]

const Section = ({ title, rows, keys }) => (
  <section className="mb-4 last:mb-0">
    <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-widest text-bmo-ink">
      {title}
    </h3>
    <ul className="space-y-1.5">
      {rows.map(([label, desc]) => (
        <li key={label} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span
            className={[
              'shrink-0 rounded-lg border-2 border-bmo-ink px-1.5 py-0.5 text-xs font-bold text-bmo-ink',
              keys ? 'bg-bmo-equals' : 'bg-bmo-digit',
            ].join(' ')}
          >
            {label}
          </span>
          <span className="text-xs leading-snug text-[#3F5C54] sm:text-sm">{desc}</span>
        </li>
      ))}
    </ul>
  </section>
)

function UserGuide({ open, onOpen, onClose }) {
  const panelRef = useRef(null)
  const triggerRef = useRef(null)
  const wasOpen = useRef(false)

  useEffect(() => {
    if (!open) return undefined
    panelRef.current?.focus()
    const onKeyDown = (e) => {
      e.stopPropagation()
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown, true)
    return () => document.removeEventListener('keydown', onKeyDown, true)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      wasOpen.current = true
      return
    }
    if (wasOpen.current) {
      wasOpen.current = false
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpen()}
        aria-label="How to use this calculator"
        aria-expanded={open}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-bmo-ink bg-bmo-utility font-display text-sm font-bold text-bmo-ink shadow-[0_3px_0_0_#1B2E2A] transition-all duration-150 ease-out hover:bg-bmo-utility-dark active:translate-y-[2px] active:scale-90 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D06B] focus-visible:ring-offset-2 sm:h-9 sm:w-9"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B2E2A]/50 p-3 backdrop-blur-[2px] sm:p-6"
          onClick={onClose}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-guide-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="help-panel flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-[2rem] border-[3px] border-bmo-ink bg-bmo-body outline-none"
            style={{ boxShadow: '0 18px 35px -12px rgba(27, 46, 42, 0.5)' }}
          >
            <div className="flex shrink-0 items-start justify-between gap-3 border-b-[3px] border-bmo-ink/15 px-4 pt-4 pb-3 sm:px-6 sm:pt-5 sm:pb-4">
              <div>
                <h2
                  id="user-guide-title"
                  className="font-display text-lg font-bold tracking-tight text-bmo-ink sm:text-xl"
                >
                  ✦ how to use
                </h2>
                <p className="text-xs font-medium text-[#5C7A72]">
                  tap keys or use your keyboard — BMO does the math :)
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close guide"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] border-bmo-ink bg-bmo-utility font-display text-sm font-bold text-bmo-ink shadow-[0_3px_0_0_#1B2E2A] transition-all duration-150 hover:bg-bmo-utility-dark active:translate-y-[2px] active:scale-90 active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D06B] focus-visible:ring-offset-2"
              >
                ✕
              </button>
            </div>

            <div className="guide-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
              <div className="mb-4 rounded-2xl border-[3px] border-bmo-ink bg-bmo-screen px-3 py-2.5 shadow-[0_3px_0_0_#11251F]">
                <p className="text-sm leading-snug text-bmo-glow">
                  <span className="font-bold">In a nutshell:</span> switch between{' '}
                  <span className="font-bold">Basic</span> and <span className="font-bold">Sci</span>{' '}
                  with the two pills, build an expression with the keys, then press{' '}
                  <span className="font-bold">=</span>. Results land in{' '}
                  <span className="font-bold">history</span> for reuse.
                </p>
              </div>

              <Section title="Basic pad" rows={BASIC_ROWS} />
              <Section title="Sci pad" rows={SCI_ROWS} />
              <Section title="Keyboard" rows={SHORTCUT_ROWS} keys />
              <Section title="Good to know" rows={TIP_ROWS} />

              <p className="rounded-2xl border-2 border-bmo-ink/40 bg-white/60 px-3 py-2 text-xs leading-snug text-[#3F5C54]">
                <span className="font-bold text-bmo-ink">Error</span> means the expression can’t
                be solved — dividing by zero, an unfinished expression, a negative under √ or x!,
                or a number too large to hold. Press <span className="font-bold">AC</span> or just
                start typing to begin again.
              </p>
            </div>

            <div className="shrink-0 border-t-[3px] border-bmo-ink/15 px-4 pt-3 pb-4 sm:px-6 sm:pb-5">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full border-[3px] border-bmo-ink bg-bmo-equals px-4 py-2 font-display text-sm font-bold uppercase tracking-widest text-bmo-ink shadow-[0_4px_0_0_#1B2E2A] transition-all duration-150 ease-out hover:bg-bmo-equals-dark active:translate-y-[3px] active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2D06B] focus-visible:ring-offset-2"
              >
                got it :)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserGuide