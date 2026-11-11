// Shows a person's initials inside a colored circle, e.g. "Olivia Martin" -> "OM"

const avatarColors = [
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
]

const avatarSizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-xl',
}

function Avatar({ name, size = 'md' }) {
  const initials = name
    .split(' ')
    .filter((word) => word !== '')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  // Pick a color from the first letter, so the same person always gets the same color
  const colorIndex = name.length > 0 ? name.charCodeAt(0) % avatarColors.length : 0

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarSizes[size]} ${avatarColors[colorIndex]}`}
    >
      {initials || '?'}
    </span>
  )
}

export default Avatar
