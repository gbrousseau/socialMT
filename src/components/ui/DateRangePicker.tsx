interface DateRangePickerProps {
  startDate?: Date
  endDate?: Date
  onChange: (range: { start?: Date; end?: Date }) => void
}

export function DateRangePicker({ startDate, endDate, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="date"
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        value={startDate?.toISOString().split('T')[0] || ''}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : undefined
          onChange({ start: date, end: endDate })
        }}
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
        value={endDate?.toISOString().split('T')[0] || ''}
        min={startDate?.toISOString().split('T')[0]}
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : undefined
          onChange({ start: startDate, end: date })
        }}
      />
      <button
        className="text-sm text-gray-500 hover:text-gray-700"
        onClick={() => onChange({ start: undefined, end: undefined })}
      >
        Reset
      </button>
    </div>
  )
} 