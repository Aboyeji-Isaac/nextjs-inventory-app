export default function DynamicIslandLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4">
      {/* Blur Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
      
      {/* Dynamic Island */}
      <div className="relative bg-black rounded-full px-6 py-3 shadow-2xl border border-gray-800">
        <div className="flex items-center gap-3">
          {/* Animated Dots */}
          <div className="flex gap-1.5">
            <span 
              className="w-2 h-2 rounded-full bg-green-500 animate-bounce-dot"
              style={{ animationDelay: '-0.32s' }}
            />
            <span 
              className="w-2 h-2 rounded-full bg-green-500 animate-bounce-dot"
              style={{ animationDelay: '-0.16s' }}
            />
            <span 
              className="w-2 h-2 rounded-full bg-green-500 animate-bounce-dot"
            />
          </div>
          
          {/* Loading Text */}
          <span className="text-sm font-medium text-white">Loading</span>
        </div>
      </div>
    </div>
  );
}