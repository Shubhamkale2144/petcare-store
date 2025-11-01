export default function OrderDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 pb-6 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-4 w-32 bg-gray-300 rounded"></div>
                        <div className="h-3 w-24 bg-gray-300 rounded"></div>
                      </div>
                      <div className="h-3 w-48 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items Skeleton */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-gray-300 rounded"></div>
                      <div className="h-3 w-24 bg-gray-300 rounded"></div>
                      <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
                <div className="h-5 w-32 bg-gray-300 rounded mb-4"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-3 w-20 bg-gray-300 rounded"></div>
                      <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}