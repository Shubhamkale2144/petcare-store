import Link from 'next/link'

export default function Home() {
  const featuredPets = [
    { id: 1, name: "Buddy", type: "Dog", breed: "Golden Retriever", age: 2, price: 300, image: "🐕" },
    { id: 2, name: "Whiskers", type: "Cat", breed: "Persian", age: 1, price: 200, image: "🐈" },
    { id: 3, name: "Snowball", type: "Rabbit", breed: "Himalayan", age: 1, price: 150, image: "🐇" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">🐾 PetStore</h1>
            <p className="text-gray-600">Find your perfect furry friend!</p>
          </div>
          <nav className="space-x-4">
            <Link href="/pets" className="text-gray-700 hover:text-blue-500">Browse Pets</Link>
            <Link href="/admin/login" className="text-gray-700 hover:text-green-500">Admin</Link>
            <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to PetStore
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse and adopt lovely pets waiting for their forever homes. 
            All our pets are healthy, vaccinated, and ready for loving families.
          </p>
          <div className="space-x-4">
            <Link 
              href="/pets" 
              className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition duration-200 text-lg font-semibold"
            >
              Browse All Pets
            </Link>
            <Link 
              href="/admin/login" 
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-200 text-lg font-semibold"
            >
              Admin Panel
            </Link>
          </div>
        </div>

        {/* Featured Pets */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Pets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredPets.map(pet => (
              <div key={pet.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="text-6xl text-center py-6 bg-gray-100">
                  {pet.image}
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{pet.name}</h4>
                  <p className="text-gray-600 mb-1"><span className="font-semibold">Breed:</span> {pet.breed}</p>
                  <p className="text-gray-600 mb-1"><span className="font-semibold">Age:</span> {pet.age} year{pet.age > 1 ? 's' : ''}</p>
                  <p className="text-gray-600 mb-4"><span className="font-semibold">Type:</span> {pet.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${pet.price}</span>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold mb-2">Loving Homes</h3>
            <p className="text-gray-600">All pets are raised in caring environments</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💉</div>
            <h3 className="text-xl font-semibold mb-2">Health Guarantee</h3>
            <p className="text-gray-600">All pets are vaccinated and healthy</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">We're here to help you anytime</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PetStore. All rights reserved.</p>
          <p className="text-gray-400 mt-2">Making pet adoption simple and safe</p>
        </div>
      </footer>
    </div>
  )
}