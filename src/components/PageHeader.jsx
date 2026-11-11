// Title + description at the top of each page.
// Anything placed between <PageHeader> tags (buttons, selects...) shows on the right side.

function PageHeader({ title, description, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>

      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  )
}

export default PageHeader
