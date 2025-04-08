export function EmergencyMap() {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-md border">
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">Map loading...</p>
          <p className="text-xs text-gray-400">
            Google Maps integration would go here
          </p>
        </div>
      </div>
    </div>
  )
}
