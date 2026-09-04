function StepIndicator({ steps, current }) {
  return (
    <ol className="flex items-center w-full mb-8">
      {steps.map((label, index) => {
        const status =
          index < current ? 'done' : index === current ? 'active' : 'upcoming'

        return (
          <li key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center flex-1">
              <span
                className={
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ' +
                  (status === 'done'
                    ? 'bg-emerald-500 text-white'
                    : status === 'active'
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-200 text-slate-500')
                }
              >
                {status === 'done' ? '✓' : index + 1}
              </span>
              <span className="ml-2 text-sm text-slate-600 hidden sm:inline">
                {label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={
                  'flex-1 h-0.5 mx-2 ' +
                  (status === 'done' ? 'bg-emerald-500' : 'bg-slate-200')
                }
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

export default StepIndicator