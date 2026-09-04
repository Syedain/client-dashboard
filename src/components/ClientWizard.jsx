import { useState } from 'react'
import StepIndicator from './StepIndicator.jsx'

const STEPS = ['Client Info', 'Project', 'Plan', 'Review']

const PLANS = [
  { id: 'starter', name: 'Starter', price: '$9/mo', blurb: 'For solo projects' },
  { id: 'pro', name: 'Pro', price: '$29/mo', blurb: 'For growing teams' },
  { id: 'team', name: 'Team', price: '$79/mo', blurb: 'For whole organizations' },
]

const INITIAL_DATA = {
  fullName: '',
  email: '',
  company: '',
  projectScope: '',
  plan: '',
}

function validateStep(step, data) {
  const errors = {}
  if (step === 0) {
    if (!data.fullName.trim()) errors.fullName = 'Full name is required.'
    if (!data.email.trim()) {
      errors.email = 'Email is required.'
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = 'Enter a valid email address.'
    }
    if (!data.company.trim()) errors.company = 'Company is required.'
  }
  if (step === 1) {
    if (!data.projectScope.trim()) errors.projectScope = 'Project scope is required.'
  }
  if (step === 2) {
    if (!data.plan) errors.plan = 'Choose a plan to continue.'
  }
  return errors
}

// onAddClient: a function passed in from the parent (App.jsx) so that when
// this wizard finishes, the new client gets added to the shared client list.
function ClientWizard({ onAddClient }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(INITIAL_DATA)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const lastStep = STEPS.length - 1

  function updateField(field, value) {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function goNext() {
    const stepErrors = validateStep(step, data)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }
    setStep((s) => Math.min(s + 1, lastStep))
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (step !== lastStep) {
      goNext()
      return
    }
    // Build the final client object matching our data model, then hand it
    // up to App.jsx via the onAddClient function passed in as a prop.
    onAddClient({
      id: crypto.randomUUID(),
      ...data,
      status: 'lead',
      tasks: [],
      createdAt: new Date().toISOString(),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 text-center">
        <div className="text-4xl mb-2">✅</div>
        <h2 className="text-xl font-semibold text-slate-800">Client added!</h2>
        <p className="text-slate-500 mt-1">
          {data.fullName} from {data.company} has been onboarded.
        </p>
        <button
          onClick={() => {
            setData(INITIAL_DATA)
            setStep(0)
            setSubmitted(false)
          }}
          className="mt-5 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
        >
          Add another client
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700">
      <StepIndicator steps={STEPS} current={step} />

      <form onSubmit={handleSubmit} noValidate>
        {step === 0 && (
          <fieldset className="space-y-4">
            <legend className="font-semibold text-slate-800 dark:text-white mb-2">Client Info</legend>
            <label className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Full name</span>
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Email</span>
              <input
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Company</span>
              <input
                type="text"
                value={data.company}
                onChange={(e) => updateField('company', e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {errors.company && <span className="text-xs text-red-500">{errors.company}</span>}
            </label>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset className="space-y-4">
            <legend className="font-semibold text-slate-800 dark:text-white mb-2">Project</legend>
            <label className="block">
              <span className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Project scope</span>
              <textarea
                rows={4}
                value={data.projectScope}
                onChange={(e) => updateField('projectScope', e.target.value)}
                className="w-full border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              />
              {errors.projectScope && <span className="text-xs text-red-500">{errors.projectScope}</span>}
            </label>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-semibold text-slate-800 dark:text-white mb-2">Choose a plan</legend>
            <div className="grid gap-3">
              {PLANS.map((plan) => (
                <button
                  type="button"
                  key={plan.id}
                  onClick={() => updateField('plan', plan.id)}
                  className={
                    'text-left border rounded-lg p-3 ' +
                    (data.plan === plan.id
                      ? 'border-slate-800 ring-2 ring-slate-800'
                      : 'border-slate-200 hover:border-slate-400')
                  }
                >
                  <div className="font-medium text-slate-800">{plan.name} — {plan.price}</div>
                  <div className="text-sm text-slate-500">{plan.blurb}</div>
                </button>
              ))}
            </div>
            {errors.plan && <span className="text-xs text-red-500">{errors.plan}</span>}
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="font-semibold text-slate-800 dark:text-white mb-3">Review</legend>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between"><dt className="text-slate-400">Name</dt><dd>{data.fullName}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Email</dt><dd>{data.email}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Company</dt><dd>{data.company}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Scope</dt><dd className="text-right">{data.projectScope}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Plan</dt><dd>{PLANS.find((p) => p.id === data.plan)?.name}</dd></div>
            </dl>
          </fieldset>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-0 disabled:pointer-events-none"
          >
            Back
          </button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700">
            {step === lastStep ? 'Add Client' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientWizard